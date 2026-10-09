// Real-World Production Fisheries ERP Purchase Dashboard & CRUD Operations

import { ERP_DATA } from '../data/mockData.js';
import { DataTable } from '../components/table.js';
import { Charts } from '../components/charts.js';
import { Modal } from '../components/modal.js';
import { Toast } from '../components/toast.js';
import { TabBar } from '../components/tabBar.js';
import { Skeleton } from '../components/skeleton.js';
import { renderEmptyState } from '../components/emptyState.js';

export const PurchaseView = {
  // Store local state for CRUD & filter presets
  activePeriod: 'FY 2026-2027',
  activePriceCount: '80',

  commercialRates: [
    { id: 'CR-01', species: 'Vannamei Shrimp', count: '16/20 pcs/lb', rateInr: 440, rateUsd: 5.30, effectiveDate: '2026-10-01', status: 'ACTIVE' },
    { id: 'CR-02', species: 'Vannamei Shrimp', count: '21/25 pcs/lb', rateInr: 410, rateUsd: 4.95, effectiveDate: '2026-10-01', status: 'ACTIVE' },
    { id: 'CR-03', species: 'Vannamei Shrimp', count: '26/30 pcs/lb', rateInr: 380, rateUsd: 4.60, effectiveDate: '2026-10-01', status: 'ACTIVE' },
    { id: 'CR-04', species: 'Black Tiger Shrimp', count: '16/20 pcs/lb', rateInr: 620, rateUsd: 7.50, effectiveDate: '2026-10-01', status: 'ACTIVE' },
    { id: 'CR-05', species: 'Asian Seabass', count: '500-800 g/pc', rateInr: 320, rateUsd: 3.85, effectiveDate: '2026-10-01', status: 'ACTIVE' }
  ],

  bookingsList: [
    { sNo: 1, bookingNo: 'PB-2026-089', bookingStation: 'Bhimavaram Center #1', bookingDate: '2026-10-04', species: 'Vannamei Shrimp', purchaseType: 'Direct Farmer Procurement', vehicleNo: 'AP 37 TE 4821', driverName: 'G. Narayana', grader: 'B. Venkatesh', agent: 'Coastal Marine Agency', farmLocation: 'Pond #4B & 5A, Akividu', supplier: 'Godavari Coastal Aqua Farms', bookingCount: '40 Count', bookingWeight: 2000, bookingRate: 440, arrivalPlant: 'DFL UNIT-5 (JPT)', remarks: 'Grade quality A, direct early morning harvest.', expectedDate: '2026-10-04', advancePaid: '$ 3,000', status: 'FULFILLED' },
    { sNo: 2, bookingNo: 'PB-2026-092', bookingStation: 'Kakinada Sea Intake #2', bookingDate: '2026-10-03', species: 'Black Tiger Shrimp', purchaseType: 'Hatchery Buyback Contract', vehicleNo: 'AP 05 TX 9102', driverName: 'M. Srinu', grader: 'K. Ramu', agent: 'Sagar Marine Brokers', farmLocation: 'Kakinada Bay Cage 1', supplier: 'Sagar Marine Hatcheries & Cultivators', bookingCount: '20 Count', bookingWeight: 3500, bookingRate: 620, arrivalPlant: 'DFL UNIT-3 (PSP)', remarks: 'Export batch benchmark rate locked.', expectedDate: '2026-10-03', advancePaid: '$ 5,000', status: 'FULFILLED' },
    { sNo: 3, bookingNo: 'PB-2026-095', bookingStation: 'Machilipatnam Delta #3', bookingDate: '2026-10-05', species: 'Vannamei Shrimp', purchaseType: 'Direct Farmer Procurement', vehicleNo: 'AP 16 TZ 3390', driverName: 'Ch. Prasad', grader: 'M. Nagesh', agent: 'Direct Farmer', farmLocation: 'Krishna Delta Cluster #9', supplier: 'Krishna Delta Prawn Harvesters', bookingCount: '50 Count', bookingWeight: 4000, bookingRate: 380, arrivalPlant: 'DFL UNIT-4 (PND)', remarks: 'Direct farmer pond harvest with aerated crates.', expectedDate: '2026-10-05', advancePaid: '$ 4,500', status: 'FULFILLED' },
    { sNo: 4, bookingNo: 'PB-2026-102', bookingStation: 'Bhimavaram Center #1', bookingDate: '2026-10-08', species: 'Vannamei Shrimp', purchaseType: 'Agent Procurement Order', vehicleNo: 'AP 37 TE 8812', driverName: 'K. Subba Rao', grader: 'B. Venkatesh', agent: 'Delta Seafood Associates', farmLocation: 'Pond #14, Undi Road', supplier: 'Godavari Coastal Aqua Farms', bookingCount: '30 Count', bookingWeight: 3200, bookingRate: 460, arrivalPlant: 'DFL UNIT-5 (JPT)', remarks: 'Agent booking agreement signed.', expectedDate: '2026-10-08', advancePaid: '$ 0', status: 'CONFIRMED' },
    { sNo: 5, bookingNo: 'PB-2026-105', bookingStation: 'Amalapuram Harvesters #4', bookingDate: '2026-10-09', species: 'Vannamei Shrimp', purchaseType: 'Direct Farmer Procurement', vehicleNo: 'AP 04 TT 5619', driverName: 'D. Rambabu', grader: 'G. Suribabu', agent: 'Direct Farmer', farmLocation: 'Konaseema Coastal Pond #3', supplier: 'Konaseema Marine Harvesters', bookingCount: '45 Count', bookingWeight: 2800, bookingRate: 410, arrivalPlant: 'DFL UNIT-6 (JPT-II)', remarks: 'Pond sample tested negative for antibiotics.', expectedDate: '2026-10-09', advancePaid: '$ 2,500', status: 'CONFIRMED' },
    { sNo: 6, bookingNo: 'PB-2026-108', bookingStation: 'Ongole Coastal Hub #1', bookingDate: '2026-10-10', species: 'Black Tiger Shrimp', purchaseType: 'Corporate Feed-Linked Booking', vehicleNo: 'AP 26 TV 1104', driverName: 'Y. Brahmaiah', grader: 'K. Ramu', agent: 'Nellore Aqua Syndicate', farmLocation: 'Nellore Block #12 Pond A', supplier: 'Nellore Brackish Aqua Cultivators', bookingCount: '25 Count', bookingWeight: 5000, bookingRate: 590, arrivalPlant: 'DFL UNIT-2 (KKD)', remarks: 'Feed linked contract with high yield estimation.', expectedDate: '2026-10-10', advancePaid: '$ 6,000', status: 'PENDING' },
    { sNo: 7, bookingNo: 'PB-2026-110', bookingStation: 'Visakhapatnam Gate Dock', bookingDate: '2026-10-11', species: 'Asian Seabass (Barramundi)', purchaseType: 'Spot Market Purchase', vehicleNo: 'AP 31 TH 7741', driverName: 'P. Appa Rao', grader: 'M. Nagesh', agent: 'East Coast Brokers', farmLocation: 'Deep Sea Cage #7', supplier: 'East Coast Aqua Society', bookingCount: '500-800 g/pc', bookingWeight: 1800, bookingRate: 320, arrivalPlant: 'DFL UNIT-1 (VSP)', remarks: 'Live harvest intake to dock.', expectedDate: '2026-10-11', advancePaid: '$ 1,500', status: 'PENDING' }
  ],

  rmArrivalsList: [
    {
      sNo: 1,
      id: 'RMA-2026-101',
      arrivalNumber: 'RMA-2026-101',
      date: '06/10/2026',
      company: 'DEVI FISHERIES LIMITED',
      plant: 'DFL UNIT-5 (JPT)',
      center: 'Bhimavaram Center #1',
      species: 'Vannamei (VM)',
      weight: 3850,
      balanceWeight: 1250,
      status: 'QC_CLEARED',
      averageRate: 425,
      amount: 1636250,
      balanceAmount: 531250,
      vehicleNumber: 'AP 37 TE 9011',
      driverName: 'K. Ramu',
      remarks: 'Fresh harvest intake, weighbridge dock verified.'
    },
    {
      sNo: 2,
      id: 'RMA-2026-102',
      arrivalNumber: 'RMA-2026-102',
      date: '06/10/2026',
      company: 'DEVI FISHERIES LIMITED',
      plant: 'DFL UNIT-3 (PSP)',
      center: 'Kakinada Sea Intake #2',
      species: 'Black Tiger (BT)',
      weight: 4200,
      balanceWeight: 800,
      status: 'RECEIVED',
      averageRate: 610,
      amount: 2562000,
      balanceAmount: 488000,
      vehicleNumber: 'AP 05 TX 9102',
      driverName: 'M. Srinu',
      remarks: 'Export batch benchmark rate locked.'
    },
    {
      sNo: 3,
      id: 'RMA-2026-103',
      arrivalNumber: 'RMA-2026-103',
      date: '06/10/2026',
      company: 'DEVI FISHERIES LIMITED',
      plant: 'DFL UNIT-4 (PND)',
      center: 'Machilipatnam Delta #3',
      species: 'Vannamei (VM)',
      weight: 2900,
      balanceWeight: 900,
      status: 'IN_PROCESS',
      averageRate: 390,
      amount: 1131000,
      balanceAmount: 351000,
      vehicleNumber: 'AP 16 TZ 3390',
      driverName: 'Ch. Prasad',
      remarks: 'De-icing completed, staged for pre-processing.'
    },
    {
      sNo: 4,
      id: 'RMA-2026-104',
      arrivalNumber: 'RMA-2026-104',
      date: '06/10/2026',
      company: 'DEVI FISHERIES LIMITED',
      plant: 'DFL UNIT-6 (JPT-II)',
      center: 'Amalapuram Harvesters #4',
      species: 'Vannamei (VM)',
      weight: 3100,
      balanceWeight: 1100,
      status: 'COMPLETED',
      averageRate: 415,
      amount: 1286500,
      balanceAmount: 456500,
      vehicleNumber: 'AP 04 TT 5619',
      driverName: 'D. Rambabu',
      remarks: 'Batch grading and count verification complete.'
    },
    {
      sNo: 5,
      id: 'RMA-2026-105',
      arrivalNumber: 'RMA-2026-105',
      date: '06/10/2026',
      company: 'DEVI FISHERIES LIMITED',
      plant: 'DFL UNIT-2 (KKD)',
      center: 'Ongole Coastal Hub #1',
      species: 'Black Tiger (BT)',
      weight: 5000,
      balanceWeight: 2000,
      status: 'QC_CLEARED',
      averageRate: 590,
      amount: 2950000,
      balanceAmount: 1180000,
      vehicleNumber: 'AP 26 TV 1104',
      driverName: 'Y. Brahmaiah',
      remarks: 'Brackish water harvest intake verified.'
    },
    {
      sNo: 6,
      id: 'RMA-2026-106',
      arrivalNumber: 'RMA-2026-106',
      date: '06/10/2026',
      company: 'DEVI FISHERIES LIMITED',
      plant: 'DFL UNIT-1 (VSP)',
      center: 'Visakhapatnam Gate Dock',
      species: 'Asian Seabass',
      weight: 1800,
      balanceWeight: 600,
      status: 'RECEIVED',
      averageRate: 320,
      amount: 576000,
      balanceAmount: 192000,
      vehicleNumber: 'AP 31 TH 7741',
      driverName: 'P. Appa Rao',
      remarks: 'Live harvest cage delivery.'
    }
  ],

  commercialTxns: [
    { sNo: 1, txnId: 'CTX-2026-0045', date: '07/10/2026', rawDate: '2026-10-07', center: 'Visakhapatnam Gate Dock', supplier: 'Sri Sai Aqua Farms & Seedlings', agent: 'East Coast Brokers', description: 'Raw Material Intake Harvest Lot LOT-2026-00128', plant: 'DFL UNIT-1 (VSP)', amountInr: 1900000, amountUsd: 22891, type: 'PURCHASE_PAYABLE', status: 'PENDING' },
    { sNo: 2, txnId: 'CTX-2026-0044', date: '06/10/2026', rawDate: '2026-10-06', center: 'Machilipatnam Delta #3', supplier: 'Krishna Delta Prawn Harvesters', agent: 'Direct Farmer', description: 'Coldstore Direct Staging Freight Reimbursement', plant: 'DFL UNIT-4 (PND)', amountInr: 120350, amountUsd: 1450, type: 'LOGISTICS_FEE', status: 'CLEARED' },
    { sNo: 3, txnId: 'CTX-2026-0043', date: '06/10/2026', rawDate: '2026-10-06', center: 'Amalapuram Harvesters #4', supplier: 'Konaseema Marine Harvesters', agent: 'Coastal Marine Agency', description: 'Agent Procurement Commission Settlement #AG-104', plant: 'DFL UNIT-6 (JPT-II)', amountInr: 81340, amountUsd: 980, type: 'COMMISSION_FEE', status: 'SETTLED' },
    { sNo: 4, txnId: 'CTX-2026-0042', date: '05/10/2026', rawDate: '2026-10-05', center: 'Ongole Coastal Hub #1', supplier: 'Nellore Brackish Aqua Cultivators', agent: 'Nellore Aqua Syndicate', description: 'Harvest Contract Booking Advance PB-2026-108', plant: 'DFL UNIT-2 (KKD)', amountInr: 498000, amountUsd: 6000, type: 'ADVANCE_PAID', status: 'POSTED' },
    { sNo: 5, txnId: 'CTX-2026-0041', date: '04/10/2026', rawDate: '2026-10-04', center: 'Bhimavaram Center #1', supplier: 'Godavari Coastal Aqua Farms', agent: 'Delta Seafood Associates', description: 'Raw Material Harvest Intake Lot LOT-2026-00125', plant: 'DFL UNIT-5 (JPT)', amountInr: 760000, amountUsd: 9156, type: 'PURCHASE_PAYABLE', status: 'POSTED' },
    { sNo: 6, txnId: 'CTX-2026-0040', date: '03/10/2026', rawDate: '2026-10-03', center: 'Kakinada Sea Intake #2', supplier: 'Sagar Marine Hatcheries & Cultivators', agent: 'Sagar Marine Brokers', description: 'Black Tiger Harvest Booking PB-2026-092 Advance', plant: 'DFL UNIT-3 (PSP)', amountInr: 415000, amountUsd: 5000, type: 'ADVANCE_PAID', status: 'POSTED' },
    { sNo: 7, txnId: 'CTX-2026-0039', date: '01/10/2026', rawDate: '2026-10-01', center: 'Machilipatnam Delta #3', supplier: 'Krishna Delta Prawn Harvesters', agent: 'Direct Farmer', description: 'Ice & Crate Transportation Settlement', plant: 'DFL UNIT-4 (PND)', amountInr: 68060, amountUsd: 820, type: 'LOGISTICS_FEE', status: 'CLEARED' },
    { sNo: 8, txnId: 'CTX-2026-0038', date: '30/09/2026', rawDate: '2026-09-30', center: 'Visakhapatnam Gate Dock', supplier: 'East Coast Aqua Society', agent: 'East Coast Brokers', description: 'Deep Sea Barramundi Lot Weighment Settlement', plant: 'DFL UNIT-1 (VSP)', amountInr: 576000, amountUsd: 6939, type: 'PURCHASE_PAYABLE', status: 'SETTLED' },
    { sNo: 9, txnId: 'CTX-2026-0037', date: '28/09/2026', rawDate: '2026-09-28', center: 'Ongole Coastal Hub #1', supplier: 'Coastal Andhra Aquatics', agent: 'Nellore Aqua Syndicate', description: 'Section 194Q TDS Statutory Tax Provision', plant: 'DFL UNIT-2 (KKD)', amountInr: 25730, amountUsd: 310, type: 'TDS_PAYABLE', status: 'POSTED' },
    { sNo: 10, txnId: 'CTX-2026-0036', date: '25/09/2026', rawDate: '2026-09-25', center: 'Bhimavaram Center #1', supplier: 'Godavari Coastal Aqua Farms', agent: 'Coastal Marine Agency', description: 'Grade Quality Yield Incentive Credit Bonus', plant: 'DFL UNIT-5 (JPT)', amountInr: 44820, amountUsd: 540, type: 'ADJUSTMENT_CREDIT', status: 'CLEARED' }
  ],

  paymentsList: [
    { sNo: 1, voucherNo: 'PAY-2026-055', paymentDate: '07/10/2026', rawDate: '2026-10-07', center: 'Visakhapatnam Gate Dock', type: 'PURCHASE_PAYABLE', supplierName: 'Sri Sai Aqua Farms & Seedlings', agent: 'East Coast Brokers', plant: 'DFL UNIT-1 (VSP)', billNo: 'BILL-2026-121', bankRef: 'HDFC-RTGS-991204', amountInr: 1450000, amountUsd: 17469, paymentMode: 'RTGS / Bank Wire', status: 'COMPLETED' },
    { sNo: 2, voucherNo: 'PAY-2026-054', paymentDate: '06/10/2026', rawDate: '2026-10-06', center: 'Machilipatnam Delta #3', type: 'LOGISTICS_FEE', supplierName: 'Krishna Delta Prawn Harvesters', agent: 'Direct Farmer', plant: 'DFL UNIT-4 (PND)', billNo: 'BILL-2026-120', bankRef: 'SBI-NEFT-881920', amountInr: 890000, amountUsd: 10722, paymentMode: 'NEFT', status: 'COMPLETED' },
    { sNo: 3, voucherNo: 'PAY-2026-053', paymentDate: '06/10/2026', rawDate: '2026-10-06', center: 'Amalapuram Harvesters #4', type: 'COMMISSION_FEE', supplierName: 'Konaseema Marine Harvesters', agent: 'Coastal Marine Agency', plant: 'DFL UNIT-6 (JPT-II)', billNo: 'BILL-2026-119', bankRef: 'ICICI-IMPS-774019', amountInr: 520000, amountUsd: 6265, paymentMode: 'Direct Bank Transfer', status: 'PROCESSING' },
    { sNo: 4, voucherNo: 'PAY-2026-052', paymentDate: '05/10/2026', rawDate: '2026-10-05', center: 'Ongole Coastal Hub #1', type: 'ADVANCE_PAID', supplierName: 'Nellore Brackish Aqua Cultivators', agent: 'Nellore Aqua Syndicate', plant: 'DFL UNIT-2 (KKD)', billNo: 'BILL-2026-116', bankRef: 'AXIS-RTGS-552910', amountInr: 1200000, amountUsd: 14457, paymentMode: 'RTGS / Bank Wire', status: 'COMPLETED' },
    { sNo: 5, voucherNo: 'PAY-2026-051', paymentDate: '04/10/2026', rawDate: '2026-10-04', center: 'Bhimavaram Center #1', type: 'PURCHASE_PAYABLE', supplierName: 'Godavari Coastal Aqua Farms', agent: 'Delta Seafood Associates', plant: 'DFL UNIT-5 (JPT)', billNo: 'BILL-2026-118', bankRef: 'HDFC-RTGS-990184', amountInr: 380000, amountUsd: 4578, paymentMode: 'RTGS / Bank Wire', status: 'COMPLETED' },
    { sNo: 6, voucherNo: 'PAY-2026-050', paymentDate: '03/10/2026', rawDate: '2026-10-03', center: 'Visakhapatnam Gate Dock', type: 'PURCHASE_PAYABLE', supplierName: 'East Coast Aqua Society', agent: 'East Coast Brokers', plant: 'DFL UNIT-1 (VSP)', billNo: 'BILL-2026-114', bankRef: 'SBI-NEFT-441029', amountInr: 350000, amountUsd: 4216, paymentMode: 'NEFT', status: 'PENDING' },
    { sNo: 7, voucherNo: 'PAY-2026-049', paymentDate: '02/10/2026', rawDate: '2026-10-02', center: 'Ongole Coastal Hub #1', type: 'TDS_PAYABLE', supplierName: 'Coastal Andhra Aquatics', agent: 'Nellore Aqua Syndicate', plant: 'DFL UNIT-2 (KKD)', billNo: 'BILL-2026-113', bankRef: 'CANARA-CHQ-104921', amountInr: 410000, amountUsd: 4939, paymentMode: 'Cheque Disbursement', status: 'HELD' },
    { sNo: 8, voucherNo: 'PAY-2026-048', paymentDate: '02/10/2026', rawDate: '2026-10-02', center: 'Kakinada Sea Intake #2', type: 'ADVANCE_PAID', supplierName: 'Sagar Marine Hatcheries & Cultivators', agent: 'Sagar Marine Brokers', plant: 'DFL UNIT-3 (PSP)', billNo: 'BILL-2026-117', bankRef: 'SBI-NEFT-440192', amountInr: 1085000, amountUsd: 13072, paymentMode: 'NEFT', status: 'COMPLETED' },
    { sNo: 9, voucherNo: 'PAY-2026-045', paymentDate: '01/10/2026', rawDate: '2026-10-01', center: 'Visakhapatnam Gate Dock', type: 'PURCHASE_PAYABLE', supplierName: 'Sri Sai Aqua Farms & Seedlings', agent: 'East Coast Brokers', plant: 'DFL UNIT-1 (VSP)', billNo: 'BILL-2026-112', bankRef: 'HDFC-RTGS-330192', amountInr: 950000, amountUsd: 11445, paymentMode: 'RTGS / Bank Wire', status: 'COMPLETED' },
    { sNo: 10, voucherNo: 'PAY-2026-042', paymentDate: '30/09/2026', rawDate: '2026-09-30', center: 'Machilipatnam Delta #3', type: 'PURCHASE_PAYABLE', supplierName: 'Krishna Delta Prawn Harvesters', agent: 'Direct Farmer', plant: 'DFL UNIT-4 (PND)', billNo: 'BILL-2026-115', bankRef: 'ICICI-IMPS-889102', amountInr: 1512000, amountUsd: 18216, paymentMode: 'Direct Bank Transfer', status: 'COMPLETED' }
  ],

  centersList: [
    { centerName: 'Bhimavaram Center #1', code: 'BVM-C1', plant: 'DFL UNIT-5 (JPT)', totalLots: 38, totalQtyKg: 40200, yieldPct: 69.4, avgRateInr: 385 },
    { centerName: 'Kakinada Sea Intake #2', code: 'KKD-C2', plant: 'DFL UNIT-3 (PSP)', totalLots: 28, totalQtyKg: 27150, yieldPct: 69.1, avgRateInr: 410 },
    { centerName: 'Amalapuram Harvesters #4', code: 'AML-C4', plant: 'DFL UNIT-6 (JPT-II)', totalLots: 22, totalQtyKg: 22500, yieldPct: 68.8, avgRateInr: 375 },
    { centerName: 'Machilipatnam Delta #3', code: 'MCN-C3', plant: 'DFL UNIT-4 (PND)', totalLots: 20, totalQtyKg: 20100, yieldPct: 69.8, avgRateInr: 390 },
    { centerName: 'Ongole Coastal Hub #1', code: 'ONG-C1', plant: 'DFL UNIT-2 (KKD)', totalLots: 16, totalQtyKg: 16050, yieldPct: 69.2, avgRateInr: 380 },
    { centerName: 'Visakhapatnam Gate Dock', code: 'VSP-D1', plant: 'DFL UNIT-1 (VSP)', totalLots: 14, totalQtyKg: 13200, yieldPct: 70.1, avgRateInr: 420 }
  ],

  purchaseReportsList: [
    { id: 'RPT-01', title: 'Purchase Report', desc: 'Item-wise purchase details', icon: '📄', color: 'bg-[#F0F9FF] text-[#0284C7]' },
    { id: 'RPT-02', title: 'Count-wise Report', desc: 'Purchase by count/size', icon: '#️⃣', color: 'bg-[#E6FCFF] text-[#008DA6]' },
    { id: 'RPT-03', title: 'Center-wise Report', desc: 'Purchase by center', icon: '🏢', color: 'bg-[#FFF0B3] text-[#8f4d00]' },
    { id: 'RPT-04', title: 'Supplier-wise Report', desc: 'Purchase by supplier', icon: '👥', color: 'bg-[#E3FCEF] text-[#006644]' },
    { id: 'RPT-05', title: 'Purchase Abstract', desc: 'Center-wise abstract', icon: '📑', color: 'bg-[#EAE6FF] text-[#403294]' },
    { id: 'RPT-06', title: 'Date-wise Report', desc: 'Purchase by date', icon: '📅', color: 'bg-[#FFEBE6] text-[#BF2600]' },
    { id: 'RPT-07', title: 'Bill-wise Report', desc: 'Supplier/center bills', icon: '📋', color: 'bg-[#FFF0B3] text-[#8f4d00]' },
    { id: 'RPT-08', title: 'Monthly Report', desc: 'Month-wise purchase', icon: '🗓️', color: 'bg-[#E3FCEF] text-[#006644]' },
    { id: 'RPT-09', title: 'Payment Report', desc: 'Payment date-wise', icon: '💳', color: 'bg-[#FFEBE6] text-[#BF2600]' },
    { id: 'RPT-10', title: 'Purchase Supplier-wise', desc: 'Supplier-wise purchase', icon: '👤', color: 'bg-[#F0F9FF] text-[#0284C7]' },
    { id: 'RPT-11', title: 'Supplier Bill-wise', desc: 'Supplier bill details', icon: '🧾', color: 'bg-[#EAE6FF] text-[#403294]' },
    { id: 'RPT-12', title: 'Supplier Ledger', desc: 'Ledger report', icon: '📖', color: 'bg-[#E3FCEF] text-[#006644]' },
    { id: 'RPT-13', title: 'TDS Report', desc: 'TDS deduction report', icon: '🏷️', color: 'bg-[#FFF0B3] text-[#8f4d00]' },
    { id: 'RPT-14', title: 'RM Arrival', desc: 'Overall RM arrival', icon: '🚚', color: 'bg-[#EAE6FF] text-[#403294]' },
    { id: 'RPT-15', title: 'Agent Commission', desc: 'Agent commission report', icon: '💼', color: 'bg-[#F0F9FF] text-[#0284C7]' }
  ],

  render(containerId, subPage = 'rm-dashboard', activeHash = '#/purchase/dashboard/rm-dashboard') {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Render On-Screen Tabs Header (omitted for Payments submenu as requested)
    const isPayments = (activeHash || '').includes('/payments') || subPage === 'payment-summary' || subPage === 'bill-date-payment';

    container.innerHTML = `
      ${!isPayments ? '<div id="purchase-tab-bar-container"></div>' : ''}
      <div id="purchase-subpage-content"></div>
    `;

    if (!isPayments) {
      TabBar.render('purchase-tab-bar-container', activeHash);
    }
    const subContainer = document.getElementById('purchase-subpage-content');

    // Display instant Skeleton Shimmer Placeholder matching the target tab
    if (subPage === 'rm-dashboard' || subPage === 'commercial-dashboard') {
      subContainer.innerHTML = Skeleton.renderDashboard();
    } else {
      subContainer.innerHTML = Skeleton.renderTable(6, 6);
    }

    // Smoothly transition into loaded data
    setTimeout(() => {
      switch (subPage) {
        // 1. Sub Menu: Dashboard
        case 'rm-dashboard':
          this.renderRMDashboard(subContainer);
          break;
        case 'commercial-dashboard':
          this.renderCommercialDashboard(subContainer);
          break;

        // 2. Sub Menu: Operations
        case 'bookings':
          this.renderBookings(subContainer);
          break;
        case 'rm-arrivals':
          this.renderRMArrivals(subContainer);
          break;
        case 'arrivals':
          this.renderArrivals(subContainer);
          break;
        case 'lot-tracking':
          this.renderLotTracking(subContainer);
          break;

        // 3. Sub Menu: Transactions & Bills
        case 'supplier-bills':
          this.renderSupplierBills(subContainer);
          break;
        case 'commercial-txns':
          this.renderCommercialTransactions(subContainer);
          break;

        // 4. Sub Menu: Payments
        case 'payment-summary':
          this.renderPaymentSummary(subContainer);
          break;
        case 'bill-date-payment':
          this.renderBillDatePayment(subContainer);
          break;

        default:
          this.renderRMDashboard(subContainer);
          break;
      }
    }, 140);
  },

  // =========================================================================
  // SUB MENU: DASHBOARD -> TAB 1: RAW MATERIAL DASHBOARD (COMPLETE USER DESIGN)
  // =========================================================================
  renderRMDashboard(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <!-- Top Page Title Header -->
        <div class="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div>
            <h1 class="text-xl font-extrabold text-[#172B4D]">Raw Material Dashboard</h1>
          </div>
        </div>
        
        <!-- Main Dashboard Header Card with Collapsible Filters -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <div class="flex items-center justify-between pb-1">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-[#0284C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
              <h3 class="text-xs font-bold text-[#172B4D]">Search &amp; Filters</h3>
            </div>

            <!-- Filter Controls: Reset & Toggle Open/Close -->
            <div class="flex items-center gap-2">
              <button type="button" onclick="const s = document.querySelectorAll('#rm-filter-body select'); s.forEach(sel => sel.selectedIndex = 0); Toast.show('Filters reset', 'info');" class="dt-top-filter-reset-btn text-xs font-semibold text-[#5E6C84] hover:text-[#172B4D] hover:bg-[#F4F5F7] px-2.5 py-1.5 rounded border border-[#DFE1E6] flex items-center gap-1.5 transition-colors cursor-pointer" title="Reset all filters">
                <svg class="w-3.5 h-3.5 text-[#6B778C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Reset</span>
              </button>

              <button type="button" onclick="const b = document.getElementById('rm-filter-body'); const t = this.querySelector('.rm-toggle-text'); const ic = this.querySelector('svg'); const h = b ? b.previousElementSibling : null; b.classList.toggle('hidden'); if(b.classList.contains('hidden')){ t.innerText='Show Filter'; this.title='Show Filter'; ic.classList.add('-rotate-90'); if(h){ h.classList.remove('pb-1'); h.classList.add('pb-0'); } this.className='dt-top-filter-toggle-btn text-xs font-semibold text-[#5E6C84] bg-[#FAFBFC] hover:bg-[#EBECF0] px-2.5 py-1.5 rounded border border-[#DFE1E6] flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer'; } else { t.innerText='Hide Filter'; this.title='Hide Filter'; ic.classList.remove('-rotate-90'); if(h){ h.classList.add('pb-1'); h.classList.remove('pb-0'); } this.className='dt-top-filter-toggle-btn text-xs font-semibold text-[#0284C7] bg-[#F0F9FF]/80 hover:bg-[#F0F9FF] px-2.5 py-1.5 rounded border border-[#BAE6FD] flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer'; }" class="dt-top-filter-toggle-btn text-xs font-semibold text-[#0284C7] bg-[#F0F9FF]/80 hover:bg-[#F0F9FF] px-2.5 py-1.5 rounded border border-[#BAE6FD] flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer" title="Hide Filter">
                <svg class="w-3.5 h-3.5 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                <span class="rm-toggle-text">Hide Filter</span>
              </button>
            </div>
          </div>

          <!-- Collapsible Filter Inputs Grid -->
          <div id="rm-filter-body" class="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-xs transition-all duration-200">
            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">SPECIES</label>
              <select class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                <option>All Species (Select)</option>
                <option selected>Vannamei (VM)</option>
                <option>Black Tiger (BT)</option>
                <option>Asian Seabass</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">CENTER</label>
              <select class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                <option>All Centers (Select)</option>
                <option>Bhimavaram Center #1</option>
                <option>Kakinada Sea Intake #2</option>
                <option>Amalapuram Harvesters #4</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">PLANT</label>
              <select class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                <option>All Plants (Select)</option>
                <option>DFL UNIT-5 (JPT)</option>
                <option>DFL UNIT-3 (PSP)</option>
                <option>DFL UNIT-6 (JPT-II)</option>
                <option>DFL UNIT-4 (PND)</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">FROM DATE</label>
              <div class="erp-date-wrapper">
                <input type="date" value="2026-10-05" class="erp-date-input w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" onclick="this.showPicker ? this.showPicker() : this.focus()" />
              </div>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">TO DATE</label>
              <div class="erp-date-wrapper">
                <input type="date" value="2026-10-06" class="erp-date-input w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" onclick="this.showPicker ? this.showPicker() : this.focus()" />
              </div>
            </div>

            <div class="flex items-end">
              <button onclick="Toast.show('Dashboard filters applied successfully', 'info');" class="btn-primary px-5 py-1.5 rounded text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer h-[31px]">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Watermelon UI Metric Cards (Clean Light Mode) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <!-- 1. Total Quantity -->
          <div class="bg-white border border-[#EDEDED] rounded-xl p-4 flex items-center justify-between shadow-xs hover:border-[#0284C7]/40 transition-colors">
            <div>
              <span class="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">TOTAL QUANTITY</span>
              <div class="text-2xl font-black text-[#0A1B39] mt-1 tracking-tight">142,500 <span class="text-xs font-semibold text-[#64748B]">Kg</span></div>
              <div class="mt-1 flex items-center gap-1 text-[11px] font-semibold text-[#10B981]">
                <span>↑ 8.4%</span>
                <span class="text-[#94A3B8] font-normal">vs last week</span>
              </div>
            </div>
            <div class="w-10 h-10 rounded-lg bg-[#EDF3FC] flex items-center justify-center text-[#0284C7] shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>
            </div>
          </div>

          <!-- 2. Head On Qty -->
          <div class="bg-white border border-[#EDEDED] rounded-xl p-4 flex items-center justify-between shadow-xs hover:border-[#10B981]/40 transition-colors">
            <div>
              <span class="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">HEAD ON QTY</span>
              <div class="text-2xl font-black text-[#0A1B39] mt-1 tracking-tight">142,500 <span class="text-xs font-semibold text-[#64748B]">Kg</span></div>
              <div class="mt-1 flex items-center gap-1 text-[11px] font-semibold text-[#10B981]">
                <span>↑ 100%</span>
                <span class="text-[#94A3B8] font-normal">weighbridge verified</span>
              </div>
            </div>
            <div class="w-10 h-10 rounded-lg bg-[#ECFDF5] flex items-center justify-center text-[#10B981] shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
            </div>
          </div>

          <!-- 3. Damage Weight -->
          <div class="bg-white border border-[#EDEDED] rounded-xl p-4 flex items-center justify-between shadow-xs hover:border-[#FF5150]/40 transition-colors">
            <div>
              <span class="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">DAMAGE WEIGHT</span>
              <div class="text-2xl font-black text-[#FF5150] mt-1 tracking-tight">1,250 <span class="text-xs font-semibold text-[#64748B]">Kg</span></div>
              <div class="mt-1 flex items-center gap-1 text-[11px] font-semibold text-[#FF5150]">
                <span>0.88%</span>
                <span class="text-[#94A3B8] font-normal">tolerance limit: 1.5%</span>
              </div>
            </div>
            <div class="w-10 h-10 rounded-lg bg-[#FEF2F2] flex items-center justify-center text-[#FF5150] shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            </div>
          </div>

          <!-- 4. Pending Production -->
          <div class="bg-white border border-[#EDEDED] rounded-xl p-4 flex items-center justify-between shadow-xs hover:border-[#F59E0B]/40 transition-colors">
            <div>
              <span class="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">PENDING PRODUCTION</span>
              <div class="text-2xl font-black text-[#0A1B39] mt-1 tracking-tight">48,200 <span class="text-xs font-semibold text-[#64748B]">Kg</span></div>
              <div class="mt-1 flex items-center gap-1 text-[11px] font-semibold text-[#F59E0B]">
                <span>33.8%</span>
                <span class="text-[#94A3B8] font-normal">queued in staging</span>
              </div>
            </div>
            <div class="w-10 h-10 rounded-lg bg-[#FFFBEB] flex items-center justify-center text-[#F59E0B] shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
          </div>
        </div>

        <!-- Section 1 Charts from Screenshot 1: Sum of QTY by SPECIES & Sum of QTY by PLANT -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div class="lg:col-span-4 bg-white p-4 rounded-xl border border-[#DFE1E6] shadow-xs">
            <h3 class="font-bold text-sm text-[#172B4D] mb-3">Sum of QTY by SPECIES</h3>
            <div class="h-64">
              <canvas id="chart-sum-qty-species"></canvas>
            </div>
          </div>

          <div class="lg:col-span-8 bg-white p-4 rounded-xl border border-[#DFE1E6] shadow-xs">
            <h3 class="font-bold text-sm text-[#172B4D] mb-3">Sum of QTY by PLANT</h3>
            <div class="h-64">
              <canvas id="chart-sum-qty-plant"></canvas>
            </div>
          </div>
        </div>

        <!-- Section 2 Charts from Screenshot 2: Production Details & Pending Production Details -->
        <div class="grid grid-cols-1 gap-4">
          <div class="bg-white p-4 rounded-xl border border-[#DFE1E6] shadow-xs">
            <div class="flex items-center justify-between mb-2">
              <div>
                <h3 class="font-bold text-sm text-[#172B4D]">Production Details</h3>
                <p class="text-xs text-[#6B778C]">Production quantity and composition by category</p>
              </div>
            </div>
            <div class="h-56">
              <canvas id="chart-production-composition"></canvas>
            </div>
          </div>

          <div class="bg-white p-4 rounded-xl border border-[#DFE1E6] shadow-xs">
            <div class="flex items-center justify-between mb-2">
              <div>
                <h3 class="font-bold text-sm text-[#172B4D]">Pending Production Details</h3>
                <p class="text-xs text-[#6B778C]">Remaining unpeeled and un-frozen production across plants</p>
              </div>
            </div>
            <div class="h-56">
              <canvas id="chart-pending-production-plants"></canvas>
            </div>
          </div>
        </div>

        <!-- Section 3 from Screenshot 3: Time Vs Price Analysis + Abstract Cards -->
        <div class="bg-white p-4 rounded-xl border border-[#DFE1E6] shadow-xs space-y-4">
          <div class="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 class="font-bold text-base text-[#172B4D]">Time Vs Price Analysis</h3>
              <p class="text-xs text-[#6B778C]">Daily trend curves across count sizes (80, 90, 100 counts/kg)</p>
            </div>
            
            <!-- Count Size Pills from Screenshot 3 -->
            <div class="flex items-center gap-1 overflow-x-auto text-[11px]  py-1">
              ${['20', '20.5', '21', '22', '23', '24', '24.5', '25', '26', '27', '28', '29', '30', '31', '32', '32.5', '33', '34'].map(cnt => `
                <button class="px-2 py-0.5 rounded border border-[#DFE1E6] bg-[#FAFBFC] hover:bg-[#F0F9FF] text-[#172B4D]">${cnt}</button>
              `).join('')}
              <button class="btn-primary px-3 py-1 rounded text-xs ml-2 font-semibold">View current prices</button>
            </div>
          </div>

          <div class="h-64">
            <canvas id="chart-time-vs-price"></canvas>
          </div>

          <!-- Bottom Split Cards from Screenshot 3: Purchase Abstract & RM Arrival Summary -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-3 border-t border-[#EBECF0]">
            <!-- Purchase Abstract Card -->
            <div class="bg-[#FAFBFC] p-4 rounded-lg border border-[#DFE1E6]">
              <h4 class="font-bold text-xs text-[#172B4D] uppercase tracking-wider mb-3">Purchase Abstract</h4>
              <div class="grid grid-cols-2 gap-2 text-xs">
                <div class="bg-white p-2.5 rounded border border-[#EBECF0]">
                  <span class="text-[#6B778C] text-[11px]">HONV QTY</span>
                  <div class=" font-bold text-sm text-[#17191c] mt-0.5">138,500 KG</div>
                </div>
                <div class="bg-white p-2.5 rounded border border-[#EBECF0]">
                  <span class="text-[#6B778C] text-[11px]">HONV VALUE</span>
                  <div class=" font-bold text-sm text-[#006644] mt-0.5">₹ 5,26,30,000</div>
                </div>
                <div class="bg-white p-2.5 rounded border border-[#EBECF0]">
                  <span class="text-[#6B778C] text-[11px]">HONBT QTY</span>
                  <div class=" font-bold text-sm text-[#6554C0] mt-0.5">4,000 KG</div>
                </div>
                <div class="bg-white p-2.5 rounded border border-[#EBECF0]">
                  <span class="text-[#6B778C] text-[11px]">HONBT VALUE</span>
                  <div class=" font-bold text-sm text-[#006644] mt-0.5">₹ 24,80,000</div>
                </div>
              </div>
            </div>

            <!-- RM Arrival Summary Card -->
            <div class="bg-[#FAFBFC] p-4 rounded-lg border border-[#DFE1E6]">
              <h4 class="font-bold text-xs text-[#172B4D] uppercase tracking-wider mb-3">RM Arrival Summary</h4>
              <div class="grid grid-cols-2 gap-2 text-xs">
                <div class="bg-white p-2.5 rounded border border-[#EBECF0]">
                  <span class="text-[#6B778C] text-[11px]">TOTAL QTY (KG)</span>
                  <div class=" font-bold text-base text-[#17191c] mt-0.5">142,500 KG</div>
                </div>
                <div class="bg-white p-2.5 rounded border border-[#EBECF0]">
                  <span class="text-[#6B778C] text-[11px]">TOTAL VALUE (INR / USD)</span>
                  <div class=" font-bold text-base text-[#006644] mt-0.5">₹ 5.51 Cr <span class="text-xs text-[#5E6C84]">($664k)</span></div>
                </div>
              </div>
              <div class="mt-3 p-2 bg-[#F0F9FF] text-[#0369A1] rounded text-[11px] flex justify-between items-center font-medium">
                <span>Avg Processing Yield: <strong>69.37%</strong></span>
                <span>Active Supplier Centers: <strong>6 Units</strong></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 4: Top 10 Centers by Total Quantity Table -->
        <div class="bg-white p-4 rounded-xl border border-[#DFE1E6] shadow-xs">
          <div class="flex items-center justify-between mb-3">
            <div>
              <h3 class="font-bold text-sm text-[#172B4D]">Quantity by Center</h3>
              <p class="text-[11px] text-[#6B778C]">Top procurement centers ranked by intake volume</p>
            </div>
            <a href="#/purchase/operations/rm-arrivals" class="text-xs font-semibold text-[#17191c] hover:underline font-bold">View All Arrivals →</a>
          </div>
          <div id="rm-top-centers-table"></div>
        </div>

      </div>
    `;

    // Render all real-world charts
    setTimeout(() => {
      // 1. Sum of QTY by SPECIES
      Charts.renderBarChart(
        'chart-sum-qty-species',
        ['Vannamei (VM)', 'Black Tiger (BT)'],
        [{
          label: 'Quantity (KG)',
          data: [138500, 4000],
          backgroundColor: '#5C6BC0',
          borderRadius: 4
        }],
        {
          scales: {
            y: {
              beginAtZero: true,
              max: 150000,
              ticks: { stepSize: 30000 }
            }
          }
        }
      );

      // 2. Sum of QTY by PLANT (Units 1 to 6)
      Charts.renderBarChart(
        'chart-sum-qty-plant',
        [
          'DFL UNIT-5 (JPT)',
          'DFL UNIT-3 (PSP)',
          'DFL UNIT-6 (JPT-II)',
          'DFL UNIT-4 (PND)',
          'DFL UNIT-2 (KKD)',
          'DFL UNIT-1 (VSP)'
        ],
        [{
          label: 'Intake Quantity (KG)',
          data: [40000, 27000, 22500, 20000, 16000, 13200],
          backgroundColor: '#80DEEA',
          borderRadius: 4
        }],
        {
          scales: {
            y: {
              beginAtZero: true,
              max: 40000,
              ticks: { stepSize: 10000 }
            }
          }
        }
      );

      // 3. Production Composition Multi-Series
      Charts.renderBarChart(
        'chart-production-composition',
        ['Intake Batch #1', 'Intake Batch #2', 'Intake Batch #3', 'Intake Batch #4', 'Intake Batch #5'],
        [
          { label: 'HeadOn Qty (T)', data: [45, 38, 42, 35, 40], backgroundColor: '#2196F3' },
          { label: 'Grading Qty (T)', data: [43, 37, 40, 34, 38], backgroundColor: '#4CAF50' },
          { label: 'VaOut Qty (T)', data: [28, 24, 27, 22, 26], backgroundColor: '#FF9800' },
          { label: 'SoakOut Qty (T)', data: [29, 25, 28, 23, 27], backgroundColor: '#E91E63' },
          { label: 'Freezing Qty (T)', data: [29, 25, 28, 23, 27], backgroundColor: '#9C27B0' }
        ]
      );

      // 4. Pending Production Across Plants
      Charts.renderBarChart(
        'chart-pending-production-plants',
        ['DFL Unit-5', 'DFL Unit-3', 'DFL Unit-6', 'DFL Unit-4', 'DFL Unit-2', 'DFL Unit-1'],
        [{
          label: 'Pending Unprocessed (Tons)',
          data: [14.2, 10.5, 8.8, 6.2, 5.0, 3.5],
          backgroundColor: '#FFAB00',
          borderRadius: 4
        }]
      );

      // 5. Time Vs Price Spline Chart from Screenshot 3
      Charts.renderLineChart(
        'chart-time-vs-price',
        ['2026-09-05', '2026-09-06', '2026-09-10', '2026-09-11', '2026-09-13', '2026-09-16', '2026-09-17', '2026-09-18', '2026-09-20', '2026-09-24', '2026-09-26', '2026-09-27', '2026-10-04'],
        [
          { label: 'Count 80 (₹/KG)', data: [310, 305, 310, 315, 300, 310, 310, 310, 310, 310, 310, 310, 320], borderColor: '#2196F3', fill: false },
          { label: 'Count 90 (₹/KG)', data: [280, 280, 280, 280, 280, 285, 285, 285, 280, 285, 285, 285, 290], borderColor: '#4CAF50', fill: false },
          { label: 'Count 100 (₹/KG)', data: [270, 270, 270, 270, 270, 270, 270, 270, 270, 270, 270, 270, 280], borderColor: '#FF9800', fill: false }
        ],
        {
          scales: {
            y: {
              min: 260,
              max: 330,
              ticks: { stepSize: 10 }
            }
          }
        }
      );
    }, 50);

    // Quantity by Center Table
    new DataTable({
      containerId: 'rm-top-centers-table',
      data: this.centersList,
      keyField: 'code',
      pageSize: 6,
      searchable: false,
      exportable: true,
      hideTopFilterBar: true,
      columns: [
        { field: 'code', header: 'Center Code', render: (v) => `<span class=" font-bold text-[#17191c]">${v}</span>` },
        { field: 'centerName', header: 'Center Name', render: (v) => `<span class="font-semibold text-[#172B4D]">${v}</span>` },
        { field: 'plant', header: 'Mapped Plant Facility' },
        { field: 'totalLots', header: 'Lots Supplied', render: (v) => `<span class=" font-bold">${v} Lots</span>` },
        { field: 'totalQtyKg', header: 'Total Qty (KG)', render: (v) => `<span class=" font-bold text-[#006644]">${v.toLocaleString()} KG</span>` },
        { field: 'yieldPct', header: 'Avg Yield %', render: (v) => `<span class="font-bold text-[#17191c] ">${v}%</span>` },
        { field: 'avgRateInr', header: 'Avg Rate (INR)', render: (v) => `<span class="">₹ ${v}/KG</span>` }
      ]
    });
  },

  // =========================================================================
  // =========================================================================
  // SUB MENU: DASHBOARD -> TAB 2: COMMERCIAL DASHBOARD (SCREENSHOT MATCHING)
  // =========================================================================
  renderCommercialDashboard(container) {
    // Station Data Dictionary matching the exact screenshot metrics
    const stationData = {
      'ALL': {
        name: 'All Purchase Station',
        totalLots: 152,
        abLots: 0,
        returnLots: 0,
        borderCounts: 85,
        gradingPendings: 133,
        billPendings: 69,
        purchaseQtyTotal: '293.35',
        siteWeightment: '208.13T',
        siteWeightmentVal: 208.13,
        plantWeightment: '85.22T',
        plantWeightmentVal: 85.22,
        dailyLabels: ['01-10-26', '01-10-26', '02-10-26', '05-10-26'],
        dailyData: [30.00, 165.00, 90.00, 0.00],
        headlessTotal: '207.34',
        honQty: '293.35',
        honPacked: '0',
        avgYield: '70.68',
        headlessBars: [
          0.8, 1.2, 3.4, 0.5, 2.1, 7.8, 0.9, 14.5, 0.8, 22.4,
          16.8, 21.2, 2.3, 0.9, 2.5, 8.2, 0.9, 2.1, 3.6, 6.2,
          1.8, 4.2, 5.1, 1.4, 0.7, 1.5, 0.6, 0.4, 0.2, 0.5
        ],
        suppliersCount: 55,
        suppliersList: [
          { name: 'P BABUJI', lots: 6 },
          { name: 'MAA SAREI TRADERS', lots: 5 },
          { name: 'PERICHERLA AVINASH', lots: 4 },
          { name: 'SAIKRISHNAAGROFARMS', lots: 3 },
          { name: 'VARSHITHA TRADERS', lots: 3 },
          { name: 'DEVI FISHERIES LIMITED', lots: 3 },
          { name: 'RAMESH CHANDRA SARAKAR', lots: 2 },
          { name: 'PRASANTHI AQUA FEEDS', lots: 2 },
          { name: 'K.V.RAMA RAJU', lots: 2 },
          { name: 'MEENAKSHI FISHERIES', lots: 2 },
          { name: 'M.V.S.R.S.Y.PRASAD RAJU', lots: 2 },
          { name: 'K.SRINIVAS', lots: 2 },
          { name: 'SRAVANTHI AQUA FARMS', lots: 2 },
          { name: 'DATLA KIRAN KUMAR RAJU', lots: 2 },
          { name: 'P.SRINIVASA RAO', lots: 2 },
          { name: 'VIJAYA LAKSHMI ENTERPRISES', lots: 2 },
          { name: 'P.VAMSI KRISHNA RAJU', lots: 1 },
          { name: 'P.RAMARAO', lots: 1 },
          { name: 'P.CHINTA RAO', lots: 1 },
          { name: 'P.BHASKARRAO', lots: 1 },
          { name: 'P V R ENTERPRISES', lots: 1 },
          { name: 'DEVI AQUA TRADERS', lots: 1 },
          { name: 'CH.CHANDRA SEKHAR', lots: 1 },
          { name: 'B.SRINIVASA RAO', lots: 1 },
          { name: 'BH.SRINIVASA RAO', lots: 1 },
          { name: 'INDRA TRADERS (KINDRA VENKATA)', lots: 1 },
          { name: 'VATTURI CHANDRAKALA', lots: 1 },
          { name: 'K.GOPAL NAIDU', lots: 1 },
          { name: 'BIO BELL', lots: 1 },
          { name: 'ANUSHA', lots: 1 },
          { name: 'Other Active Suppliers (25)', lots: 93 }
        ]
      },
      'SKM': {
        name: 'Srikakulam Station (SKM)',
        totalLots: 48,
        abLots: 0,
        returnLots: 0,
        borderCounts: 28,
        gradingPendings: 42,
        billPendings: 21,
        purchaseQtyTotal: '94.60',
        siteWeightment: '68.20T',
        siteWeightmentVal: 68.20,
        plantWeightment: '26.40T',
        plantWeightmentVal: 26.40,
        dailyLabels: ['01-10-26', '01-10-26', '02-10-26', '05-10-26'],
        dailyData: [12.00, 52.00, 30.60, 0.00],
        headlessTotal: '66.85',
        honQty: '94.60',
        honPacked: '0',
        avgYield: '70.66',
        headlessBars: [
          0.3, 0.4, 1.1, 0.2, 0.7, 2.5, 0.3, 4.6, 0.3, 7.2,
          5.4, 6.8, 0.8, 0.3, 0.8, 2.6, 0.3, 0.7, 1.2, 2.0,
          0.6, 1.3, 1.6, 0.5, 0.2, 0.5, 0.2, 0.1, 0.1, 0.2
        ],
        suppliersCount: 18,
        suppliersList: [
          { name: 'P BABUJI', lots: 4 },
          { name: 'MAA SAREI TRADERS', lots: 3 },
          { name: 'SAIKRISHNAAGROFARMS', lots: 3 },
          { name: 'RAMESH CHANDRA SARAKAR', lots: 2 },
          { name: 'VARSHITHA TRADERS', lots: 2 },
          { name: 'Other Active Suppliers (13)', lots: 34 }
        ]
      },
      'RPL': {
        name: 'Rajahmundry Plant (RPL)',
        totalLots: 36,
        abLots: 0,
        returnLots: 0,
        borderCounts: 19,
        gradingPendings: 31,
        billPendings: 16,
        purchaseQtyTotal: '68.45',
        siteWeightment: '48.15T',
        siteWeightmentVal: 48.15,
        plantWeightment: '20.30T',
        plantWeightmentVal: 20.30,
        dailyLabels: ['01-10-26', '01-10-26', '02-10-26', '05-10-26'],
        dailyData: [8.00, 38.45, 22.00, 0.00],
        headlessTotal: '48.38',
        honQty: '68.45',
        honPacked: '0',
        avgYield: '70.68',
        headlessBars: [
          0.2, 0.3, 0.8, 0.1, 0.5, 1.8, 0.2, 3.4, 0.2, 5.2,
          3.9, 4.9, 0.5, 0.2, 0.6, 1.9, 0.2, 0.5, 0.8, 1.4,
          0.4, 1.0, 1.2, 0.3, 0.2, 0.3, 0.1, 0.1, 0.1, 0.1
        ],
        suppliersCount: 14,
        suppliersList: [
          { name: 'PERICHERLA AVINASH', lots: 4 },
          { name: 'DEVI FISHERIES LIMITED', lots: 3 },
          { name: 'PRASANTHI AQUA FEEDS', lots: 2 },
          { name: 'MEENAKSHI FISHERIES', lots: 2 },
          { name: 'Other Active Suppliers (10)', lots: 25 }
        ]
      },
      'KKD': {
        name: 'Kakinada Dock (KKD)',
        totalLots: 38,
        abLots: 0,
        returnLots: 0,
        borderCounts: 22,
        gradingPendings: 34,
        billPendings: 18,
        purchaseQtyTotal: '72.80',
        siteWeightment: '51.90T',
        siteWeightmentVal: 51.90,
        plantWeightment: '20.90T',
        plantWeightmentVal: 20.90,
        dailyLabels: ['01-10-26', '01-10-26', '02-10-26', '05-10-26'],
        dailyData: [6.00, 42.80, 24.00, 0.00],
        headlessTotal: '51.45',
        honQty: '72.80',
        honPacked: '0',
        avgYield: '70.67',
        headlessBars: [
          0.2, 0.3, 0.9, 0.1, 0.5, 2.0, 0.2, 3.6, 0.2, 5.6,
          4.2, 5.3, 0.6, 0.2, 0.6, 2.1, 0.2, 0.5, 0.9, 1.5,
          0.5, 1.0, 1.3, 0.4, 0.2, 0.4, 0.1, 0.1, 0.1, 0.1
        ],
        suppliersCount: 15,
        suppliersList: [
          { name: 'K.V.RAMA RAJU', lots: 2 },
          { name: 'M.V.S.R.S.Y.PRASAD RAJU', lots: 2 },
          { name: 'DATLA KIRAN KUMAR RAJU', lots: 2 },
          { name: 'SRAVANTHI AQUA FARMS', lots: 2 },
          { name: 'Other Active Suppliers (11)', lots: 30 }
        ]
      },
      'BVM': {
        name: 'Bhimavaram Center (BVM)',
        totalLots: 30,
        abLots: 0,
        returnLots: 0,
        borderCounts: 16,
        gradingPendings: 26,
        billPendings: 14,
        purchaseQtyTotal: '57.50',
        siteWeightment: '39.88T',
        siteWeightmentVal: 39.88,
        plantWeightment: '17.62T',
        plantWeightmentVal: 17.62,
        dailyLabels: ['01-10-26', '01-10-26', '02-10-26', '05-10-26'],
        dailyData: [4.00, 31.75, 13.40, 0.00],
        headlessTotal: '40.66',
        honQty: '57.50',
        honPacked: '0',
        avgYield: '70.71',
        headlessBars: [
          0.1, 0.2, 0.7, 0.1, 0.4, 1.5, 0.2, 2.8, 0.2, 4.4,
          3.3, 4.2, 0.5, 0.2, 0.5, 1.6, 0.2, 0.4, 0.7, 1.2,
          0.4, 0.8, 1.0, 0.3, 0.1, 0.3, 0.1, 0.1, 0.1, 0.1
        ],
        suppliersCount: 12,
        suppliersList: [
          { name: 'P.SRINIVASA RAO', lots: 2 },
          { name: 'VIJAYA LAKSHMI ENTERPRISES', lots: 2 },
          { name: 'K.SRINIVAS', lots: 2 },
          { name: 'Other Active Suppliers (9)', lots: 24 }
        ]
      },
      'VSP': {
        name: 'Visakhapatnam Gate (VSP)',
        totalLots: 24,
        abLots: 0,
        returnLots: 0,
        borderCounts: 12,
        gradingPendings: 18,
        billPendings: 10,
        purchaseQtyTotal: '45.20',
        siteWeightment: '31.50T',
        siteWeightmentVal: 31.50,
        plantWeightment: '13.70T',
        plantWeightmentVal: 13.70,
        dailyLabels: ['01-10-26', '01-10-26', '02-10-26', '05-10-26'],
        dailyData: [3.00, 24.20, 18.00, 0.00],
        headlessTotal: '31.95',
        honQty: '45.20',
        honPacked: '0',
        avgYield: '70.69',
        headlessBars: [
          0.1, 0.2, 0.5, 0.1, 0.3, 1.2, 0.2, 2.2, 0.2, 3.5,
          2.6, 3.3, 0.4, 0.1, 0.4, 1.3, 0.1, 0.3, 0.6, 0.9,
          0.3, 0.6, 0.8, 0.2, 0.1, 0.2, 0.1, 0.1, 0.1, 0.1
        ],
        suppliersCount: 10,
        suppliersList: [
          { name: 'DEVI AQUA TRADERS', lots: 2 },
          { name: 'CH.CHANDRA SEKHAR', lots: 2 },
          { name: 'B.SRINIVASA RAO', lots: 2 },
          { name: 'Other Active Suppliers (7)', lots: 18 }
        ]
      }
    };

    const pieColors = [
      '#FF7043', '#42A5F5', '#66BB6A', '#FFA726', '#AB47BC', '#26C6DA', '#EC407A', '#5C6BC0',
      '#9CCC65', '#FFCA28', '#26A69A', '#7E57C2', '#FF8A65', '#29B6F6', '#81C784', '#FFB74D',
      '#BA68C8', '#4DD0E1', '#F06292', '#7986CB', '#AED581', '#FFD54F', '#4DB6AC', '#9575CD',
      '#FFAB91', '#4FC3F7', '#A5D6A7', '#FFE082', '#CE93D8', '#80DEEA', '#F48FB1', '#9FA8DA'
    ];

    // Render Clean Container Layout matching Screenshot Exactly
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#172B4D]">
        <!-- Top Page Title Header -->
        <div class="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div>
            <h1 class="text-xl font-extrabold text-[#172B4D]">Commercial Dashboard</h1>
          </div>
        </div>

        <!-- Collapsible Search & Filters Card -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <div class="flex items-center justify-between pb-1">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-[#0284C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
              <h3 class="text-xs font-bold text-[#172B4D]">Search &amp; Filters</h3>
            </div>

            <!-- Filter Controls: Reset & Toggle Open/Close -->
            <div class="flex items-center gap-2">
              <button type="button" id="comm-filter-reset-btn" class="dt-top-filter-reset-btn text-xs font-semibold text-[#5E6C84] hover:text-[#172B4D] hover:bg-[#F4F5F7] px-2.5 py-1.5 rounded border border-[#DFE1E6] flex items-center gap-1.5 transition-colors cursor-pointer" title="Reset all filters">
                <svg class="w-3.5 h-3.5 text-[#6B778C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                <span>Reset</span>
              </button>

              <button type="button" id="comm-filter-toggle-btn" class="dt-top-filter-toggle-btn text-xs font-semibold text-[#0284C7] bg-[#F0F9FF]/80 hover:bg-[#F0F9FF] px-2.5 py-1.5 rounded border border-[#BAE6FD] flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer" title="Hide Filter">
                <svg class="w-3.5 h-3.5 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                <span class="comm-toggle-text">Hide Filter</span>
              </button>
            </div>
          </div>

          <!-- Collapsible Filter Inputs Grid -->
          <div id="comm-filter-body" class="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-xs transition-all duration-200">
            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">PURCHASE STATION</label>
              <select id="comm-station-filter" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                <option value="ALL">All Purchase Station</option>
                <option value="SKM">Srikakulam Station (SKM)</option>
                <option value="RPL">Rajahmundry Plant (RPL)</option>
                <option value="KKD">Kakinada Dock (KKD)</option>
                <option value="BVM">Bhimavaram Center (BVM)</option>
                <option value="VSP">Visakhapatnam Gate (VSP)</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">YEAR</label>
              <select id="comm-year-filter" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">MONTH</label>
              <select id="comm-month-filter" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                <option value="October">October</option>
                <option value="September">September</option>
                <option value="August">August</option>
                <option value="July">July</option>
                <option value="June">June</option>
                <option value="May">May</option>
                <option value="April">April</option>
                <option value="March">March</option>
                <option value="February">February</option>
                <option value="January">January</option>
                <option value="December">December</option>
                <option value="November">November</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">FROM DATE</label>
              <div class="erp-date-wrapper">
                <input type="date" id="comm-from-date" value="2026-10-01" class="erp-date-input w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" onclick="this.showPicker ? this.showPicker() : this.focus()">
              </div>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">TO DATE</label>
              <div class="erp-date-wrapper">
                <input type="date" id="comm-to-date" value="2026-10-06" class="erp-date-input w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" onclick="this.showPicker ? this.showPicker() : this.focus()">
              </div>
            </div>

            <!-- Search Button -->
            <div class="flex items-end">
              <button type="button" id="comm-search-btn" class="btn-primary px-5 py-1.5 rounded text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer h-[31px]">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Main Dashboard Content Grid -->
        <div class="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
          <!-- Left Main Area (KPIs + Daily Bar + Headless Details) -->
          <div class="xl:col-span-8 space-y-4">
            <!-- 6 KPI Dashlet Cards Grid (2 rows x 3 columns) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              <!-- Total Lots (Blue) -->
              <div class="bg-white border border-[#BAE6FD] rounded-xl p-4 flex items-center justify-between">
                <div>
                  <span class="text-xs font-bold text-[#17191c] uppercase tracking-wider">TOTAL LOTS</span>
                  <div class="text-2xl font-black text-[#172B4D] mt-1" id="comm-kpi-total-lots">152</div>
                </div>
                <div class="w-10 h-10 rounded-lg bg-[#BAE6FD]/60 flex items-center justify-center text-[#0284C7]">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                </div>
              </div>

              <!-- AB+ Lots (Green) -->
              <div class="bg-white border border-[#ABF5D1] rounded-xl p-4 flex items-center justify-between">
                <div>
                  <span class="text-xs font-bold text-[#006644] uppercase tracking-wider">AB+ LOTS</span>
                  <div class="text-2xl font-black text-[#172B4D] mt-1" id="comm-kpi-ab-lots">0</div>
                </div>
                <div class="w-10 h-10 rounded-lg bg-[#ABF5D1]/60 flex items-center justify-center text-[#006644]">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h18v4H3V3zm2 4v13a1 1 0 001 1h12a1 1 0 001-1V7M9 11v6m6-6v6"/></svg>
                </div>
              </div>

              <!-- Return Lots (Red) -->
              <div class="bg-white border border-[#FFBDAD] rounded-xl p-4 flex items-center justify-between">
                <div>
                  <span class="text-xs font-bold text-[#BF2600] uppercase tracking-wider">RETURN LOTS</span>
                  <div class="text-2xl font-black text-[#BF2600] mt-1" id="comm-kpi-return-lots">0</div>
                </div>
                <div class="w-10 h-10 rounded-lg bg-[#FFBDAD]/60 flex items-center justify-center text-[#BF2600]">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                </div>
              </div>

              <!-- Border Counts (Purple) -->
              <div class="bg-white border border-[#C0B6F2] rounded-xl p-4 flex items-center justify-between">
                <div>
                  <span class="text-xs font-bold text-[#5243AA] uppercase tracking-wider">BORDER COUNTS</span>
                  <div class="text-2xl font-black text-[#172B4D] mt-1" id="comm-kpi-border-counts">85</div>
                </div>
                <div class="w-10 h-10 rounded-lg bg-[#C0B6F2]/60 flex items-center justify-center text-[#5243AA]">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
                </div>
              </div>

              <!-- Grading Pendings (Amber/Yellow) -->
              <div class="bg-white border border-[#FFE380] rounded-xl p-4 flex items-center justify-between">
                <div>
                  <span class="text-xs font-bold text-[#8F4D00] uppercase tracking-wider">GRADING PENDINGS</span>
                  <div class="text-2xl font-black text-[#8F4D00] mt-1" id="comm-kpi-grading-pendings">133</div>
                </div>
                <div class="w-10 h-10 rounded-lg bg-[#FFE380]/60 flex items-center justify-center text-[#8F4D00]">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
              </div>

              <!-- Bill Pendings (Cyan/Teal) -->
              <div class="bg-white border border-[#B6F0FF] rounded-xl p-4 flex items-center justify-between">
                <div>
                  <span class="text-xs font-bold text-[#008DA6] uppercase tracking-wider">BILL PENDINGS</span>
                  <div class="text-2xl font-black text-[#008DA6] mt-1" id="comm-kpi-bill-pendings">69</div>
                </div>
                <div class="w-10 h-10 rounded-lg bg-[#B6F0FF]/60 flex items-center justify-center text-[#008DA6]">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                </div>
              </div>
            </div>

            <!-- Daily Purchase Analytics Bar Chart -->
            <div class="bg-white p-4 rounded-xl border border-[#DFE1E6] shadow-2xs">
              <h3 class="font-bold text-sm text-[#172B4D] mb-3">Daily Purchase Analytics</h3>
              <div class="h-[210px] w-full">
                <canvas id="comm-daily-purchase-canvas"></canvas>
              </div>
            </div>

            <!-- Headless Details Bar Chart with Checkbox Legend -->
            <div class="bg-white p-4 rounded-xl border border-[#DFE1E6] shadow-2xs">
              <div class="flex items-center justify-between mb-2">
                <h3 class="font-bold text-sm text-[#172B4D]">Headless Details - <span id="comm-headless-total">207.34</span> T</h3>
              </div>
              <div class="h-[190px] w-full">
                <canvas id="comm-headless-canvas"></canvas>
              </div>
              <div class="mt-3 pt-3 border-t border-[#F4F5F7] flex flex-wrap items-center justify-around gap-4 text-xs font-semibold text-[#172B4D]">
                <label class="inline-flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" id="comm-chk-hon-qty" checked class="w-4 h-4 rounded text-[#0284C7] focus:ring-[#0284C7] border-[#DFE1E6]" />
                  <span>Hon Qty- <span id="comm-val-hon-qty">293.35</span> T</span>
                </label>
                <label class="inline-flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" id="comm-chk-hon-packed" checked class="w-4 h-4 rounded text-[#0284C7] focus:ring-[#0284C7] border-[#DFE1E6]" />
                  <span>Hon Packed- <span id="comm-val-hon-packed">0</span> T</span>
                </label>
                <label class="inline-flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" id="comm-chk-avg-yield" checked class="w-4 h-4 rounded text-[#0284C7] focus:ring-[#0284C7] border-[#DFE1E6]" />
                  <span>Avg Yield- <span id="comm-val-avg-yield">70.68</span> %</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Right Column (Purchase Quantity Donut + Suppliers Pie) -->
          <div class="xl:col-span-4 space-y-4">
            <!-- Purchase Quantity Card with Donut Chart -->
            <div class="bg-white p-4 rounded-xl border border-[#DFE1E6] shadow-2xs flex flex-col justify-between">
              <h3 class="font-bold text-sm text-[#172B4D] mb-1">Purchase Quantity - <span id="comm-purchase-qty-title">293.35</span> T</h3>
              <div class="h-[210px] w-full flex items-center justify-center my-1">
                <canvas id="comm-purchase-qty-canvas"></canvas>
              </div>
              <div class="mt-2 pt-3 border-t border-[#F4F5F7] grid grid-cols-2 text-center">
                <div class="flex flex-col items-center">
                  <div class="flex items-center gap-1.5 text-xs text-[#6B778C] font-medium">
                    <span class="w-2.5 h-2.5 rounded-full bg-[#E91E63]"></span>
                    <span>Site Weightment</span>
                  </div>
                  <span class="text-xs font-bold text-[#172B4D] mt-1" id="comm-site-weightment">208.13T</span>
                </div>
                <div class="flex flex-col items-center">
                  <div class="flex items-center gap-1.5 text-xs text-[#6B778C] font-medium">
                    <span class="w-2.5 h-2.5 rounded-full bg-[#E65100]"></span>
                    <span>Plant Weightment</span>
                  </div>
                  <span class="text-xs font-bold text-[#172B4D] mt-1" id="comm-plant-weightment">85.22T</span>
                </div>
              </div>
            </div>

            <!-- Suppliers Supplied Lots Card with Multi-slice Pie Chart -->
            <div class="bg-white p-4 rounded-xl border border-[#DFE1E6] shadow-2xs flex flex-col justify-between">
              <h3 class="font-bold text-sm text-[#172B4D] mb-1">Suppliers Supplied Lots - <span id="comm-supp-lots">152</span> Lots / <span id="comm-supp-count">55</span> Suppliers</h3>
              <div class="h-[260px] w-full flex items-center justify-center my-1">
                <canvas id="comm-suppliers-canvas"></canvas>
              </div>
              <!-- Supplier Breakdown List with Color Indicators -->
              <div class="mt-2 pt-2 border-t border-[#F4F5F7] max-h-[105px] overflow-y-auto space-y-1 pr-1" id="comm-supplier-breakdown">
                <!-- Rendered dynamically -->
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Internal charts instance registry
    let activeCharts = {
      daily: null,
      headless: null,
      donut: null,
      suppliers: null
    };

    const destroyCharts = () => {
      if (activeCharts.daily) { activeCharts.daily.destroy(); activeCharts.daily = null; }
      if (activeCharts.headless) { activeCharts.headless.destroy(); activeCharts.headless = null; }
      if (activeCharts.donut) { activeCharts.donut.destroy(); activeCharts.donut = null; }
      if (activeCharts.suppliers) { activeCharts.suppliers.destroy(); activeCharts.suppliers = null; }
    };

    // Update and Render function
    const applyStationData = (stationKey) => {
      const d = stationData[stationKey] || stationData['ALL'];

      // 1. Update KPI Values
      const elTotalLots = document.getElementById('comm-kpi-total-lots');
      const elAbLots = document.getElementById('comm-kpi-ab-lots');
      const elReturnLots = document.getElementById('comm-kpi-return-lots');
      const elBorderCounts = document.getElementById('comm-kpi-border-counts');
      const elGradingPendings = document.getElementById('comm-kpi-grading-pendings');
      const elBillPendings = document.getElementById('comm-kpi-bill-pendings');

      if (elTotalLots) elTotalLots.textContent = d.totalLots;
      if (elAbLots) elAbLots.textContent = d.abLots;
      if (elReturnLots) elReturnLots.textContent = d.returnLots;
      if (elBorderCounts) elBorderCounts.textContent = d.borderCounts;
      if (elGradingPendings) elGradingPendings.textContent = d.gradingPendings;
      if (elBillPendings) elBillPendings.textContent = d.billPendings;

      // 2. Update Headless Details Card Header & Checkbox text
      const elHeadlessTotal = document.getElementById('comm-headless-total');
      const elValHonQty = document.getElementById('comm-val-hon-qty');
      const elValHonPacked = document.getElementById('comm-val-hon-packed');
      const elValAvgYield = document.getElementById('comm-val-avg-yield');

      if (elHeadlessTotal) elHeadlessTotal.textContent = d.headlessTotal;
      if (elValHonQty) elValHonQty.textContent = d.honQty;
      if (elValHonPacked) elValHonPacked.textContent = d.honPacked;
      if (elValAvgYield) elValAvgYield.textContent = d.avgYield;

      // 3. Update Purchase Quantity Header & Legend
      const elPurchaseQtyTitle = document.getElementById('comm-purchase-qty-title');
      const elSiteWeightment = document.getElementById('comm-site-weightment');
      const elPlantWeightment = document.getElementById('comm-plant-weightment');

      if (elPurchaseQtyTitle) elPurchaseQtyTitle.textContent = d.purchaseQtyTotal;
      if (elSiteWeightment) elSiteWeightment.textContent = d.siteWeightment;
      if (elPlantWeightment) elPlantWeightment.textContent = d.plantWeightment;

      // 4. Update Suppliers Header & Breakdown list
      const elSuppLots = document.getElementById('comm-supp-lots');
      const elSuppCount = document.getElementById('comm-supp-count');
      const elSuppBreakdown = document.getElementById('comm-supplier-breakdown');

      if (elSuppLots) elSuppLots.textContent = d.totalLots;
      if (elSuppCount) elSuppCount.textContent = d.suppliersCount;

      if (elSuppBreakdown) {
        elSuppBreakdown.innerHTML = d.suppliersList.map((s, idx) => `
          <div class="flex items-center justify-between text-[#172B4D] hover:bg-[#F4F5F7] px-2 py-0.5 rounded cursor-default transition-colors">
            <div class="flex items-center gap-1.5 truncate">
              <span class="w-2 h-2 rounded-full shrink-0" style="background-color: ${pieColors[idx % pieColors.length]}"></span>
              <span class="truncate font-medium text-[10px] text-[#42526E]">${s.name}</span>
            </div>
            <span class="font-bold text-[10px] text-[#0284C7] shrink-0 ml-2">${s.lots} Lots</span>
          </div>
        `).join('');
      }

      // 5. Clean up old charts before rendering new ones
      destroyCharts();

      // Chart A: Daily Purchase Analytics Bar Chart
      const dailyCanvas = document.getElementById('comm-daily-purchase-canvas');
      if (dailyCanvas && typeof Chart !== 'undefined') {
        activeCharts.daily = new Chart(dailyCanvas, {
          type: 'bar',
          data: {
            labels: d.dailyLabels,
            datasets: [{
              data: d.dailyData,
              backgroundColor: '#5C6BC0',
              borderRadius: 2,
              barThickness: 34
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: '#172B4D',
                titleFont: { size: 11, family: 'Inter' },
                bodyFont: { size: 10, family: 'Inter' },
                padding: 6,
                callbacks: {
                  label: (ctx) => `Intake: ${ctx.parsed.y.toFixed(2)} T`
                }
              }
            },
            scales: {
              x: {
                grid: { display: false },
                ticks: { font: { size: 10, family: 'Inter' }, color: '#6B778C' }
              },
              y: {
                beginAtZero: true,
                max: 200,
                ticks: {
                  stepSize: 40,
                  font: { size: 10, family: 'Inter' },
                  color: '#6B778C',
                  callback: (v) => v.toFixed(2)
                },
                grid: { color: '#F4F5F7' }
              }
            }
          }
        });
      }

      // Chart B: Headless Details Bar Chart
      const headlessCanvas = document.getElementById('comm-headless-canvas');
      if (headlessCanvas && typeof Chart !== 'undefined') {
        const headlessLabels = [
          '10/20', '16/20', '21/25', '26/30', '31/35', '36/40', '41/50', '51/60', '61/70', '71/90',
          '91/110', '111/130', '131/150', '151/200', '201/300', '301/500', 'BKN-1', 'BKN-2', 'BKN-3', 'HL-1',
          'HL-2', 'HL-3', 'EZP-1', 'EZP-2', 'PUD-1', 'PUD-2', 'PDTO-1', 'PDTO-2', 'CPTO', 'VAL-1'
        ];
        activeCharts.headless = new Chart(headlessCanvas, {
          type: 'bar',
          data: {
            labels: headlessLabels,
            datasets: [{
              data: d.headlessBars,
              backgroundColor: '#5C6BC0',
              barThickness: 4,
              borderRadius: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: '#172B4D',
                titleFont: { size: 11, family: 'Inter' },
                bodyFont: { size: 10, family: 'Inter' },
                padding: 6,
                callbacks: {
                  label: (ctx) => `Grade ${ctx.label}: ${ctx.parsed.y} T`
                }
              }
            },
            scales: {
              x: {
                grid: { display: false },
                ticks: { display: false }
              },
              y: {
                display: false,
                grid: { display: false }
              }
            }
          }
        });
      }

      // Chart C: Purchase Quantity Donut Chart
      const donutCanvas = document.getElementById('comm-purchase-qty-canvas');
      if (donutCanvas && typeof Chart !== 'undefined') {
        activeCharts.donut = new Chart(donutCanvas, {
          type: 'doughnut',
          data: {
            labels: ['Site Weightment', 'Plant WeightMent'],
            datasets: [{
              data: [d.siteWeightmentVal, d.plantWeightmentVal],
              backgroundColor: ['#E91E63', '#E65100'],
              hoverBackgroundColor: ['#D81B60', '#DD2C00'],
              borderWidth: 2,
              borderColor: '#FFFFFF'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '66%',
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: '#172B4D',
                titleFont: { size: 11, family: 'Inter' },
                bodyFont: { size: 10, family: 'Inter' },
                padding: 6,
                callbacks: {
                  label: (ctx) => `${ctx.label}: ${ctx.parsed} T`
                }
              }
            }
          }
        });
      }

      // Chart D: Suppliers Supplied Lots Pie Chart
      const suppliersCanvas = document.getElementById('comm-suppliers-canvas');
      if (suppliersCanvas && typeof Chart !== 'undefined') {
        const suppLabels = d.suppliersList.map(s => `${s.name} (${s.lots} Lots)`);
        const suppLotsData = d.suppliersList.map(s => s.lots);
        activeCharts.suppliers = new Chart(suppliersCanvas, {
          type: 'pie',
          data: {
            labels: suppLabels,
            datasets: [{
              data: suppLotsData,
              backgroundColor: pieColors.slice(0, suppLotsData.length),
              borderWidth: 1,
              borderColor: '#FFFFFF'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: '#172B4D',
                titleFont: { size: 11, family: 'Inter' },
                bodyFont: { size: 10, family: 'Inter' },
                padding: 6,
                callbacks: {
                  label: (ctx) => ctx.label
                }
              }
            }
          }
        });
      }
    };

    // Initialize with baseline 'ALL' data
    setTimeout(() => {
      applyStationData('ALL');
    }, 50);

    // Filter Change & Search Action Listeners
    const stationFilter = document.getElementById('comm-station-filter');
    const yearFilter = document.getElementById('comm-year-filter');
    const monthFilter = document.getElementById('comm-month-filter');
    const searchBtn = document.getElementById('comm-search-btn');

    const handleFilterUpdate = () => {
      const selectedStation = stationFilter ? stationFilter.value : 'ALL';
      const selectedYear = yearFilter ? yearFilter.value : '2026';
      const selectedMonth = monthFilter ? monthFilter.value : 'October';
      const stationObj = stationData[selectedStation] || stationData['ALL'];

      applyStationData(selectedStation);
      Toast.show(`Commercial Analytics loaded for ${stationObj.name} (${selectedMonth} ${selectedYear})`, 'success');
    };

    if (searchBtn) {
      searchBtn.addEventListener('click', handleFilterUpdate);
    }
    if (stationFilter) {
      stationFilter.addEventListener('change', handleFilterUpdate);
    }
    if (yearFilter) {
      yearFilter.addEventListener('change', handleFilterUpdate);
    }
    if (monthFilter) {
      monthFilter.addEventListener('change', handleFilterUpdate);
    }

    // Reset button
    const resetBtn = document.getElementById('comm-filter-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (stationFilter) stationFilter.selectedIndex = 0;
        if (yearFilter) yearFilter.selectedIndex = 0;
        if (monthFilter) monthFilter.selectedIndex = 0;
        const fromDate = document.getElementById('comm-from-date');
        const toDate = document.getElementById('comm-to-date');
        if (fromDate) fromDate.value = '2026-10-01';
        if (toDate) toDate.value = '2026-10-06';
        applyStationData('ALL');
        Toast.show('Filters reset', 'info');
      });
    }

    // Toggle Hide/Show Filter button
    const toggleBtn = document.getElementById('comm-filter-toggle-btn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const b = document.getElementById('comm-filter-body');
        const t = toggleBtn.querySelector('.comm-toggle-text');
        const ic = toggleBtn.querySelector('svg');
        if (b) {
          b.classList.toggle('hidden');
          const h = b.previousElementSibling;
          if (b.classList.contains('hidden')) {
            if (h) { h.classList.remove('pb-1'); h.classList.add('pb-0'); }
            if (t) t.innerText = 'Show Filter';
            if (ic) ic.classList.add('-rotate-90');
            toggleBtn.className = 'text-xs font-semibold text-[#5E6C84] bg-[#FAFBFC] hover:bg-[#EBECF0] px-3 py-1.5 rounded border border-[#DFE1E6] flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer';
          } else {
            if (h) { h.classList.add('pb-1'); h.classList.remove('pb-0'); }
            if (t) t.innerText = 'Hide Filter';
            if (ic) ic.classList.remove('-rotate-90');
            toggleBtn.className = 'text-xs font-semibold text-[#0284C7] bg-[#F0F9FF]/80 hover:bg-[#F0F9FF] px-3 py-1.5 rounded border border-[#BAE6FD] flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer';
          }
        }
      });
    }

    // Checkbox toggles for headless details
    const chkHonQty = document.getElementById('comm-chk-hon-qty');
    const chkHonPacked = document.getElementById('comm-chk-hon-packed');
    const chkAvgYield = document.getElementById('comm-chk-avg-yield');

    [chkHonQty, chkHonPacked, chkAvgYield].forEach(chk => {
      if (chk) {
        chk.addEventListener('change', (e) => {
          const label = e.target.parentElement.textContent.trim();
          Toast.show(`${label} metric visibility ${e.target.checked ? 'enabled' : 'hidden'}`, 'info');
        });
      }
    });
  },

  // =========================================================================
  // SUB MENU: OPERATIONS -> TAB 1: LOT TRACKING
  // =========================================================================
  renderLotTracking(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <!-- Header with Title -->
        <div class="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div>
            <h1 class="text-xl font-extrabold text-[#172B4D]">Lot Tracking</h1>
          </div>
        </div>

        <!-- Search / Filter Fields (matching bookings list UI) -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs mb-4 transition-all duration-200">
          <div class="flex items-center justify-between pb-1">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-[#0284C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
              <h3 class="text-xs font-bold text-[#172B4D]">Search &amp; Filters</h3>
            </div>

            <!-- Filter Controls: Reset & Toggle Open/Close -->
            <div class="flex items-center gap-2">
              <button type="button" id="lot-top-reset-btn" class="dt-top-filter-reset-btn text-xs font-semibold text-[#5E6C84] hover:text-[#172B4D] hover:bg-[#F4F5F7] px-2.5 py-1.5 rounded border border-[#DFE1E6] flex items-center gap-1.5 transition-colors cursor-pointer" title="Reset all filters">
                <svg class="w-3.5 h-3.5 text-[#6B778C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Reset</span>
              </button>

              <button type="button" id="lot-top-toggle-btn" class="dt-top-filter-toggle-btn text-xs font-semibold text-[#0284C7] bg-[#F0F9FF]/80 hover:bg-[#F0F9FF] px-3 py-1.5 rounded border border-[#BAE6FD] flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer">
                <svg class="w-3.5 h-3.5 dt-top-filter-toggle-icon transform transition-transform duration-200" id="lot-top-toggle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                <span class="dt-top-filter-toggle-text" id="lot-top-toggle-text">Hide Filter</span>
              </button>
            </div>
          </div>

          <!-- Collapsible Filter Inputs Grid (5 columns) -->
          <div id="lot-top-filter-body" class="dt-top-filter-body mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-xs transition-all duration-200">
            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">PURCHASE STATION</label>
              <select id="lot-station-filter" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                <option value="ALL">All Purchase Station</option>
                <option value="SKM">Srikakulam Station (SKM)</option>
                <option value="RPL">Rajahmundry Plant (RPL)</option>
                <option value="KKD">Kakinada Dock (KKD)</option>
                <option value="BVM">Bhimavaram Center (BVM)</option>
                <option value="VSP">Visakhapatnam Gate (VSP)</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">SPECIES</label>
              <select id="lot-species-filter" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                <option value="ALL">All Species (Select)</option>
                <option value="Vannamei">Vannamei (VM)</option>
                <option value="Black Tiger">Black Tiger (BT)</option>
                <option value="Asian Seabass">Asian Seabass</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">MONTH</label>
              <select id="lot-month-filter" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                <option value="ALL">All Months</option>
                <option value="October" selected>October</option>
                <option value="September">September</option>
                <option value="August">August</option>
                <option value="July">July</option>
                <option value="June">June</option>
                <option value="May">May</option>
                <option value="April">April</option>
                <option value="March">March</option>
                <option value="February">February</option>
                <option value="January">January</option>
                <option value="December">December</option>
                <option value="November">November</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">YEAR</label>
              <select id="lot-year-filter" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                <option value="ALL">All Years</option>
                <option value="2026" selected>2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
              </select>
            </div>

            <div class="flex items-end">
              <button type="button" id="lot-search-btn" class="dt-top-filter-search-btn btn-primary px-5 py-1.5 rounded text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer h-[31px]">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>

        <div id="lot-tracking-table-container"></div>
      </div>
    `;

    const tableInstance = new DataTable({
      containerId: 'lot-tracking-table-container',
      data: ERP_DATA.lots,
      keyField: 'id',
      pageSize: 10,
      hideTopFilterBar: true,
      columns: [
        { 
          field: 'id', 
          header: 'ID', 
          render: (val) => `<span class="font-bold text-[#172B4D]">${val}</span>` 
        },
        { 
          field: 'arrivalDate', 
          header: 'Arrival Date', 
          render: (val) => `<span class="text-[#172B4D]">${val}</span>` 
        },
        { 
          field: 'lotNumber', 
          header: 'Lot Number', 
          render: (val, row) => `
            <div>
              <span class="font-bold text-[#17191c] hover:underline font-bold cursor-pointer" title="Click to view trace">${val}</span>
            </div>
          `
        },
        { 
          field: 'arrivalQty', 
          header: 'Arrival Qty', 
          render: (val) => `<span class="font-semibold text-[#172B4D]">${typeof val === 'number' ? val.toFixed(3) : val}</span>` 
        },
        { 
          field: 'abStatus', 
          header: 'Ab Status', 
          render: (val) => {
            const isPending = !val || String(val).toLowerCase().includes('pending');
            const bg = isPending ? 'bg-[#22C55E]' : 'bg-[#0284C7]';
            return `<span class="inline-block text-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-white whitespace-nowrap shadow-2xs ${bg}">${val || 'Test Pending'}</span>`;
          }
        },
        { 
          field: 'deheadingQty', 
          header: 'Deheading Qty', 
          render: (val) => `<span class="text-[#172B4D] font-medium">${typeof val === 'number' ? val.toFixed(2) : (val || '0.00')}</span>` 
        },
        { 
          field: 'gradingQty', 
          header: 'Grading Qty', 
          render: (val) => `<span class="text-[#172B4D] font-medium">${val || 0}</span>` 
        },
        { 
          field: 'vaQty', 
          header: 'VA Qty', 
          render: (val) => `<span class="text-[#172B4D] font-medium">${val || 0}</span>` 
        },
        { 
          field: 'soakingQty', 
          header: 'Soaking Qty', 
          render: (val) => `<span class="text-[#172B4D] font-medium">${val || 0}</span>` 
        },
        { 
          field: 'packedQty', 
          header: 'Packed Qty', 
          render: (val) => `<span class="text-[#172B4D] font-medium">${val || 0}</span>` 
        }
      ],
      onRowClick: (row) => PurchaseView.showLotTraceabilityDrawer(row)
    });

    const filterStation = document.getElementById('lot-station-filter');
    const filterSpecies = document.getElementById('lot-species-filter');
    const filterMonth = document.getElementById('lot-month-filter');
    const filterYear = document.getElementById('lot-year-filter');
    const searchBtn = document.getElementById('lot-search-btn');
    const resetBtn = document.getElementById('lot-top-reset-btn');
    const toggleBtn = document.getElementById('lot-top-toggle-btn');
    const filterBody = document.getElementById('lot-top-filter-body');
    const toggleText = document.getElementById('lot-top-toggle-text');
    const toggleIcon = document.getElementById('lot-top-toggle-icon');

    // Toggle hide/show filter
    if (toggleBtn && filterBody) {
      let isCollapsed = false;
      toggleBtn.addEventListener('click', () => {
        isCollapsed = !isCollapsed;
        const h = filterBody.previousElementSibling;
        if (isCollapsed) {
          filterBody.classList.add('hidden');
          if (h) { h.classList.remove('pb-1'); h.classList.add('pb-0'); }
          if (toggleText) toggleText.innerText = 'Show Filter';
          if (toggleIcon) toggleIcon.classList.add('-rotate-90');
          toggleBtn.classList.remove('bg-[#F0F9FF]/80', 'text-[#0284C7]', 'border-[#BAE6FD]');
          toggleBtn.classList.add('bg-[#FAFBFC]', 'text-[#5E6C84]', 'border-[#DFE1E6]');
        } else {
          filterBody.classList.remove('hidden');
          if (h) { h.classList.add('pb-1'); h.classList.remove('pb-0'); }
          if (toggleText) toggleText.innerText = 'Hide Filter';
          if (toggleIcon) toggleIcon.classList.remove('-rotate-90');
          toggleBtn.classList.add('bg-[#F0F9FF]/80', 'text-[#0284C7]', 'border-[#BAE6FD]');
          toggleBtn.classList.remove('bg-[#FAFBFC]', 'text-[#5E6C84]', 'border-[#DFE1E6]');
        }
      });
    }

    const applyLotFilters = () => {
      const stationVal = filterStation ? filterStation.value : 'ALL';
      const speciesVal = filterSpecies ? filterSpecies.value : 'ALL';
      const monthVal = filterMonth ? filterMonth.value : 'ALL';
      const yearVal = filterYear ? filterYear.value : 'ALL';

      let filtered = ERP_DATA.lots;
      if (stationVal && stationVal !== 'ALL') {
        filtered = filtered.filter(l => l.currentLocation && l.currentLocation.includes(stationVal));
      }
      if (speciesVal && speciesVal !== 'ALL') {
        filtered = filtered.filter(l => l.species && l.species.includes(speciesVal));
      }
      tableInstance.setData(filtered);
      Toast.show(`Filtered ${filtered.length} lot records.`, 'info', 'Search Results');
    };

    if (searchBtn) searchBtn.addEventListener('click', applyLotFilters);
    if (filterStation) filterStation.addEventListener('change', applyLotFilters);
    if (filterSpecies) filterSpecies.addEventListener('change', applyLotFilters);
    if (filterMonth) filterMonth.addEventListener('change', applyLotFilters);
    if (filterYear) filterYear.addEventListener('change', applyLotFilters);

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (filterStation) filterStation.value = 'ALL';
        if (filterSpecies) filterSpecies.value = 'ALL';
        if (filterMonth) filterMonth.value = 'ALL';
        if (filterYear) filterYear.value = 'ALL';
        tableInstance.setData(ERP_DATA.lots);
        Toast.show('Filters have been reset. Displaying all lots.', 'info');
      });
    }
  },

  // =========================================================================
  // SUB MENU: OPERATIONS -> TAB 1: BOOKINGS (FULL CRUD + SEARCH & FILTERS)
  // =========================================================================
  renderBookings(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div>
            <h1 class="text-xl font-extrabold text-[#172B4D]">Bookings</h1>
          </div>
          <div class="flex items-center gap-2">
            <button id="btn-create-booking" class="btn-primary px-3 py-1.5 rounded text-xs flex items-center gap-1.5 shadow-xs cursor-pointer">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>Create Booking</span>
            </button>
          </div>
        </div>

        <!-- Search / Filter Fields: Select Purchase, Select Arrival Plant, Date -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs mb-4 transition-all duration-200">
          <div class="flex items-center justify-between pb-1">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-[#0284C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
              <h3 class="text-xs font-bold text-[#172B4D]">Search &amp; Filters</h3>
            </div>

            <!-- Filter Controls: Reset & Toggle Open/Close -->
            <div class="flex items-center gap-2">
              <button type="button" id="booking-top-reset-btn" class="dt-top-filter-reset-btn text-xs font-semibold text-[#5E6C84] hover:text-[#172B4D] hover:bg-[#F4F5F7] px-2.5 py-1.5 rounded border border-[#DFE1E6] flex items-center gap-1.5 transition-colors cursor-pointer" title="Reset all filters">
                <svg class="w-3.5 h-3.5 text-[#6B778C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Reset</span>
              </button>

              <button type="button" id="booking-top-toggle-btn" class="dt-top-filter-toggle-btn text-xs font-semibold text-[#0284C7] bg-[#F0F9FF]/80 hover:bg-[#F0F9FF] px-3 py-1.5 rounded border border-[#BAE6FD] flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer">
                <svg class="w-3.5 h-3.5 dt-top-filter-toggle-icon transform transition-transform duration-200" id="booking-top-toggle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                <span class="dt-top-filter-toggle-text" id="booking-top-toggle-text">Hide Filter</span>
              </button>
            </div>
          </div>

          <!-- Collapsible Filter Inputs Grid -->
          <div id="booking-top-filter-body" class="dt-top-filter-body mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-xs transition-all duration-200">
            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">SELECT PURCHASE</label>
              <select id="booking-top-purchase-select" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                <option value="ALL">All Purchases (Select)</option>
                <option value="Direct Farmer Procurement">Direct Farmer Procurement</option>
                <option value="Hatchery Buyback Contract">Hatchery Buyback Contract</option>
                <option value="Agent Procurement Order">Agent Procurement Order</option>
                <option value="Corporate Feed-Linked Booking">Corporate Feed-Linked Booking</option>
                <option value="Spot Market Purchase">Spot Market Purchase</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">SELECT ARRIVAL PLANT</label>
              <select id="booking-top-plant-select" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                <option value="ALL">All Arrival Plants (Select)</option>
                <option value="DFL UNIT-1 (VSP)">DFL UNIT-1 (VSP)</option>
                <option value="DFL UNIT-2 (KKD)">DFL UNIT-2 (KKD)</option>
                <option value="DFL UNIT-3 (PSP)">DFL UNIT-3 (PSP)</option>
                <option value="DFL UNIT-4 (PND)">DFL UNIT-4 (PND)</option>
                <option value="DFL UNIT-5 (JPT)">DFL UNIT-5 (JPT)</option>
                <option value="DFL UNIT-6 (JPT-II)">DFL UNIT-6 (JPT-II)</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">DATE</label>
              <div class="erp-date-wrapper">
                <input type="date" id="booking-top-date-input" value="2026-10-06" class="erp-date-input w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" onclick="this.showPicker ? this.showPicker() : this.focus()">
              </div>
            </div>

            <div class="flex items-end">
              <button type="button" id="booking-top-search-btn" class="dt-top-filter-search-btn btn-primary px-5 py-1.5 rounded text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer h-[31px]">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>

        <div id="bookings-table-container"></div>
        <div id="bookings-totals-container" class="mt-4"></div>
      </div>
    `;

    const renderBookingTotals = (list) => {
      const totalsContainer = document.getElementById('bookings-totals-container');
      if (!totalsContainer) return;
      
      const count = list.length;
      const totalWeight = list.reduce((sum, b) => sum + (parseFloat(b.bookingWeight || b.bookedQty) || 0), 0);
      const totalValue = list.reduce((sum, b) => {
        const wt = parseFloat(b.bookingWeight || b.bookedQty) || 0;
        const rt = parseFloat(b.bookingRate) || 420;
        return sum + (wt * rt);
      }, 0);
      const avgRate = totalWeight > 0 ? (totalValue / totalWeight) : 0;

      totalsContainer.innerHTML = `
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <div class="flex items-center justify-between pb-2 mb-3 border-b border-[#EBECF0]">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-[#0284C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
              <h3 class="text-xs font-bold text-[#172B4D] uppercase tracking-wider">Bookings Total Summary</h3>
            </div>
            <span class="text-xs text-[#5E6C84]">Showing totals for <strong class="text-[#172B4D]">${count}</strong> ${count === 1 ? 'Booking' : 'Bookings'}</span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div class="p-3 bg-[#FAFBFC] rounded-lg border border-[#EBECF0]">
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84] block mb-1">TOTAL BOOKINGS</span>
              <div class="flex items-baseline justify-between">
                <span class="text-lg font-extrabold text-[#172B4D]">${count} Bookings</span>
                <span class="text-[10px] text-[#0284C7] font-semibold bg-[#F0F9FF] px-1.5 py-0.5 rounded">Active Entries</span>
              </div>
            </div>

            <div class="p-3 bg-[#FAFBFC] rounded-lg border border-[#EBECF0]">
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84] block mb-1">TOTAL BOOKING WEIGHT</span>
              <div class="flex items-baseline justify-between">
                <span class="text-lg font-extrabold text-[#006644]">${totalWeight.toLocaleString()} KG</span>
                <span class="text-[10px] text-[#006644] font-semibold bg-[#E3FCEF] px-1.5 py-0.5 rounded">Volume Target</span>
              </div>
            </div>

            <div class="p-3 bg-[#FAFBFC] rounded-lg border border-[#EBECF0]">
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84] block mb-1">TOTAL ESTIMATED VALUE</span>
              <div class="flex items-baseline justify-between">
                <span class="text-lg font-extrabold text-[#0284C7]">₹ ${Math.round(totalValue).toLocaleString()}</span>
                <span class="text-[10px] text-[#5E6C84] font-medium">INR</span>
              </div>
            </div>

            <div class="p-3 bg-[#FAFBFC] rounded-lg border border-[#EBECF0]">
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84] block mb-1">AVERAGE BOOKING RATE</span>
              <div class="flex items-baseline justify-between">
                <span class="text-lg font-extrabold text-[#172B4D]">₹ ${avgRate.toFixed(2)} / KG</span>
                <span class="text-[10px] text-[#006644] font-semibold bg-[#E3FCEF] px-1.5 py-0.5 rounded">Weighted Avg</span>
              </div>
            </div>
          </div>
        </div>
      `;
    };

    const bookingsTable = new DataTable({
      containerId: 'bookings-table-container',
      data: this.bookingsList,
      keyField: 'bookingNo',
      tableTitle: 'Bookings List',
      searchable: false,
      hideTopFilterBar: true,
      showCopy: false,
      onDataChange: (data) => renderBookingTotals(data),
      columns: [
        { 
          field: 'sNo', 
          header: 'S.No', 
          render: (v, row, index) => `<span class="font-bold text-[#5E6C84]">${index !== undefined ? index + 1 : 1}</span>` 
        },
        { 
          field: 'species', 
          header: 'Species', 
          render: (v) => `<span class="font-semibold text-[#172B4D]">${v}</span>` 
        },
        { 
          field: 'bookingNo', 
          header: 'Booking Number', 
          render: (v, row) => `<span class="font-bold text-[#17191c] hover:underline font-bold cursor-pointer" onclick="window.__viewBookingDetails('${row.bookingNo}')">${v}</span>` 
        },
        { 
          field: 'bookingDate', 
          header: 'Booking Date', 
          render: (v, row) => `<span class="text-[#172B4D] font-medium">${v || row.expectedDate}</span>` 
        },
        { 
          field: 'purchaseType', 
          header: 'Purchase Type', 
          render: (v) => `<span class="font-medium text-[#172B4D] bg-[#F4F5F7] px-2 py-0.5 rounded text-[11px] border border-[#DFE1E6]">${v || 'Direct Procurement'}</span>` 
        },
        { 
          field: 'grader', 
          header: 'Grader', 
          render: (v) => `<span class="text-[#172B4D] font-medium">${v || 'B. Venkatesh'}</span>` 
        },
        { 
          field: 'agent', 
          header: 'Agent', 
          render: (v) => `<span class="text-[#5E6C84]">${v || 'Direct'}</span>` 
        },
        { 
          field: 'bookingCount', 
          header: 'Booking Count', 
          render: (v) => `<span class="font-bold text-[#17191c]">${v || '40 Count'}</span>` 
        },
        { 
          field: 'bookingWeight', 
          header: 'Booking Weight', 
          render: (v, row) => `<span class="font-extrabold text-[#006644]">${(typeof v === 'number' ? v : (row.bookedQty || 0)).toLocaleString()} KG</span>` 
        },
        { 
          field: 'bookingRate', 
          header: 'Booking Rate', 
          render: (v) => `<span class="font-bold text-[#172B4D]">₹ ${v || 420} / KG</span>` 
        }
      ],
      actions: [
        {
          label: 'Edit',
          icon: `<svg class="w-4 h-4 text-[#0284C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>`,
          onClick: (row) => PurchaseView.openEditBookingModal(row, bookingsTable)
        },
        {
          label: 'Download',
          icon: `<svg class="w-4 h-4 text-[#00875A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>`,
          onClick: (row) => PurchaseView.downloadRecord(row)
        },
        {
          label: 'Delete',
          icon: `<svg class="w-4 h-4 text-[#FF5630]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>`,
          onClick: (row) => PurchaseView.deleteBooking(row, bookingsTable)
        }
      ],
      onRowClick: (row) => PurchaseView.showBookingDetails(row)
    });

    this.bookingsTable = bookingsTable;
    PurchaseView.bookingsTable = bookingsTable;

    renderBookingTotals(this.bookingsList);

    window.__viewBookingDetails = (bkgNo) => {
      const b = this.bookingsList.find(x => x.bookingNo === bkgNo);
      if (b) PurchaseView.showBookingDetails(b);
    };

    const filterPurchase = document.getElementById('booking-top-purchase-select');
    const filterPlant = document.getElementById('booking-top-plant-select');
    const filterDate = document.getElementById('booking-top-date-input');
    const searchBtn = document.getElementById('booking-top-search-btn');
    const resetBtn = document.getElementById('booking-top-reset-btn');
    const toggleBtn = document.getElementById('booking-top-toggle-btn');
    const filterBody = document.getElementById('booking-top-filter-body');
    const toggleText = document.getElementById('booking-top-toggle-text');
    const toggleIcon = document.getElementById('booking-top-toggle-icon');

    // Toggle hide/show filter
    if (toggleBtn && filterBody) {
      let isCollapsed = false;
      toggleBtn.addEventListener('click', () => {
        isCollapsed = !isCollapsed;
        const h = filterBody.previousElementSibling;
        if (isCollapsed) {
          filterBody.classList.add('hidden');
          if (h) { h.classList.remove('pb-1'); h.classList.add('pb-0'); }
          if (toggleText) toggleText.innerText = 'Show Filter';
          if (toggleIcon) toggleIcon.classList.add('-rotate-90');
          toggleBtn.classList.remove('bg-[#F0F9FF]/80', 'text-[#0284C7]', 'border-[#BAE6FD]');
          toggleBtn.classList.add('bg-[#FAFBFC]', 'text-[#5E6C84]', 'border-[#DFE1E6]');
        } else {
          filterBody.classList.remove('hidden');
          if (h) { h.classList.add('pb-1'); h.classList.remove('pb-0'); }
          if (toggleText) toggleText.innerText = 'Hide Filter';
          if (toggleIcon) toggleIcon.classList.remove('-rotate-90');
          toggleBtn.classList.add('bg-[#F0F9FF]/80', 'text-[#0284C7]', 'border-[#BAE6FD]');
          toggleBtn.classList.remove('bg-[#FAFBFC]', 'text-[#5E6C84]', 'border-[#DFE1E6]');
        }
      });
    }

    const applyBookingFilters = () => {
      const pVal = filterPurchase ? filterPurchase.value : 'ALL';
      const plVal = filterPlant ? filterPlant.value : 'ALL';
      const dVal = (filterDate ? filterDate.value : '').trim();
      let dValAlt = '';
      if (/^\d{4}-\d{2}-\d{2}$/.test(dVal)) {
        const [y, m, d] = dVal.split('-');
        dValAlt = `${d}/${m}/${y}`;
      } else if (/^\d{2}\/\d{2}\/\d{4}$/.test(dVal)) {
        const [d, m, y] = dVal.split('/');
        dValAlt = `${y}-${m}-${d}`;
      }

      const filtered = this.bookingsList.filter(b => {
        const matchPurchase = (pVal === 'ALL') || (b.purchaseType === pVal);
        const matchPlant = (plVal === 'ALL') || (b.arrivalPlant === plVal) || (b.arrivalPlant && b.arrivalPlant.includes(plVal));
        const matchDate = !dVal || (b.bookingDate === dVal) || (b.expectedDate === dVal) || (dValAlt && (b.bookingDate === dValAlt || b.expectedDate === dValAlt)) || (b.bookingDate && b.bookingDate.includes(dVal));
        return matchPurchase && matchPlant && matchDate;
      });

      bookingsTable.setData(filtered);
      renderBookingTotals(filtered);
      Toast.show(`Filtered ${filtered.length} booking records.`, 'info', 'Search Results');
    };

    if (searchBtn) searchBtn.addEventListener('click', applyBookingFilters);
    if (filterPurchase) filterPurchase.addEventListener('change', applyBookingFilters);
    if (filterPlant) filterPlant.addEventListener('change', applyBookingFilters);
    if (filterDate) filterDate.addEventListener('change', applyBookingFilters);

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (filterPurchase) filterPurchase.value = 'ALL';
        if (filterPlant) filterPlant.value = 'ALL';
        if (filterDate) filterDate.value = '';
        bookingsTable.setData(this.bookingsList);
        renderBookingTotals(this.bookingsList);
        Toast.show('Filters have been reset. Displaying all bookings.', 'info');
      });
    }

    const createBtn = document.getElementById('btn-create-booking');
    if (createBtn) {
      createBtn.addEventListener('click', () => PurchaseView.openCreateBookingModal(bookingsTable));
    }
  },

  // =========================================================================
  // SUB MENU: OPERATIONS -> TAB 3: RAW MATERIAL ARRIVALS (FULL CRUD)
  // =========================================================================
  renderRMArrivals(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <!-- Header with Title and Create Button -->
        <div class="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div>
            <h1 class="text-xl font-extrabold text-[#172B4D]">Raw Material Arrivals</h1>
          </div>
          <div class="flex items-center gap-2">
            <button id="btn-create-arrival-modal" class="btn-primary px-3 py-1.5 rounded text-xs flex items-center gap-1.5 shadow-xs cursor-pointer">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>Create RM Arrival</span>
            </button>
          </div>
        </div>

        <!-- Search / Filter Fields: Date, Company, Species, Plant, Center, Weight, Amount, Average Rate -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs mb-4 transition-all duration-200">
          <div class="flex items-center justify-between pb-1">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-[#0284C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
              <h3 class="text-xs font-bold text-[#172B4D]">Search &amp; Filters</h3>
            </div>

            <!-- Filter Controls: Reset & Toggle Open/Close -->
            <div class="flex items-center gap-2">
              <button type="button" id="rm-top-reset-btn" class="dt-top-filter-reset-btn text-xs font-semibold text-[#5E6C84] hover:text-[#172B4D] hover:bg-[#F4F5F7] px-2.5 py-1.5 rounded border border-[#DFE1E6] flex items-center gap-1.5 transition-colors cursor-pointer" title="Reset all filters">
                <svg class="w-3.5 h-3.5 text-[#6B778C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Reset</span>
              </button>

              <button type="button" id="rm-top-toggle-btn" class="dt-top-filter-toggle-btn text-xs font-semibold text-[#0284C7] bg-[#F0F9FF]/80 hover:bg-[#F0F9FF] px-3 py-1.5 rounded border border-[#BAE6FD] flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer">
                <svg class="w-3.5 h-3.5 dt-top-filter-toggle-icon transform transition-transform duration-200" id="rm-top-toggle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                <span class="dt-top-filter-toggle-text" id="rm-top-toggle-text">Hide Filter</span>
              </button>
            </div>
          </div>

          <!-- Collapsible Filter Inputs Grid -->
          <div id="rm-top-filter-body" class="dt-top-filter-body mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-xs transition-all duration-200">
            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">DATE</label>
              <div class="erp-date-wrapper">
                <input type="date" id="rm-top-date-input" value="2026-10-06" class="erp-date-input w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" onclick="this.showPicker ? this.showPicker() : this.focus()">
              </div>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">COMPANY</label>
              <select id="rm-top-company-select" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                <option value="ALL">All Companies</option>
                <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                <option value="DEVI AQUA FEEDS">DEVI AQUA FEEDS</option>
                <option value="DEVI SEAFOODS">DEVI SEAFOODS</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">SPECIES</label>
              <select id="rm-top-species-select" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                <option value="ALL">Select Species</option>
                <option value="Vannamei (VM)">Vannamei (VM)</option>
                <option value="Black Tiger (BT)">Black Tiger (BT)</option>
                <option value="Asian Seabass">Asian Seabass</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">PLANT</label>
              <select id="rm-top-plant-select" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                <option value="ALL">Select Plant</option>
                <option value="DFL UNIT-1 (VSP)">DFL UNIT-1 (VSP)</option>
                <option value="DFL UNIT-2 (KKD)">DFL UNIT-2 (KKD)</option>
                <option value="DFL UNIT-3 (PSP)">DFL UNIT-3 (PSP)</option>
                <option value="DFL UNIT-4 (PND)">DFL UNIT-4 (PND)</option>
                <option value="DFL UNIT-5 (JPT)">DFL UNIT-5 (JPT)</option>
                <option value="DFL UNIT-6 (JPT-II)">DFL UNIT-6 (JPT-II)</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">CENTER</label>
              <select id="rm-top-center-select" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                <option value="ALL">Select Center</option>
                <option value="Bhimavaram Center #1">Bhimavaram Center #1</option>
                <option value="Kakinada Sea Intake #2">Kakinada Sea Intake #2</option>
                <option value="Machilipatnam Delta #3">Machilipatnam Delta #3</option>
                <option value="Amalapuram Harvesters #4">Amalapuram Harvesters #4</option>
                <option value="Ongole Coastal Hub #1">Ongole Coastal Hub #1</option>
                <option value="Visakhapatnam Gate Dock">Visakhapatnam Gate Dock</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">WEIGHT</label>
              <input type="text" id="rm-top-weight-input" placeholder="Enter Weight" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">AMOUNT</label>
              <input type="text" id="rm-top-amount-input" placeholder="Enter Amount" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">AVERAGE RATE</label>
              <input type="text" id="rm-top-avgrate-input" placeholder="Enter Average Rate" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
            </div>

            <div class="flex items-end">
              <button type="button" id="rm-top-search-btn" class="dt-top-filter-search-btn btn-primary px-5 py-1.5 rounded text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer h-[31px]">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Table Container -->
        <div id="rm-arrivals-table-container"></div>
        <div id="rm-arrivals-totals-container" class="mt-4"></div>
      </div>
    `;

    const renderRMArrivalsTotals = (list) => {
      const totalsContainer = document.getElementById('rm-arrivals-totals-container');
      if (!totalsContainer) return;

      const count = list.length;
      const totalWeight = list.reduce((sum, r) => sum + (parseFloat(r.weight) || 0), 0);
      const totalBalanceWeight = list.reduce((sum, r) => sum + (parseFloat(r.balanceWeight) || 0), 0);
      const totalAmount = list.reduce((sum, r) => sum + (parseFloat(r.amount) || 0), 0);
      const totalBalanceAmount = list.reduce((sum, r) => sum + (parseFloat(r.balanceAmount) || 0), 0);
      const avgRate = totalWeight > 0 ? (totalAmount / totalWeight) : 0;

      totalsContainer.innerHTML = `
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <div class="flex items-center justify-between pb-2 mb-3 border-b border-[#EBECF0]">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-[#0284C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
              <h3 class="text-xs font-bold text-[#172B4D] uppercase tracking-wider">Raw Material Arrivals Total Summary</h3>
            </div>
            <span class="text-xs text-[#5E6C84]">Showing totals for <strong class="text-[#172B4D]">${count}</strong> ${count === 1 ? 'Arrival' : 'Arrivals'}</span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div class="p-3 bg-[#FAFBFC] rounded-lg border border-[#EBECF0]">
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84] block mb-1">TOTAL ARRIVALS</span>
              <div class="flex items-baseline justify-between">
                <span class="text-base font-extrabold text-[#172B4D]">${count} Batches</span>
                <span class="text-[10px] text-[#0284C7] font-semibold bg-[#F0F9FF] px-1.5 py-0.5 rounded">Intake</span>
              </div>
            </div>

            <div class="p-3 bg-[#FAFBFC] rounded-lg border border-[#EBECF0]">
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84] block mb-1">TOTAL WEIGHT</span>
              <div class="flex items-baseline justify-between">
                <span class="text-base font-extrabold text-[#006644]">${totalWeight.toLocaleString()} KG</span>
              </div>
            </div>

            <div class="p-3 bg-[#FAFBFC] rounded-lg border border-[#EBECF0]">
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84] block mb-1">BALANCE WEIGHT</span>
              <div class="flex items-baseline justify-between">
                <span class="text-base font-extrabold text-[#FF8B00]">${totalBalanceWeight.toLocaleString()} KG</span>
              </div>
            </div>

            <div class="p-3 bg-[#FAFBFC] rounded-lg border border-[#EBECF0]">
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84] block mb-1">TOTAL AMOUNT</span>
              <div class="flex items-baseline justify-between">
                <span class="text-base font-extrabold text-[#172B4D]">₹ ${Math.round(totalAmount).toLocaleString()}</span>
              </div>
            </div>

            <div class="p-3 bg-[#FAFBFC] rounded-lg border border-[#EBECF0]">
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84] block mb-1">BALANCE AMOUNT</span>
              <div class="flex items-baseline justify-between">
                <span class="text-base font-extrabold text-[#6554C0]">₹ ${Math.round(totalBalanceAmount).toLocaleString()}</span>
              </div>
            </div>

            <div class="p-3 bg-[#FAFBFC] rounded-lg border border-[#EBECF0]">
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84] block mb-1">AVERAGE RATE</span>
              <div class="flex items-baseline justify-between">
                <span class="text-base font-extrabold text-[#0284C7]">₹ ${avgRate.toFixed(2)} / KG</span>
              </div>
            </div>
          </div>
        </div>
      `;
    };

    const arrivalsTable = new DataTable({
      containerId: 'rm-arrivals-table-container',
      data: this.rmArrivalsList,
      keyField: 'arrivalNumber',
      pageSize: 10,
      tableTitle: 'Raw Material Arrivals List',
      searchable: false,
      hideTopFilterBar: true,
      showCopy: false,
      onDataChange: (data) => renderRMArrivalsTotals(data),
      columns: [
        { 
          field: 'sNo', 
          header: 'SNO', 
          render: (v, row, index) => `<span class="font-bold text-[#5E6C84]">${index !== undefined ? index + 1 : 1}</span>` 
        },
        { 
          field: 'date', 
          header: 'Date', 
          render: (v) => `<span class="font-medium text-[#172B4D]">${v || '06/10/2026'}</span>` 
        },
        { 
          field: 'plant', 
          header: 'Plant', 
          render: (v) => `<span class="font-semibold text-[#0284C7]">${v || 'DFL UNIT-5 (JPT)'}</span>` 
        },
        { 
          field: 'center', 
          header: 'Center', 
          render: (v) => `<span class="text-[#172B4D] font-medium">${v || 'Bhimavaram Center #1'}</span>` 
        },
        { 
          field: 'species', 
          header: 'Species', 
          render: (v) => `<span class="font-semibold text-[#172B4D]">${v || 'Vannamei (VM)'}</span>` 
        },
        { 
          field: 'weight', 
          header: 'Weight', 
          render: (v) => `<span class="font-extrabold text-[#006644]">${(typeof v === 'number' ? v : parseFloat(v) || 0).toLocaleString()} KG</span>` 
        },
        { 
          field: 'balanceWeight', 
          header: 'Balance Weight', 
          render: (v) => `<span class="font-bold text-[#FF8B00]">${(typeof v === 'number' ? v : parseFloat(v) || 0).toLocaleString()} KG</span>` 
        },
        { 
          field: 'status', 
          header: 'Status', 
          type: 'status' 
        },
        { 
          field: 'averageRate', 
          header: 'Average Rate', 
          render: (v) => `<span class="font-bold text-[#172B4D]">₹ ${v || 425} / KG</span>` 
        },
        { 
          field: 'amount', 
          header: 'Amount', 
          render: (v) => `<span class="font-extrabold text-[#172B4D]">₹ ${(typeof v === 'number' ? v : parseFloat(v) || 0).toLocaleString()}</span>` 
        },
        { 
          field: 'balanceAmount', 
          header: 'Balance Amount', 
          render: (v) => `<span class="font-bold text-[#6554C0]">₹ ${(typeof v === 'number' ? v : parseFloat(v) || 0).toLocaleString()}</span>` 
        }
      ],
      actions: [
        {
          label: 'Edit',
          icon: `<svg class="w-4 h-4 text-[#0284C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>`,
          onClick: (row) => PurchaseView.openEditArrivalModal(row, arrivalsTable)
        },
        {
          label: 'Download',
          icon: `<svg class="w-4 h-4 text-[#00875A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>`,
          onClick: (row) => PurchaseView.downloadRecord(row)
        },
        {
          label: 'Delete',
          icon: `<svg class="w-4 h-4 text-[#FF5630]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>`,
          onClick: (row) => PurchaseView.deleteArrival(row, arrivalsTable)
        }
      ],
      onRowClick: (row) => PurchaseView.showArrivalDetails(row)
    });

    this.arrivalsTable = arrivalsTable;
    PurchaseView.arrivalsTable = arrivalsTable;

    renderRMArrivalsTotals(this.rmArrivalsList);

    const filterDate = document.getElementById('rm-top-date-input');
    const filterCompany = document.getElementById('rm-top-company-select');
    const filterSpecies = document.getElementById('rm-top-species-select');
    const filterPlant = document.getElementById('rm-top-plant-select');
    const filterCenter = document.getElementById('rm-top-center-select');
    const filterWeight = document.getElementById('rm-top-weight-input');
    const filterAmount = document.getElementById('rm-top-amount-input');
    const filterAvgRate = document.getElementById('rm-top-avgrate-input');
    const searchBtn = document.getElementById('rm-top-search-btn');
    const resetBtn = document.getElementById('rm-top-reset-btn');
    const toggleBtn = document.getElementById('rm-top-toggle-btn');
    const filterBody = document.getElementById('rm-top-filter-body');
    const toggleText = document.getElementById('rm-top-toggle-text');
    const toggleIcon = document.getElementById('rm-top-toggle-icon');

    // Toggle hide/show filter
    if (toggleBtn && filterBody) {
      let isCollapsed = false;
      toggleBtn.addEventListener('click', () => {
        isCollapsed = !isCollapsed;
        const h = filterBody.previousElementSibling;
        if (isCollapsed) {
          filterBody.classList.add('hidden');
          if (h) { h.classList.remove('pb-1'); h.classList.add('pb-0'); }
          if (toggleText) toggleText.innerText = 'Show Filter';
          if (toggleIcon) toggleIcon.classList.add('-rotate-90');
          toggleBtn.classList.remove('bg-[#F0F9FF]/80', 'text-[#0284C7]', 'border-[#BAE6FD]');
          toggleBtn.classList.add('bg-[#FAFBFC]', 'text-[#5E6C84]', 'border-[#DFE1E6]');
        } else {
          filterBody.classList.remove('hidden');
          if (h) { h.classList.add('pb-1'); h.classList.remove('pb-0'); }
          if (toggleText) toggleText.innerText = 'Hide Filter';
          if (toggleIcon) toggleIcon.classList.remove('-rotate-90');
          toggleBtn.classList.add('bg-[#F0F9FF]/80', 'text-[#0284C7]', 'border-[#BAE6FD]');
          toggleBtn.classList.remove('bg-[#FAFBFC]', 'text-[#5E6C84]', 'border-[#DFE1E6]');
        }
      });
    }

    const applyRMFilters = () => {
      const dVal = (filterDate ? filterDate.value : '').trim();
      let dValAlt = '';
      if (/^\d{4}-\d{2}-\d{2}$/.test(dVal)) {
        const [y, m, d] = dVal.split('-');
        dValAlt = `${d}/${m}/${y}`;
      } else if (/^\d{2}\/\d{2}\/\d{4}$/.test(dVal)) {
        const [d, m, y] = dVal.split('/');
        dValAlt = `${y}-${m}-${d}`;
      }
      const compVal = filterCompany ? filterCompany.value : 'ALL';
      const specVal = filterSpecies ? filterSpecies.value : 'ALL';
      const plVal = filterPlant ? filterPlant.value : 'ALL';
      const ctrVal = filterCenter ? filterCenter.value : 'ALL';
      const wtVal = filterWeight ? parseFloat(filterWeight.value) : null;
      const amtVal = filterAmount ? parseFloat(filterAmount.value) : null;
      const rateVal = filterAvgRate ? parseFloat(filterAvgRate.value) : null;

      const filtered = this.rmArrivalsList.filter(item => {
        const matchDate = !dVal || (item.date && (item.date.includes(dVal) || (dValAlt && item.date.includes(dValAlt))));
        const matchComp = (compVal === 'ALL') || (item.company === compVal);
        const matchSpec = (specVal === 'ALL') || (item.species === specVal);
        const matchPlant = (plVal === 'ALL') || (item.plant === plVal) || (item.plant && item.plant.includes(plVal));
        const matchCenter = (ctrVal === 'ALL') || (item.center === ctrVal) || (item.center && item.center.includes(ctrVal));
        const matchWeight = isNaN(wtVal) || wtVal === null || (item.weight >= wtVal);
        const matchAmount = isNaN(amtVal) || amtVal === null || (item.amount >= amtVal);
        const matchRate = isNaN(rateVal) || rateVal === null || (item.averageRate >= rateVal);

        return matchDate && matchComp && matchSpec && matchPlant && matchCenter && matchWeight && matchAmount && matchRate;
      });

      arrivalsTable.setData(filtered);
      renderRMArrivalsTotals(filtered);
      Toast.show(`Filtered ${filtered.length} raw material arrival records.`, 'info', 'Search Results');
    };

    if (searchBtn) searchBtn.addEventListener('click', applyRMFilters);
    if (filterCompany) filterCompany.addEventListener('change', applyRMFilters);
    if (filterSpecies) filterSpecies.addEventListener('change', applyRMFilters);
    if (filterPlant) filterPlant.addEventListener('change', applyRMFilters);
    if (filterCenter) filterCenter.addEventListener('change', applyRMFilters);

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (filterDate) filterDate.value = '06/10/2026';
        if (filterCompany) filterCompany.value = 'DEVI FISHERIES LIMITED';
        if (filterSpecies) filterSpecies.value = 'ALL';
        if (filterPlant) filterPlant.value = 'ALL';
        if (filterCenter) filterCenter.value = 'ALL';
        if (filterWeight) filterWeight.value = '';
        if (filterAmount) filterAmount.value = '';
        if (filterAvgRate) filterAvgRate.value = '';
        arrivalsTable.setData(this.rmArrivalsList);
        renderRMArrivalsTotals(this.rmArrivalsList);
        Toast.show('Filters have been reset. Displaying all RM arrivals.', 'info');
      });
    }

    const createBtn = document.getElementById('btn-create-arrival-modal');
    if (createBtn) {
      createBtn.addEventListener('click', () => PurchaseView.openCreateArrivalModal(arrivalsTable));
    }
  },

  // =========================================================================
  // SUB MENU: OPERATIONS -> TAB 3: ARRIVALS (CENTER CATCH INWARD REGISTER)
  // =========================================================================
  renderArrivals(container) {
    const totalCatchKg = ERP_DATA.arrivals.reduce((sum, a) => sum + (a.netCatchKg || 0), 0);
    const totalCrates = ERP_DATA.arrivals.reduce((sum, a) => sum + (a.cratesIn || 0), 0);

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <!-- Header with Title and Create Button -->
        <div class="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div>
            <h1 class="text-xl font-extrabold text-[#172B4D]">Arrivals Register</h1>
          </div>
          <div class="flex items-center gap-2">
            <button id="btn-create-arrival-record" class="btn-primary px-3 py-1.5 rounded text-xs flex items-center gap-1.5 shadow-xs cursor-pointer">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>Create Arrival</span>
            </button>
          </div>
        </div>

        <!-- Table Mount Point -->
        <div id="center-arrivals-table-container"></div>
        <div id="arrivals-totals-container" class="mt-4"></div>
      </div>
    `;

    const renderArrivalsTotals = (list) => {
      const totalsContainer = document.getElementById('arrivals-totals-container');
      if (!totalsContainer) return;

      const count = list.length;
      const totalWeight = list.reduce((sum, r) => sum + (parseFloat(r.arrivalWeight || r.netCatchKg) || 0), 0);
      const totalCrates = list.reduce((sum, r) => sum + (parseInt(r.cratesIn) || 0), 0);
      const totalAmt = list.reduce((sum, r) => {
        const wt = parseFloat(r.arrivalWeight || r.netCatchKg) || 0;
        const rt = parseFloat(r.arrivalRate || r.ratePerKg) || 425;
        return sum + (r.totalAmt ? parseFloat(r.totalAmt) : (wt * rt));
      }, 0);
      const avgRate = totalWeight > 0 ? (totalAmt / totalWeight) : 0;

      totalsContainer.innerHTML = `
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <div class="flex items-center justify-between pb-2 mb-3 border-b border-[#EBECF0]">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-[#0284C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
              <h3 class="text-xs font-bold text-[#172B4D] uppercase tracking-wider">Arrivals Total Summary</h3>
            </div>
            <span class="text-xs text-[#5E6C84]">Showing totals for <strong class="text-[#172B4D]">${count}</strong> ${count === 1 ? 'Arrival' : 'Arrivals'}</span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-3">
            <div class="p-3 bg-[#FAFBFC] rounded-lg border border-[#EBECF0]">
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84] block mb-1">TOTAL ARRIVALS</span>
              <div class="flex items-baseline justify-between">
                <span class="text-base font-extrabold text-[#172B4D]">${count} Receipts</span>
                <span class="text-[10px] text-[#0284C7] font-semibold bg-[#F0F9FF] px-1.5 py-0.5 rounded">Verified</span>
              </div>
            </div>

            <div class="p-3 bg-[#FAFBFC] rounded-lg border border-[#EBECF0]">
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84] block mb-1">TOTAL ARRIVAL WEIGHT</span>
              <div class="flex items-baseline justify-between">
                <span class="text-base font-extrabold text-[#006644]">${totalWeight.toLocaleString()} KG</span>
                <span class="text-[10px] text-[#006644] font-semibold bg-[#E3FCEF] px-1.5 py-0.5 rounded">Net Catch</span>
              </div>
            </div>

            <div class="p-3 bg-[#FAFBFC] rounded-lg border border-[#EBECF0]">
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84] block mb-1">TOTAL CRATES</span>
              <div class="flex items-baseline justify-between">
                <span class="text-base font-extrabold text-[#172B4D]">${totalCrates.toLocaleString()} Crates</span>
                <span class="text-[10px] text-[#5E6C84] font-medium">Inward</span>
              </div>
            </div>

            <div class="p-3 bg-[#FAFBFC] rounded-lg border border-[#EBECF0]">
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84] block mb-1">TOTAL AMOUNT</span>
              <div class="flex items-baseline justify-between">
                <span class="text-base font-extrabold text-[#172B4D]">₹ ${Math.round(totalAmt).toLocaleString()}</span>
                <span class="text-[10px] text-[#006644] font-semibold bg-[#E3FCEF] px-1.5 py-0.5 rounded">Catch Val</span>
              </div>
            </div>

            <div class="p-3 bg-[#FAFBFC] rounded-lg border border-[#EBECF0]">
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84] block mb-1">AVERAGE RATE</span>
              <div class="flex items-baseline justify-between">
                <span class="text-base font-extrabold text-[#0284C7]">₹ ${avgRate.toFixed(2)} / KG</span>
                <span class="text-[10px] text-[#0284C7] font-semibold bg-[#F0F9FF] px-1.5 py-0.5 rounded">Benchmark</span>
              </div>
            </div>
          </div>
        </div>
      `;
    };

    const arrivalsTable = new DataTable({
      containerId: 'center-arrivals-table-container',
      data: ERP_DATA.arrivals,
      keyField: 'id',
      pageSize: 10,
      hideTopFilterBar: false,
      showCopy: false,
      tableTitle: 'Center Inward Catch Receipts & Dispatch Register (CRUD)',
      onDataChange: (data) => renderArrivalsTotals(data),
      columns: [
        { 
          field: 'sNo', 
          header: 'S.No', 
          render: (v, r, i) => `<span class="font-bold text-[#5E6C84]">${i !== undefined ? i + 1 : 1}</span>` 
        },
        { 
          field: 'arrivalCode', 
          header: 'Arrival Number', 
          render: (val, row) => `<span class="font-bold text-[#17191c] hover:underline font-bold cursor-pointer" onclick="window.__viewArrivalRecord('${row.id}')">${val || row.arrivalNumber}</span>` 
        },
        { 
          field: 'arrivalDate', 
          header: 'Arrival Date', 
          render: (val, row) => `<span class="font-medium text-[#172B4D]">${val || row.date}</span>` 
        },
        { 
          field: 'arrivalPlant', 
          header: 'Arrival Plant', 
          render: (val, row) => `<span class="font-semibold text-[#0284C7]">${val || row.plant || 'DFL UNIT-5 (JPT)'}</span>` 
        },
        { 
          field: 'purchaseType', 
          header: 'Purchase Type', 
          render: (val) => `<span class="font-medium text-[#172B4D] bg-[#F4F5F7] px-2 py-0.5 rounded text-[11px] border border-[#DFE1E6]">${val || 'Site Weightment'}</span>` 
        },
        { 
          field: 'supplier', 
          header: 'Supplier', 
          render: (val) => `<span class="font-semibold text-[#172B4D]">${val}</span>` 
        },
        { 
          field: 'graderName', 
          header: 'Grader', 
          render: (val) => `<span class="text-[#172B4D]">${val || 'B. Venkatesh'}</span>` 
        },
        { 
          field: 'agent', 
          header: 'Agent', 
          render: (val) => `<span class="text-[#5E6C84]">${val || 'Direct'}</span>` 
        },
        { 
          field: 'arrivalCount', 
          header: 'Arrival Count', 
          render: (val, row) => `<span class="font-bold text-[#17191c]">${val || row.countRange || '44 pcs/kg'}</span>` 
        },
        { 
          field: 'arrivalWeight', 
          header: 'Arrival Weight', 
          render: (val, row) => `<span class="font-extrabold text-[#006644]">${(typeof val === 'number' ? val : (row.netCatchKg || 0)).toLocaleString()} KG</span>` 
        },
        { 
          field: 'arrivalRate', 
          header: 'Arrival Rate', 
          render: (val, row) => `<span class="font-bold text-[#172B4D]">₹ ${val || row.ratePerKg || 425}</span>` 
        },
        { 
          field: 'totalAmt', 
          header: 'Total Amt', 
          render: (val, row) => {
            const wt = row.arrivalWeight || row.netCatchKg || 0;
            const rt = row.arrivalRate || row.ratePerKg || 425;
            const tot = row.totalAmt ? row.totalAmt : (wt * rt);
            return `<span class="font-extrabold text-[#172B4D]">₹ ${Math.round(tot).toLocaleString()}</span>`;
          } 
        }
      ],
      actions: [
        {
          label: 'Edit',
          icon: `<svg class="w-4 h-4 text-[#0284C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>`,
          onClick: (row) => PurchaseView.openEditArrivalRecordModal(row, arrivalsTable)
        },
        {
          label: 'Download',
          icon: `<svg class="w-4 h-4 text-[#00875A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>`,
          onClick: (row) => PurchaseView.downloadRecord(row)
        },
        {
          label: 'Delete',
          icon: `<svg class="w-4 h-4 text-[#FF5630]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>`,
          onClick: (row) => PurchaseView.deleteArrivalRecord(row, arrivalsTable)
        }
      ],
      onRowClick: (row) => PurchaseView.showArrivalRecordDetails(row)
    });

    this.arrivalRecordsTable = arrivalsTable;
    PurchaseView.arrivalRecordsTable = arrivalsTable;

    renderArrivalsTotals(ERP_DATA.arrivals);

    window.__viewArrivalRecord = (id) => {
      const item = ERP_DATA.arrivals.find(a => a.id === id);
      if (item) PurchaseView.showArrivalRecordDetails(item);
    };

    const createBtn = document.getElementById('btn-create-arrival-record');
    if (createBtn) {
      createBtn.addEventListener('click', () => PurchaseView.openCreateArrivalRecordModal(arrivalsTable));
    }
  },

  // =========================================================================
  // SUB MENU: TRANSACTIONS & BILLS -> TAB 1: SUPPLIER BILL SUMMARY
  // =========================================================================
  // SUB MENU: TRANSACTIONS & BILLS -> TAB 1: SUPPLIER BILL SUMMARY
  // =========================================================================
  renderSupplierBills(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <!-- Page Title Header -->
        <div class="mb-3">
          <h1 class="text-xl font-extrabold text-[#172B4D]">Supplier Bill Summary</h1>
        </div>

        <!-- Search / Filter Fields Card -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs mb-4 transition-all duration-200">
          <div class="flex items-center justify-between pb-1">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-[#0284C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
              <h3 class="text-xs font-bold text-[#172B4D]">Search &amp; Filters</h3>
            </div>

            <!-- Filter Controls: Reset & Toggle Open/Close -->
            <div class="flex items-center gap-2">
              <button type="button" id="bill-top-reset-btn" class="dt-top-filter-reset-btn text-xs font-semibold text-[#5E6C84] hover:text-[#172B4D] hover:bg-[#F4F5F7] px-2.5 py-1.5 rounded border border-[#DFE1E6] flex items-center gap-1.5 transition-colors cursor-pointer" title="Reset all filters">
                <svg class="w-3.5 h-3.5 text-[#6B778C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Reset</span>
              </button>

              <button type="button" id="bill-top-toggle-btn" class="dt-top-filter-toggle-btn text-xs font-semibold text-[#0284C7] bg-[#F0F9FF]/80 hover:bg-[#F0F9FF] px-2.5 py-1.5 rounded border border-[#BAE6FD] flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer" title="Hide Filter">
                <svg class="w-3.5 h-3.5 dt-top-filter-toggle-icon transform transition-transform duration-200" id="bill-top-toggle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                <span class="dt-top-filter-toggle-text" id="bill-top-toggle-text">Hide Filter</span>
              </button>
            </div>
          </div>

          <!-- Collapsible Filter Inputs Grid (Max 5 Columns) -->
          <div id="bill-top-filter-body" class="dt-top-filter-body mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-xs transition-all duration-200">
            <!-- 1. Select Purchase -->
            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">SELECT PURCHASE</label>
              <select id="bill-top-purchase-select" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                <option value="ALL">All Purchases</option>
                <option value="Direct Farmer Procurement">Direct Farmer Procurement</option>
                <option value="Hatchery Buyback Contract">Hatchery Buyback Contract</option>
                <option value="Agent Procurement Order">Agent Procurement Order</option>
                <option value="Corporate Feed-Linked Booking">Corporate Feed-Linked Booking</option>
                <option value="Spot Market Purchase">Spot Market Purchase</option>
              </select>
            </div>

            <!-- 2. Select Arrival Plant -->
            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">SELECT ARRIVAL PLANT</label>
              <select id="bill-top-plant-select" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                <option value="ALL">All Arrival Plants</option>
                <option value="DFL UNIT-1 (VSP)">DFL UNIT-1 (VSP)</option>
                <option value="DFL UNIT-2 (KKD)">DFL UNIT-2 (KKD)</option>
                <option value="DFL UNIT-3 (PSP)">DFL UNIT-3 (PSP)</option>
                <option value="DFL UNIT-4 (PND)">DFL UNIT-4 (PND)</option>
                <option value="DFL UNIT-5 (JPT)">DFL UNIT-5 (JPT)</option>
                <option value="DFL UNIT-6 (JPT-II)">DFL UNIT-6 (JPT-II)</option>
              </select>
            </div>

            <!-- 3. From Date -->
            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">FROM DATE</label>
              <div class="erp-date-wrapper">
                <input type="date" id="bill-top-from-date" value="2026-10-07" class="erp-date-input w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" onclick="this.showPicker ? this.showPicker() : this.focus()">
              </div>
            </div>

            <!-- 4. To Date -->
            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">TO DATE</label>
              <div class="erp-date-wrapper">
                <input type="date" id="bill-top-to-date" value="2026-10-07" class="erp-date-input w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" onclick="this.showPicker ? this.showPicker() : this.focus()">
              </div>
            </div>

            <!-- 5. Select Supplier -->
            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">SELECT SUPPLIER</label>
              <select id="bill-top-supplier-select" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                <option value="ALL">All Suppliers</option>
                <option value="Godavari Coastal Aqua Farms">Godavari Coastal Aqua Farms</option>
                <option value="Sagar Marine Hatcheries & Cultivators">Sagar Marine Hatcheries</option>
                <option value="Krishna Delta Prawn Harvesters">Krishna Delta Prawn Harvesters</option>
                <option value="Konaseema Marine Harvesters Syndicate">Konaseema Marine Harvesters</option>
                <option value="Nellore Brackish Aqua Cultivators">Nellore Brackish Aqua Cultivators</option>
                <option value="Sri Sai Aqua Farms & Seedlings">Sri Sai Aqua Farms</option>
                <option value="East Coast Aqua Society">East Coast Aqua Society</option>
                <option value="Coastal Andhra Aquatics">Coastal Andhra Aquatics</option>
              </select>
            </div>

            <!-- 6. Select Agent -->
            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">SELECT AGENT</label>
              <select id="bill-top-agent-select" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                <option value="ALL">All Agents</option>
                <option value="Coastal Marine Agency">Coastal Marine Agency</option>
                <option value="Sagar Marine Brokers">Sagar Marine Brokers</option>
                <option value="Direct Farmer">Direct Farmer</option>
                <option value="Delta Seafood Associates">Delta Seafood Associates</option>
                <option value="Nellore Aqua Syndicate">Nellore Aqua Syndicate</option>
                <option value="East Coast Brokers">East Coast Brokers</option>
              </select>
            </div>

            <!-- 7. Status -->
            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">STATUS</label>
              <select id="bill-top-status-select" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                <option value="Pending" selected>Pending</option>
                <option value="ALL">All Status</option>
                <option value="Approved">Approved</option>
                <option value="Paid">Paid</option>
                <option value="Partially Paid">Partially Paid</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>

            <!-- 8. Search Action Button -->
            <div class="flex items-end">
              <button type="button" id="bill-top-search-btn" class="btn-primary px-5 py-1.5 rounded text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer h-[31px]" title="Apply Filters">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Table Container -->
        <div id="supplier-bills-table-container"></div>
      </div>
    `;

    // Helper: Determine Status Lozenge Styling
    const getStatusLozenge = (status) => {
      const s = String(status || '').toLowerCase();
      if (s.includes('paid') && !s.includes('partially')) {
        return `<span class="inline-flex items-center justify-center w-full px-2 py-0.5 rounded text-[11px] font-bold bg-[#E3FCEF] text-[#006644] border border-[#ABF5D1]">Paid</span>`;
      }
      if (s.includes('approved')) {
        return `<span class="inline-flex items-center justify-center w-full px-2 py-0.5 rounded text-[11px] font-bold bg-[#F0F9FF] text-[#0284C7] border border-[#BAE6FD]">Approved</span>`;
      }
      if (s.includes('overdue')) {
        return `<span class="inline-flex items-center justify-center w-full px-2 py-0.5 rounded text-[11px] font-bold bg-[#FFEBE6] text-[#BF2600] border border-[#FFBDAD]">Overdue</span>`;
      }
      if (s.includes('partially')) {
        return `<span class="inline-flex items-center justify-center w-full px-2 py-0.5 rounded text-[11px] font-bold bg-[#FFF0B3] text-[#8F4D00] border border-[#FFE380]">Partially Paid</span>`;
      }
      return `<span class="inline-flex items-center justify-center w-full px-2 py-0.5 rounded text-[11px] font-bold bg-[#FFF0B3] text-[#8F4D00] border border-[#FFE380]">Pending</span>`;
    };

    // Initial Filter: Status is 'Pending' by default as requested
    const initialData = ERP_DATA.supplierBills.filter(b => String(b.status).toLowerCase() === 'pending');

    // Initialize DataTable with exact user requested columns
    const billsTable = new DataTable({
      containerId: 'supplier-bills-table-container',
      data: initialData.length > 0 ? initialData : ERP_DATA.supplierBills,
      keyField: 'billNo',
      tableTitle: 'Supplier Bills List',
      showCopy: false,
      columns: [
        { 
          field: 'sNo', 
          header: 'S.No',
          render: (v, row, idx) => `<span class="font-medium text-[#5E6C84]">${v || (idx + 1)}</span>`
        },
        { 
          field: 'arrivalNumber', 
          header: 'Arrival Number', 
          render: (v, row) => `
            <div>
              <span class="font-bold text-[#17191c] hover:underline font-bold cursor-pointer" title="Click to view details">${v || row.billNo}</span>
              <span class="text-[10px] text-[#5E6C84] block">${row.billNo}</span>
            </div>
          ` 
        },
        { 
          field: 'arrivalDate', 
          header: 'Arrival Date', 
          render: (v, row) => `<span class="text-[#172B4D]">${v || row.billDate || '07/10/2026'}</span>` 
        },
        { 
          field: 'supplier', 
          header: 'Supplier',
          render: (v, row) => `<span class="font-medium text-[#172B4D]">${v || row.supplierName}</span>`
        },
        { 
          field: 'agent', 
          header: 'Agent',
          render: (v) => `<span class="text-[#5E6C84]">${v || 'Direct Farmer'}</span>`
        },
        { 
          field: 'arrivalCount', 
          header: 'Arrival Count',
          render: (v, row) => `<span class="text-[#172B4D] font-medium">${v || row.count || '40 Count'}</span>`
        },
        { 
          field: 'arrivalWeight', 
          header: 'Arrival Weight', 
          render: (v, row) => {
            const wt = v || row.weightKg || 0;
            return `<span class="font-bold text-[#172B4D]">${wt.toLocaleString()} KG</span>`;
          }
        },
        { 
          field: 'totalBillAmount', 
          header: 'Total Bill Amount', 
          render: (v, row) => {
            const amt = v || row.totalAmountInr || 0;
            const usd = row.totalAmountUsd ? `($ ${row.totalAmountUsd.toLocaleString()})` : '';
            return `
              <div>
                <span class="font-bold text-[#172B4D]">₹ ${amt.toLocaleString()}</span>
                <span class="text-[10px] text-[#5E6C84] block font-normal">${usd}</span>
              </div>
            `;
          }
        },
        { 
          field: 'status', 
          header: 'Status', 
          render: (v) => getStatusLozenge(v)
        }
      ],
      actions: [
        {
          label: 'Add',
          icon: `<svg class="w-4 h-4 text-[#006644]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>`,
          onClick: (row) => PurchaseView.openAddBillDetailsModal(row, billsTable)
        }
      ],
      onRowClick: (row) => PurchaseView.showBillDetails(row)
    });

    this.billsTable = billsTable;
    PurchaseView.billsTable = billsTable;

    // Apply Filter Search Button Logic
    const applyFilter = () => {
      const purchaseVal = document.getElementById('bill-top-purchase-select')?.value || 'ALL';
      const plantVal = document.getElementById('bill-top-plant-select')?.value || 'ALL';
      const fromDateVal = document.getElementById('bill-top-from-date')?.value || '';
      const toDateVal = document.getElementById('bill-top-to-date')?.value || '';
      const supplierVal = document.getElementById('bill-top-supplier-select')?.value || 'ALL';
      const agentVal = document.getElementById('bill-top-agent-select')?.value || 'ALL';
      const statusVal = document.getElementById('bill-top-status-select')?.value || 'ALL';

      let filtered = [...ERP_DATA.supplierBills];

      // 1. Filter Purchase Type
      if (purchaseVal !== 'ALL') {
        filtered = filtered.filter(b => (b.purchase || '').toLowerCase() === purchaseVal.toLowerCase());
      }

      // 2. Filter Plant
      if (plantVal !== 'ALL') {
        filtered = filtered.filter(b => (b.plant || '').toLowerCase() === plantVal.toLowerCase());
      }

      // 3. Filter Supplier
      if (supplierVal !== 'ALL') {
        filtered = filtered.filter(b => (b.supplier || b.supplierName || '').toLowerCase().includes(supplierVal.toLowerCase()));
      }

      // 4. Filter Agent
      if (agentVal !== 'ALL') {
        filtered = filtered.filter(b => (b.agent || '').toLowerCase().includes(agentVal.toLowerCase()));
      }

      // 5. Filter Status
      if (statusVal !== 'ALL') {
        filtered = filtered.filter(b => String(b.status || '').toLowerCase() === statusVal.toLowerCase());
      }

      // 6. Filter Date Range
      if (fromDateVal && toDateVal) {
        filtered = filtered.filter(b => {
          const itemDate = b.rawDate || '';
          if (!itemDate) return true;
          return itemDate >= fromDateVal && itemDate <= toDateVal;
        });
      } else if (fromDateVal) {
        filtered = filtered.filter(b => {
          const itemDate = b.rawDate || '';
          return !itemDate || itemDate >= fromDateVal;
        });
      } else if (toDateVal) {
        filtered = filtered.filter(b => {
          const itemDate = b.rawDate || '';
          return !itemDate || itemDate <= toDateVal;
        });
      }

      billsTable.setData(filtered);
      Toast.show(`Filtered records: ${filtered.length} supplier ${filtered.length === 1 ? 'bill' : 'bills'} found.`, 'info');
    };

    // Search button click
    const searchBtn = document.getElementById('bill-top-search-btn');
    if (searchBtn) {
      searchBtn.addEventListener('click', applyFilter);
    }

    // Reset button click
    const resetBtn = document.getElementById('bill-top-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        const pSel = document.getElementById('bill-top-purchase-select');
        const plSel = document.getElementById('bill-top-plant-select');
        const fdInput = document.getElementById('bill-top-from-date');
        const tdInput = document.getElementById('bill-top-to-date');
        const sSel = document.getElementById('bill-top-supplier-select');
        const aSel = document.getElementById('bill-top-agent-select');
        const stSel = document.getElementById('bill-top-status-select');

        if (pSel) pSel.value = 'ALL';
        if (plSel) plSel.value = 'ALL';
        if (fdInput) fdInput.value = '2026-10-07';
        if (tdInput) tdInput.value = '2026-10-07';
        if (sSel) sSel.value = 'ALL';
        if (aSel) aSel.value = 'ALL';
        if (stSel) stSel.value = 'ALL';

        billsTable.setData(ERP_DATA.supplierBills);
        Toast.show('Filters reset. Displaying all supplier bills.', 'info');
      });
    }

    // Toggle Filter open/close
    const toggleBtn = document.getElementById('bill-top-toggle-btn');
    const filterBody = document.getElementById('bill-top-filter-body');
    const toggleIcon = document.getElementById('bill-top-toggle-icon');
    const toggleText = document.getElementById('bill-top-toggle-text');
    let isCollapsed = false;

    if (toggleBtn && filterBody) {
      toggleBtn.addEventListener('click', () => {
        isCollapsed = !isCollapsed;
        const h = filterBody.previousElementSibling;
        if (isCollapsed) {
          filterBody.classList.add('hidden');
          if (h) { h.classList.remove('pb-1'); h.classList.add('pb-0'); }
          if (toggleText) toggleText.innerText = 'Show Filter';
          toggleBtn.title = 'Show Filter';
          if (toggleIcon) toggleIcon.classList.add('-rotate-90');
          toggleBtn.classList.remove('bg-[#F0F9FF]/80', 'text-[#0284C7]', 'border-[#BAE6FD]');
          toggleBtn.classList.add('bg-[#FAFBFC]', 'text-[#5E6C84]', 'border-[#DFE1E6]');
        } else {
          filterBody.classList.remove('hidden');
          if (h) { h.classList.add('pb-1'); h.classList.remove('pb-0'); }
          if (toggleText) toggleText.innerText = 'Hide Filter';
          toggleBtn.title = 'Hide Filter';
          if (toggleIcon) toggleIcon.classList.remove('-rotate-90');
          toggleBtn.classList.add('bg-[#F0F9FF]/80', 'text-[#0284C7]', 'border-[#BAE6FD]');
          toggleBtn.classList.remove('bg-[#FAFBFC]', 'text-[#5E6C84]', 'border-[#DFE1E6]');
        }
      });
    }
  },

  // =========================================================================
  // SUB MENU: TRANSACTIONS & BILLS -> TAB 2: COMMERCIAL TRANSACTIONS
  // =========================================================================
  renderCommercialTransactions(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <!-- Page Title Header -->
        <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div>
            <h1 class="text-xl font-extrabold text-[#172B4D]">Commercial Transactions</h1>
          </div>
          <div class="flex items-center gap-2">
            <button id="btn-add-commercial-txn" class="btn-primary px-3 py-1.5 rounded text-xs flex items-center gap-1.5 shadow-xs cursor-pointer">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>Add Transaction</span>
            </button>
          </div>
        </div>

        <!-- Search / Filter Fields Card (5 Fields) -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs mb-4 transition-all duration-200">
          <div class="flex items-center justify-between pb-1">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-[#0284C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
              <h3 class="text-xs font-bold text-[#172B4D]">Search &amp; Filters</h3>
            </div>

            <!-- Filter Controls: Reset & Toggle Open/Close -->
            <div class="flex items-center gap-2">
              <button type="button" id="ctx-top-reset-btn" class="dt-top-filter-reset-btn text-xs font-semibold text-[#5E6C84] hover:text-[#172B4D] hover:bg-[#F4F5F7] px-2.5 py-1.5 rounded border border-[#DFE1E6] flex items-center gap-1.5 transition-colors cursor-pointer" title="Reset all filters">
                <svg class="w-3.5 h-3.5 text-[#6B778C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Reset</span>
              </button>

              <button type="button" id="ctx-top-toggle-btn" class="dt-top-filter-toggle-btn text-xs font-semibold text-[#0284C7] bg-[#F0F9FF]/80 hover:bg-[#F0F9FF] px-3 py-1.5 rounded border border-[#BAE6FD] flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer">
                <svg class="w-3.5 h-3.5 dt-top-filter-toggle-icon transform transition-transform duration-200" id="ctx-top-toggle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                <span class="dt-top-filter-toggle-text" id="ctx-top-toggle-text">Hide Filter</span>
              </button>
            </div>
          </div>

          <!-- Collapsible Filter Inputs Grid (Max 5 Columns) -->
          <div id="ctx-top-filter-body" class="dt-top-filter-body mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-xs transition-all duration-200">
            <!-- 1. Select Center -->
            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">SELECT CENTER</label>
              <select id="ctx-top-center-select" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                <option value="ALL">All Centers</option>
                <option value="Bhimavaram Center #1">Bhimavaram Center #1</option>
                <option value="Kakinada Sea Intake #2">Kakinada Sea Intake #2</option>
                <option value="Amalapuram Harvesters #4">Amalapuram Harvesters #4</option>
                <option value="Machilipatnam Delta #3">Machilipatnam Delta #3</option>
                <option value="Ongole Coastal Hub #1">Ongole Coastal Hub #1</option>
                <option value="Visakhapatnam Gate Dock">Visakhapatnam Gate Dock</option>
              </select>
            </div>

            <!-- 2. Select Type -->
            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">SELECT TYPE</label>
              <select id="ctx-top-type-select" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                <option value="ALL">All Types</option>
                <option value="PURCHASE_PAYABLE">Purchase Payable</option>
                <option value="ADVANCE_PAID">Advance Paid</option>
                <option value="LOGISTICS_FEE">Logistics Fee</option>
                <option value="COMMISSION_FEE">Commission Fee</option>
                <option value="ADJUSTMENT_CREDIT">Adjustment Credit</option>
                <option value="TDS_PAYABLE">TDS Payable</option>
              </select>
            </div>

            <!-- 3. Select Supplier -->
            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">SELECT SUPPLIER</label>
              <select id="ctx-top-supplier-select" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                <option value="ALL">All Suppliers</option>
                <option value="Sri Sai Aqua Farms">Sri Sai Aqua Farms</option>
                <option value="Krishna Delta Prawn Harvesters">Krishna Delta Prawn Harvesters</option>
                <option value="Konaseema Marine Harvesters">Konaseema Marine Harvesters</option>
                <option value="Nellore Brackish Aqua Cultivators">Nellore Brackish Aqua Cultivators</option>
                <option value="Godavari Coastal Aqua Farms">Godavari Coastal Aqua Farms</option>
                <option value="Sagar Marine Hatcheries">Sagar Marine Hatcheries</option>
                <option value="East Coast Aqua Society">East Coast Aqua Society</option>
                <option value="Coastal Andhra Aquatics">Coastal Andhra Aquatics</option>
              </select>
            </div>

            <!-- 4. Select Agent -->
            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">SELECT AGENT</label>
              <select id="ctx-top-agent-select" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                <option value="ALL">All Agents</option>
                <option value="Direct Farmer">Direct Farmer</option>
                <option value="Coastal Marine Agency">Coastal Marine Agency</option>
                <option value="Sagar Marine Brokers">Sagar Marine Brokers</option>
                <option value="Delta Seafood Associates">Delta Seafood Associates</option>
                <option value="Nellore Aqua Syndicate">Nellore Aqua Syndicate</option>
                <option value="East Coast Brokers">East Coast Brokers</option>
              </select>
            </div>

            <!-- 5. Date -->
            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">DATE</label>
              <div class="erp-date-wrapper w-full">
                <input type="date" id="ctx-top-date" class="erp-date-input w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" onclick="this.showPicker ? this.showPicker() : this.focus()">
              </div>
            </div>

            <!-- 6. Search Action Button (Second Row) -->
            <div class="flex items-end">
              <button type="button" id="ctx-top-search-btn" class="btn-primary px-5 py-1.5 rounded text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer h-[31px]" title="Apply Filters">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Table Container -->
        <div id="commercial-txns-table-container"></div>
      </div>
    `;

    // Type Badge Helper
    const getTypeBadge = (type) => {
      const t = String(type || '').toUpperCase();
      let colorClass = 'bg-[#F0F9FF] text-[#0284C7] border-[#BAE6FD]';
      if (t.includes('ADVANCE')) {
        colorClass = 'bg-[#FFF0B3] text-[#8F4D00] border-[#FFE380]';
      } else if (t.includes('LOGISTICS')) {
        colorClass = 'bg-[#EAE6FF] text-[#403294] border-[#D3CAFF]';
      } else if (t.includes('COMMISSION')) {
        colorClass = 'bg-[#E6FCFF] text-[#008DA6] border-[#B6F0FF]';
      } else if (t.includes('ADJUSTMENT')) {
        colorClass = 'bg-[#E3FCEF] text-[#006644] border-[#ABF5D1]';
      } else if (t.includes('TDS')) {
        colorClass = 'bg-[#FFEBE6] text-[#BF2600] border-[#FFBDAD]';
      }
      return `<span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border ${colorClass}">${t.replace(/_/g, ' ')}</span>`;
    };

    // Status Badge Helper
    const getLedgerStatusBadge = (status) => {
      const s = String(status || '').toUpperCase();
      if (s === 'CLEARED' || s === 'SETTLED') {
        return `<span class="inline-flex items-center justify-center w-full px-2 py-0.5 rounded text-[11px] font-bold bg-[#E3FCEF] text-[#006644] border border-[#ABF5D1]">${s}</span>`;
      }
      if (s === 'POSTED') {
        return `<span class="inline-flex items-center justify-center w-full px-2 py-0.5 rounded text-[11px] font-bold bg-[#F0F9FF] text-[#0284C7] border border-[#BAE6FD]">POSTED</span>`;
      }
      return `<span class="inline-flex items-center justify-center w-full px-2 py-0.5 rounded text-[11px] font-bold bg-[#FFF0B3] text-[#8F4D00] border border-[#FFE380]">${s || 'PENDING'}</span>`;
    };

    const txnsTable = new DataTable({
      containerId: 'commercial-txns-table-container',
      data: this.commercialTxns,
      keyField: 'txnId',
      tableTitle: 'Commercial Transactions List',
      showCopy: false,
      columns: [
        { 
          field: 'sNo', 
          header: 'S.No',
          render: (v, row, idx) => `<span class="font-medium text-[#5E6C84]">${v || (idx + 1)}</span>`
        },
        { 
          field: 'txnId', 
          header: 'Txn Ref', 
          render: (v) => `<span class="font-bold text-[#17191c] hover:underline font-bold cursor-pointer" title="Click to view details">${v}</span>` 
        },
        { 
          field: 'date', 
          header: 'Date',
          render: (v, row) => `<span class="text-[#172B4D]">${v || row.rawDate}</span>` 
        },
        { 
          field: 'center', 
          header: 'Center',
          render: (v) => `<span class="text-[#172B4D] font-medium">${v || '-'}</span>`
        },
        { 
          field: 'supplier', 
          header: 'Party / Supplier',
          render: (v) => `<span class="font-medium text-[#172B4D]">${v}</span>`
        },
        { 
          field: 'agent', 
          header: 'Agent',
          render: (v) => `<span class="text-[#5E6C84]">${v || 'Direct Farmer'}</span>`
        },
        { 
          field: 'description', 
          header: 'Description',
          render: (v) => `<span class="text-[#5E6C84] truncate max-w-xs block" title="${v}">${v}</span>`
        },
        { 
          field: 'amountInr', 
          header: 'Amount (INR)', 
          render: (v) => `<span class="font-bold text-[#172B4D]">₹ ${(parseFloat(v) || 0).toLocaleString()}</span>` 
        },
        { 
          field: 'amountUsd', 
          header: 'Amount (USD)', 
          render: (v) => `<span class="text-[#006644] font-bold">$ ${(parseFloat(v) || 0).toLocaleString()}</span>` 
        },
        { 
          field: 'type', 
          header: 'Type',
          render: (v) => getTypeBadge(v)
        },
        { 
          field: 'status', 
          header: 'Ledger Status',
          render: (v) => getLedgerStatusBadge(v)
        }
      ],
      actions: [
        {
          label: 'Edit',
          icon: `<svg class="w-4 h-4 text-[#FFAB00]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>`,
          onClick: (row) => PurchaseView.openEditTransactionModal(row, txnsTable)
        },
        {
          label: 'Download',
          icon: `<svg class="w-4 h-4 text-[#00875A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>`,
          onClick: (row) => PurchaseView.downloadRecord(row)
        },
        {
          label: 'Delete',
          icon: `<svg class="w-4 h-4 text-[#FF5630]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>`,
          onClick: (row) => PurchaseView.deleteTransaction(row, txnsTable)
        }
      ],
      onRowClick: (row) => PurchaseView.showTransactionDetails(row)
    });

    this.commercialTxnsTable = txnsTable;
    PurchaseView.commercialTxnsTable = txnsTable;

    // Apply Filter Search Logic
    const applyFilter = () => {
      const centerVal = document.getElementById('ctx-top-center-select')?.value || 'ALL';
      const typeVal = document.getElementById('ctx-top-type-select')?.value || 'ALL';
      const supplierVal = document.getElementById('ctx-top-supplier-select')?.value || 'ALL';
      const agentVal = document.getElementById('ctx-top-agent-select')?.value || 'ALL';
      const dateVal = document.getElementById('ctx-top-date')?.value || '';

      let filtered = [...this.commercialTxns];

      if (centerVal !== 'ALL') {
        filtered = filtered.filter(t => (t.center || '').toLowerCase().includes(centerVal.toLowerCase()));
      }
      if (typeVal !== 'ALL') {
        filtered = filtered.filter(t => (t.type || '').toUpperCase() === typeVal.toUpperCase());
      }
      if (supplierVal !== 'ALL') {
        filtered = filtered.filter(t => (t.supplier || '').toLowerCase().includes(supplierVal.toLowerCase()));
      }
      if (agentVal !== 'ALL') {
        filtered = filtered.filter(t => (t.agent || '').toLowerCase().includes(agentVal.toLowerCase()));
      }
      if (dateVal) {
        filtered = filtered.filter(t => {
          const itemDate = t.rawDate || '';
          return itemDate === dateVal || itemDate.includes(dateVal);
        });
      }

      txnsTable.setData(filtered);
      Toast.show(`Filtered records: ${filtered.length} commercial ${filtered.length === 1 ? 'transaction' : 'transactions'} found.`, 'info');
    };

    // Search button click
    const searchBtn = document.getElementById('ctx-top-search-btn');
    if (searchBtn) {
      searchBtn.addEventListener('click', applyFilter);
    }

    // Reset button click
    const resetBtn = document.getElementById('ctx-top-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        const cSel = document.getElementById('ctx-top-center-select');
        const tSel = document.getElementById('ctx-top-type-select');
        const sSel = document.getElementById('ctx-top-supplier-select');
        const aSel = document.getElementById('ctx-top-agent-select');
        const dInput = document.getElementById('ctx-top-date');

        if (cSel) cSel.value = 'ALL';
        if (tSel) tSel.value = 'ALL';
        if (sSel) sSel.value = 'ALL';
        if (aSel) aSel.value = 'ALL';
        if (dInput) dInput.value = '';

        txnsTable.setData(this.commercialTxns);
        Toast.show('Filters reset. Displaying all commercial transactions.', 'info');
      });
    }

    // Toggle Filter open/close
    const toggleBtn = document.getElementById('ctx-top-toggle-btn');
    const filterBody = document.getElementById('ctx-top-filter-body');
    const toggleIcon = document.getElementById('ctx-top-toggle-icon');
    const toggleText = document.getElementById('ctx-top-toggle-text');
    let isCollapsed = false;

    if (toggleBtn && filterBody) {
      toggleBtn.addEventListener('click', () => {
        isCollapsed = !isCollapsed;
        const h = filterBody.previousElementSibling;
        if (isCollapsed) {
          filterBody.classList.add('hidden');
          if (h) { h.classList.remove('pb-1'); h.classList.add('pb-0'); }
          if (toggleText) toggleText.innerText = 'Show Filter';
          if (toggleIcon) toggleIcon.classList.add('-rotate-90');
          toggleBtn.classList.remove('bg-[#F0F9FF]/80', 'text-[#0284C7]', 'border-[#BAE6FD]');
          toggleBtn.classList.add('bg-[#FAFBFC]', 'text-[#5E6C84]', 'border-[#DFE1E6]');
        } else {
          filterBody.classList.remove('hidden');
          if (h) { h.classList.add('pb-1'); h.classList.remove('pb-0'); }
          if (toggleText) toggleText.innerText = 'Hide Filter';
          if (toggleIcon) toggleIcon.classList.remove('-rotate-90');
          toggleBtn.classList.add('bg-[#F0F9FF]/80', 'text-[#0284C7]', 'border-[#BAE6FD]');
          toggleBtn.classList.remove('bg-[#FAFBFC]', 'text-[#5E6C84]', 'border-[#DFE1E6]');
        }
      });
    }

    // Add Commercial Transaction Button Click
    const addTxnBtn = document.getElementById('btn-add-commercial-txn');
    if (addTxnBtn) {
      addTxnBtn.addEventListener('click', () => {
        PurchaseView.openAddTransactionModal(txnsTable);
      });
    }
  },

  // =========================================================================
  // SUB MENU: PAYMENTS -> TAB 1: PAYMENT SUMMARY
  // =========================================================================
  renderPaymentSummary(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <!-- Page Title Header -->
        <div class="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div>
            <h1 class="text-xl font-extrabold text-[#172B4D]">Payments</h1>
          </div>
        </div>

        <!-- Search / Filter Fields Card (8 Fields, Max 5 Columns) -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs mb-4 transition-all duration-200">
          <div class="flex items-center justify-between pb-1">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-[#0284C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
              <h3 class="text-xs font-bold text-[#172B4D]">Search &amp; Filters</h3>
            </div>

            <!-- Filter Controls: Reset & Toggle Open/Close -->
            <div class="flex items-center gap-2">
              <button type="button" id="pay-top-reset-btn" class="dt-top-filter-reset-btn text-xs font-semibold text-[#5E6C84] hover:text-[#172B4D] hover:bg-[#F4F5F7] px-2.5 py-1.5 rounded border border-[#DFE1E6] flex items-center gap-1.5 transition-colors cursor-pointer" title="Reset all filters">
                <svg class="w-3.5 h-3.5 text-[#6B778C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Reset</span>
              </button>

              <button type="button" id="pay-top-toggle-btn" class="dt-top-filter-toggle-btn text-xs font-semibold text-[#0284C7] bg-[#F0F9FF]/80 hover:bg-[#F0F9FF] px-3 py-1.5 rounded border border-[#BAE6FD] flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer">
                <svg class="w-3.5 h-3.5 dt-top-filter-toggle-icon transform transition-transform duration-200" id="pay-top-toggle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                <span class="dt-top-filter-toggle-text" id="pay-top-toggle-text">Hide Filter</span>
              </button>
            </div>
          </div>

          <!-- Collapsible Filter Inputs Grid (Max 5 Columns) -->
          <div id="pay-top-filter-body" class="dt-top-filter-body mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-xs transition-all duration-200">
            <!-- 1. Select Center -->
            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">SELECT CENTER</label>
              <select id="pay-top-center-select" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                <option value="ALL">All Centers</option>
                <option value="Bhimavaram Center #1">Bhimavaram Center #1</option>
                <option value="Kakinada Sea Intake #2">Kakinada Sea Intake #2</option>
                <option value="Amalapuram Harvesters #4">Amalapuram Harvesters #4</option>
                <option value="Machilipatnam Delta #3">Machilipatnam Delta #3</option>
                <option value="Ongole Coastal Hub #1">Ongole Coastal Hub #1</option>
                <option value="Visakhapatnam Gate Dock">Visakhapatnam Gate Dock</option>
              </select>
            </div>

            <!-- 2. Select Type -->
            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">SELECT TYPE</label>
              <select id="pay-top-type-select" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                <option value="ALL">All Types</option>
                <option value="PURCHASE_PAYABLE">Purchase Payable</option>
                <option value="ADVANCE_PAID">Advance Paid</option>
                <option value="LOGISTICS_FEE">Logistics Fee</option>
                <option value="COMMISSION_FEE">Commission Fee</option>
                <option value="TDS_PAYABLE">TDS Payable</option>
              </select>
            </div>

            <!-- 3. Select Supplier -->
            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">SELECT SUPPLIER</label>
              <select id="pay-top-supplier-select" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                <option value="ALL">All Suppliers</option>
                <option value="Sri Sai Aqua Farms">Sri Sai Aqua Farms</option>
                <option value="Krishna Delta Prawn Harvesters">Krishna Delta Prawn Harvesters</option>
                <option value="Konaseema Marine Harvesters">Konaseema Marine Harvesters</option>
                <option value="Nellore Brackish Aqua Cultivators">Nellore Brackish Aqua Cultivators</option>
                <option value="Godavari Coastal Aqua Farms">Godavari Coastal Aqua Farms</option>
                <option value="Sagar Marine Hatcheries">Sagar Marine Hatcheries</option>
                <option value="East Coast Aqua Society">East Coast Aqua Society</option>
                <option value="Coastal Andhra Aquatics">Coastal Andhra Aquatics</option>
              </select>
            </div>

            <!-- 4. Select Agent -->
            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">SELECT AGENT</label>
              <select id="pay-top-agent-select" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                <option value="ALL">All Agents</option>
                <option value="Direct Farmer">Direct Farmer</option>
                <option value="Coastal Marine Agency">Coastal Marine Agency</option>
                <option value="Sagar Marine Brokers">Sagar Marine Brokers</option>
                <option value="Delta Seafood Associates">Delta Seafood Associates</option>
                <option value="Nellore Aqua Syndicate">Nellore Aqua Syndicate</option>
                <option value="East Coast Brokers">East Coast Brokers</option>
              </select>
            </div>

            <!-- 5. Select Arrival Plant -->
            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">SELECT ARRIVAL PLANT</label>
              <select id="pay-top-plant-select" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                <option value="ALL">All Arrival Plants</option>
                <option value="DFL UNIT-1 (VSP)">DFL UNIT-1 (VSP)</option>
                <option value="DFL UNIT-2 (KKD)">DFL UNIT-2 (KKD)</option>
                <option value="DFL UNIT-3 (PSP)">DFL UNIT-3 (PSP)</option>
                <option value="DFL UNIT-4 (PND)">DFL UNIT-4 (PND)</option>
                <option value="DFL UNIT-5 (JPT)">DFL UNIT-5 (JPT)</option>
                <option value="DFL UNIT-6 (JPT-II)">DFL UNIT-6 (JPT-II)</option>
              </select>
            </div>

            <!-- 6. Select Payment Mode -->
            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">SELECT PAYMENT MODE</label>
              <select id="pay-top-mode-select" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                <option value="ALL">All Payment Modes</option>
                <option value="RTGS">RTGS / Bank Wire</option>
                <option value="NEFT">NEFT</option>
                <option value="Direct Bank Transfer">Direct Bank Transfer</option>
                <option value="Cheque">Cheque Disbursement</option>
              </select>
            </div>

            <!-- 7. From Date -->
            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">FROM DATE</label>
              <div class="erp-date-wrapper w-full">
                <input type="date" id="pay-top-from-date" value="2026-10-01" class="erp-date-input w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" onclick="this.showPicker ? this.showPicker() : this.focus()">
              </div>
            </div>

            <!-- 8. To Date -->
            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">TO DATE</label>
              <div class="erp-date-wrapper w-full">
                <input type="date" id="pay-top-to-date" value="2026-10-07" class="erp-date-input w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" onclick="this.showPicker ? this.showPicker() : this.focus()">
              </div>
            </div>

            <!-- 9. Search Action Button (Second Row) -->
            <div class="flex items-end">
              <button type="button" id="pay-top-search-btn" class="btn-primary px-5 py-1.5 rounded text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer h-[31px]" title="Apply Filters">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Table Container -->
        <div id="payment-summary-table-container"></div>
      </div>
    `;

    // Status Badge Helper
    const getPaymentStatusBadge = (status) => {
      const s = String(status || '').toUpperCase();
      if (s === 'COMPLETED') {
        return `<span class="inline-flex items-center justify-center w-full px-2 py-0.5 rounded text-[11px] font-bold bg-[#E3FCEF] text-[#006644] border border-[#ABF5D1]">COMPLETED</span>`;
      }
      if (s === 'PROCESSING') {
        return `<span class="inline-flex items-center justify-center w-full px-2 py-0.5 rounded text-[11px] font-bold bg-[#F0F9FF] text-[#0284C7] border border-[#BAE6FD]">PROCESSING</span>`;
      }
      if (s === 'HELD') {
        return `<span class="inline-flex items-center justify-center w-full px-2 py-0.5 rounded text-[11px] font-bold bg-[#FFEBE6] text-[#BF2600] border border-[#FFBDAD]">HELD</span>`;
      }
      return `<span class="inline-flex items-center justify-center w-full px-2 py-0.5 rounded text-[11px] font-bold bg-[#FFF0B3] text-[#8F4D00] border border-[#FFE380]">PENDING</span>`;
    };

    const paymentsTable = new DataTable({
      containerId: 'payment-summary-table-container',
      data: this.paymentsList,
      keyField: 'voucherNo',
      tableTitle: 'Payments List',
      showCopy: false,
      columns: [
        { 
          field: 'sNo', 
          header: 'S.No',
          render: (v, row, idx) => `<span class="font-medium text-[#5E6C84]">${v || (idx + 1)}</span>`
        },
        { 
          field: 'voucherNo', 
          header: 'Voucher No', 
          render: (v) => `<span class="font-bold text-[#17191c] hover:underline font-bold cursor-pointer" title="Click to view details">${v}</span>` 
        },
        { 
          field: 'paymentDate', 
          header: 'Payment Date',
          render: (v, row) => `<span class="text-[#172B4D]">${v || row.rawDate}</span>` 
        },
        { 
          field: 'center', 
          header: 'Center',
          render: (v) => `<span class="text-[#172B4D] font-medium">${v || '-'}</span>`
        },
        { 
          field: 'supplierName', 
          header: 'Supplier / Payee',
          render: (v) => `<span class="font-medium text-[#172B4D]">${v}</span>`
        },
        { 
          field: 'agent', 
          header: 'Agent',
          render: (v) => `<span class="text-[#5E6C84]">${v || 'Direct Farmer'}</span>`
        },
        { 
          field: 'plant', 
          header: 'Arrival Plant',
          render: (v) => `<span class="text-[#5E6C84]">${v || '-'}</span>`
        },
        { 
          field: 'billNo', 
          header: 'Settled Bill',
          render: (v) => `<span class="font-bold text-[#172B4D]">${v || '-'}</span>`
        },
        { 
          field: 'bankRef', 
          header: 'Bank Ref / UTR',
          render: (v) => `<span class="text-xs text-[#5E6C84] font-mono">${v || '-'}</span>`
        },
        { 
          field: 'paymentMode', 
          header: 'Payment Mode',
          render: (v) => `<span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-[#FAFBFC] text-[#172B4D] border border-[#DFE1E6]">${v}</span>`
        },
        { 
          field: 'amountInr', 
          header: 'Amount (INR)', 
          render: (v) => `<span class="font-bold text-[#172B4D]">₹ ${(parseFloat(v) || 0).toLocaleString()}</span>` 
        },
        { 
          field: 'amountUsd', 
          header: 'Amount (USD)', 
          render: (v) => `<span class="text-[#006644] font-bold">$ ${(parseFloat(v) || 0).toLocaleString()}</span>` 
        },
        { 
          field: 'status', 
          header: 'Status',
          render: (v) => getPaymentStatusBadge(v)
        }
      ],
      actions: [
        {
          label: 'Download',
          icon: `<svg class="w-4 h-4 text-[#00875A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>`,
          onClick: (row) => PurchaseView.downloadRecord(row)
        },
        {
          label: 'Delete',
          icon: `<svg class="w-4 h-4 text-[#FF5630]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>`,
          onClick: (row) => PurchaseView.deletePayment(row, paymentsTable)
        }
      ],
      onRowClick: (row) => PurchaseView.showPaymentDetails(row)
    });

    this.paymentsTable = paymentsTable;
    PurchaseView.paymentsTable = paymentsTable;

    // Apply Filter Search Logic
    const applyFilter = () => {
      const centerVal = document.getElementById('pay-top-center-select')?.value || 'ALL';
      const typeVal = document.getElementById('pay-top-type-select')?.value || 'ALL';
      const supplierVal = document.getElementById('pay-top-supplier-select')?.value || 'ALL';
      const agentVal = document.getElementById('pay-top-agent-select')?.value || 'ALL';
      const plantVal = document.getElementById('pay-top-plant-select')?.value || 'ALL';
      const modeVal = document.getElementById('pay-top-mode-select')?.value || 'ALL';
      const fromDateVal = document.getElementById('pay-top-from-date')?.value || '';
      const toDateVal = document.getElementById('pay-top-to-date')?.value || '';

      let filtered = [...this.paymentsList];

      if (centerVal !== 'ALL') {
        filtered = filtered.filter(p => (p.center || '').toLowerCase().includes(centerVal.toLowerCase()));
      }
      if (typeVal !== 'ALL') {
        filtered = filtered.filter(p => (p.type || '').toUpperCase() === typeVal.toUpperCase());
      }
      if (supplierVal !== 'ALL') {
        filtered = filtered.filter(p => (p.supplierName || '').toLowerCase().includes(supplierVal.toLowerCase()));
      }
      if (agentVal !== 'ALL') {
        filtered = filtered.filter(p => (p.agent || '').toLowerCase().includes(agentVal.toLowerCase()));
      }
      if (plantVal !== 'ALL') {
        filtered = filtered.filter(p => (p.plant || '').toLowerCase().includes(plantVal.toLowerCase()));
      }
      if (modeVal !== 'ALL') {
        filtered = filtered.filter(p => (p.paymentMode || '').toLowerCase().includes(modeVal.toLowerCase()));
      }
      if (fromDateVal && toDateVal) {
        filtered = filtered.filter(p => {
          const itemDate = p.rawDate || '';
          if (!itemDate) return true;
          return itemDate >= fromDateVal && itemDate <= toDateVal;
        });
      } else if (fromDateVal) {
        filtered = filtered.filter(p => {
          const itemDate = p.rawDate || '';
          return !itemDate || itemDate >= fromDateVal;
        });
      } else if (toDateVal) {
        filtered = filtered.filter(p => {
          const itemDate = p.rawDate || '';
          return !itemDate || itemDate <= toDateVal;
        });
      }

      paymentsTable.setData(filtered);
      Toast.show(`Filtered records: ${filtered.length} payment ${filtered.length === 1 ? 'disbursement' : 'disbursements'} found.`, 'info');
    };

    // Search button click
    const searchBtn = document.getElementById('pay-top-search-btn');
    if (searchBtn) {
      searchBtn.addEventListener('click', applyFilter);
    }

    // Reset button click
    const resetBtn = document.getElementById('pay-top-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        const cSel = document.getElementById('pay-top-center-select');
        const tSel = document.getElementById('pay-top-type-select');
        const sSel = document.getElementById('pay-top-supplier-select');
        const aSel = document.getElementById('pay-top-agent-select');
        const plSel = document.getElementById('pay-top-plant-select');
        const mSel = document.getElementById('pay-top-mode-select');
        const fdInput = document.getElementById('pay-top-from-date');
        const tdInput = document.getElementById('pay-top-to-date');

        if (cSel) cSel.value = 'ALL';
        if (tSel) tSel.value = 'ALL';
        if (sSel) sSel.value = 'ALL';
        if (aSel) aSel.value = 'ALL';
        if (plSel) plSel.value = 'ALL';
        if (mSel) mSel.value = 'ALL';
        if (fdInput) fdInput.value = '2026-10-01';
        if (tdInput) tdInput.value = '2026-10-07';

        paymentsTable.setData(this.paymentsList);
        Toast.show('Filters reset. Displaying all payment disbursements.', 'info');
      });
    }

    // Toggle Filter open/close
    const toggleBtn = document.getElementById('pay-top-toggle-btn');
    const filterBody = document.getElementById('pay-top-filter-body');
    const toggleIcon = document.getElementById('pay-top-toggle-icon');
    const toggleText = document.getElementById('pay-top-toggle-text');
    let isCollapsed = false;

    if (toggleBtn && filterBody) {
      toggleBtn.addEventListener('click', () => {
        isCollapsed = !isCollapsed;
        const h = filterBody.previousElementSibling;
        if (isCollapsed) {
          filterBody.classList.add('hidden');
          if (h) { h.classList.remove('pb-1'); h.classList.add('pb-0'); }
          if (toggleText) toggleText.innerText = 'Show Filter';
          if (toggleIcon) toggleIcon.classList.add('-rotate-90');
          toggleBtn.classList.remove('bg-[#F0F9FF]/80', 'text-[#0284C7]', 'border-[#BAE6FD]');
          toggleBtn.classList.add('bg-[#FAFBFC]', 'text-[#5E6C84]', 'border-[#DFE1E6]');
        } else {
          filterBody.classList.remove('hidden');
          if (h) { h.classList.add('pb-1'); h.classList.remove('pb-0'); }
          if (toggleText) toggleText.innerText = 'Hide Filter';
          if (toggleIcon) toggleIcon.classList.remove('-rotate-90');
          toggleBtn.classList.add('bg-[#F0F9FF]/80', 'text-[#0284C7]', 'border-[#BAE6FD]');
          toggleBtn.classList.remove('bg-[#FAFBFC]', 'text-[#5E6C84]', 'border-[#DFE1E6]');
        }
      });
    }
  },

  // =========================================================================
  // SUB MENU: PAYMENTS -> TAB 2: BILL & DATE-WISE PAYMENT (FULL CRUD)
  // =========================================================================
  renderBillDatePayment(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div>
            <h1 class="text-xl font-extrabold text-[#172B4D]">Payment Vouchers</h1>
          </div>
          <div class="flex items-center gap-2">
            <button id="btn-record-new-payment" class="btn-primary px-3 py-1.5 rounded text-xs flex items-center gap-1.5 shadow-xs">
              <span>Record Payment Voucher</span>
            </button>
          </div>
        </div>

        <div id="bill-date-payment-table-container"></div>
      </div>
    `;

    const payTable = new DataTable({
      containerId: 'bill-date-payment-table-container',
      data: this.paymentsList,
      keyField: 'voucherNo',
      tableTitle: 'Vendor Payment Vouchers (CRUD)',
      columns: [
        { field: 'voucherNo', header: 'Voucher No', render: (v) => `<span class="font-bold text-[#172B4D]">${v}</span>` },
        { field: 'paymentDate', header: 'Payment Date' },
        { field: 'supplierName', header: 'Beneficiary Supplier' },
        { field: 'billNo', header: 'Against Bill No' },
        { field: 'paymentMode', header: 'Payment Mode' },
        { field: 'bankRef', header: 'Bank UTR Ref', render: (v) => `<span class="text-xs">${v}</span>` },
        { field: 'amountInr', header: 'Paid INR', render: (v) => `<span class="font-bold text-[#172B4D]">₹ ${v.toLocaleString()}</span>` },
        { field: 'amountUsd', header: 'Paid USD', render: (v) => `<span class="font-bold text-[#006644]">$ ${v.toLocaleString()}</span>` },
        { field: 'status', header: 'Status', type: 'status' }
      ],
      actions: [
        {
          label: 'Download',
          icon: `<svg class="w-4 h-4 text-[#00875A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>`,
          onClick: (row) => PurchaseView.downloadRecord(row)
        },
        {
          label: 'Delete',
          icon: `<svg class="w-4 h-4 text-[#FF5630]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>`,
          onClick: (row) => {
            Modal.confirm({
              title: `Delete Voucher ${row.voucherNo}`,
              message: 'Are you sure you want to delete this payment voucher record?',
              isDestructive: true,
              onConfirm: () => {
                const idx = PurchaseView.paymentsList.findIndex(p => p.voucherNo === row.voucherNo);
                if (idx > -1) {
                  PurchaseView.paymentsList.splice(idx, 1);
                  payTable.setData(PurchaseView.paymentsList);
                  Toast.show(`Payment voucher ${row.voucherNo} removed.`, 'success');
                }
              }
            });
          }
        }
      ],
      onRowClick: (row) => PurchaseView.showPaymentDetails(row)
    });

    const recordBtn = document.getElementById('btn-record-new-payment');
    if (recordBtn) {
      recordBtn.addEventListener('click', () => {
        Modal.open({
          title: 'Record New Supplier Payment Voucher',
          size: 'md',
          content: `
            <form class="space-y-3">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-semibold text-[#172B4D] mb-1">Voucher Number</label>
                  <input type="text" value="PAY-2026-${Math.floor(100 + Math.random() * 900)}" readonly class="w-full text-xs  px-3 py-1.5 bg-[#EBECF0] border border-[#DFE1E6] rounded" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-[#172B4D] mb-1">Payment Date</label>
                  <div class="erp-date-wrapper">
                    <input type="date" value="2026-10-05" class="erp-date-input w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" onclick="this.showPicker ? this.showPicker() : this.focus()" />
                  </div>
                </div>
              </div>
              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Beneficiary Supplier</label>
                <select id="modal-pay-supplier" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded">
                  ${ERP_DATA.suppliers.map(s => `<option value="${s.name}">${s.name}</option>`).join('')}
                </select>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-semibold text-[#172B4D] mb-1">Against Supplier Bill</label>
                  <select id="modal-pay-bill" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded">
                    ${ERP_DATA.supplierBills.map(b => `<option value="${b.billNo}">${b.billNo} - ₹${b.totalAmountInr.toLocaleString()}</option>`).join('')}
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-[#172B4D] mb-1">Payment Mode</label>
                  <select id="modal-pay-mode" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded">
                    <option value="RTGS / Bank Wire">RTGS / Bank Wire</option>
                    <option value="NEFT">NEFT</option>
                    <option value="Cheque / Draft">Cheque / Demand Draft</option>
                  </select>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-semibold text-[#172B4D] mb-1">Amount Paid (INR)</label>
                  <input type="number" id="modal-pay-inr" value="760000" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded " />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-[#172B4D] mb-1">Bank UTR / Ref Number</label>
                  <input type="text" id="modal-pay-utr" value="SBI-RTGS-${Math.floor(100000 + Math.random() * 900000)}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded " />
                </div>
              </div>
            </form>
          `,
          footerButtons: [
            { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
            {
              label: 'Save & Issue Voucher',
              type: 'primary',
              onClick: (m) => {
                const sup = document.getElementById('modal-pay-supplier').value;
                const bill = document.getElementById('modal-pay-bill').value;
                const mode = document.getElementById('modal-pay-mode').value;
                const inr = parseFloat(document.getElementById('modal-pay-inr').value) || 0;
                const utr = document.getElementById('modal-pay-utr').value;

                const newPay = {
                  voucherNo: `PAY-2026-${Math.floor(100 + Math.random() * 900)}`,
                  paymentDate: new Date().toISOString().substring(0, 10),
                  supplierName: sup,
                  billNo: bill,
                  bankRef: utr,
                  amountInr: inr,
                  amountUsd: Math.round(inr / 83),
                  paymentMode: mode,
                  status: 'COMPLETED'
                };

                PurchaseView.paymentsList.unshift(newPay);
                payTable.setData(PurchaseView.paymentsList);
                m.close();
                Toast.show(`Payment voucher ${newPay.voucherNo} generated successfully.`, 'success');
              }
            }
          ]
        });
      });
    }
  },

  // =========================================================================
  // CRUD MODAL HANDLERS FOR LOT TRACKING
  // =========================================================================
  openCreateLotModal(tableInstance) {
    Modal.open({
      title: 'Register New Raw Material Lot',
      size: 'lg',
      content: `
        <form class="space-y-3">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Lot Number (Auto-Gen)</label>
              <input type="text" id="newlot-no" value="LOT-2026-${Math.floor(10000 + Math.random() * 90000)}" readonly class="w-full text-xs px-3 py-1.5 bg-[#EBECF0] border border-[#DFE1E6] rounded" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Purchase Booking No</label>
              <input type="text" id="newlot-pb" value="PB-2026-105" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
            </div>
            <div class="sm:col-span-2 lg:col-span-2">
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Supplier / Farm Cultivator</label>
              <select id="newlot-sup" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded">
                ${ERP_DATA.suppliers.map(s => `<option value="${s.id}|${s.name}">${s.name} (${s.region})</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Species</label>
              <select id="newlot-spec" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded">
                ${ERP_DATA.species.map(sp => `<option value="${sp.name}">${sp.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Variety</label>
              <select id="newlot-var" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded">
                ${ERP_DATA.varieties.map(v => `<option value="${v.name}">${v.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Quantity Received (KG)</label>
              <input type="number" id="newlot-qty" value="3000" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Landing / Farm Pond Source</label>
              <input type="text" id="newlot-source" value="Pond #8B, Undi Road" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
            </div>
          </div>
        </form>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        { 
          label: 'Save & Register Lot', 
          type: 'primary', 
          onClick: (m) => {
            const lotNo = document.getElementById('newlot-no').value;
            const pb = document.getElementById('newlot-pb').value;
            const supParts = document.getElementById('newlot-sup').value.split('|');
            const spec = document.getElementById('newlot-spec').value;
            const variety = document.getElementById('newlot-var').value;
            const qty = parseFloat(document.getElementById('newlot-qty').value) || 2000;
            const source = document.getElementById('newlot-source').value;

            const newLot = {
              lotNumber: lotNo,
              supplierId: supParts[0],
              supplierName: supParts[1],
              purchaseBookingNo: pb,
              species: spec,
              variety: variety,
              grade: '26/30 pcs/lb',
              bookingQtyKg: qty,
              receivedQtyKg: qty,
              qcAcceptedQtyKg: qty,
              preProcessedQtyKg: 0,
              productionOutputKg: 0,
              coldstoreQtyKg: 0,
              dispatchedQtyKg: 0,
              balanceQtyKg: qty,
              yieldPercent: 0,
              arrivalDate: new Date().toISOString().substring(0, 10),
              landingSource: source,
              harvestTemp: '2.5 °C',
              processingStatus: 'Staged at Dock',
              qcStatus: 'PASSED',
              antibioticStatus: 'CLEARED',
              currentLocation: 'Dock Area #1',
              lotStatus: 'ACTIVE',
              assignedBatches: [],
              salesContracts: [],
              traceabilityTimeline: [
                { stage: 'Farm Harvest & Booking', date: new Date().toISOString().substring(0, 16), quantity: `${qty.toLocaleString()} KG`, operator: supParts[1], status: 'Completed', details: `Source: ${source}` },
                { stage: 'RM Arrival & Weighment', date: new Date().toISOString().substring(0, 16), quantity: `${qty.toLocaleString()} KG`, operator: 'Receiving Gate #2', status: 'Completed', details: 'Direct weighment completed.' }
              ]
            };

            ERP_DATA.lots.unshift(newLot);
            if (tableInstance) tableInstance.setData(ERP_DATA.lots);
            m.close();
            Toast.show(`Lot ${newLot.lotNumber} registered successfully.`, 'success', 'Lot Created');
          } 
        }
      ]
    });
  },

  openEditLotModal(lot, tableInstance) {
    Modal.open({
      title: `Edit Lot: ${lot.lotNumber}`,
      size: 'md',
      content: `
        <form class="space-y-3">
          <div>
            <label class="block text-xs font-semibold text-[#172B4D] mb-1">Lot Number</label>
            <input type="text" value="${lot.lotNumber}" readonly class="w-full text-xs  px-3 py-1.5 bg-[#EBECF0] border border-[#DFE1E6] rounded" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-[#172B4D] mb-1">Supplier</label>
            <input type="text" id="editlot-sup" value="${lot.supplierName}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Species</label>
              <input type="text" id="editlot-spec" value="${lot.species}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Grade</label>
              <input type="text" id="editlot-grade" value="${lot.grade}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">RM Received Qty (KG)</label>
              <input type="number" id="editlot-qty" value="${lot.receivedQtyKg}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded " />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Current Location</label>
              <input type="text" id="editlot-loc" value="${lot.currentLocation}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
            </div>
          </div>
        </form>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Update',
          type: 'primary',
          onClick: (m) => {
            lot.supplierName = document.getElementById('editlot-sup').value;
            lot.species = document.getElementById('editlot-spec').value;
            lot.grade = document.getElementById('editlot-grade').value;
            lot.receivedQtyKg = parseFloat(document.getElementById('editlot-qty').value) || lot.receivedQtyKg;
            lot.currentLocation = document.getElementById('editlot-loc').value;

            if (tableInstance) tableInstance.setData(ERP_DATA.lots);
            m.close();
            Toast.show(`Lot ${lot.lotNumber} updated successfully.`, 'success', 'Lot Updated');
          }
        }
      ]
    });
  },

  deleteLot(lot, tableInstance) {
    Modal.confirm({
      title: `Delete Lot ${lot.lotNumber}`,
      message: `Are you sure you want to delete Lot <strong>${lot.lotNumber}</strong> (${lot.species})? This will permanently remove its mass-balance ledger entry.`,
      confirmText: 'Delete Lot',
      isDestructive: true,
      onConfirm: () => {
        const idx = ERP_DATA.lots.findIndex(l => l.lotNumber === lot.lotNumber);
        if (idx > -1) {
          ERP_DATA.lots.splice(idx, 1);
          if (tableInstance) tableInstance.setData(ERP_DATA.lots);
          Toast.show(`Lot ${lot.lotNumber} deleted.`, 'success', 'Deleted');
        }
      }
    });
  },

  // =========================================================================
  // CRUD MODAL HANDLERS FOR RAW MATERIAL ARRIVALS
  // =========================================================================
  openCreateArrivalModal(tableInstance) {
    const nextArrNo = `RMA-2026-${100 + this.rmArrivalsList.length + 1}`;
    Modal.open({
      title: 'Create Raw Material Arrival',
      size: 'lg',
      content: `
        <form id="form-create-rm-arrival" class="space-y-4 text-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Date</label>
              <div class="erp-date-wrapper">
                <input type="date" id="rm-new-date" value="2026-10-06" class="erp-date-input w-full text-xs px-3 py-2 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" onclick="this.showPicker ? this.showPicker() : this.focus()" />
              </div>
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Company</label>
              <select id="rm-new-company" class="w-full text-xs px-3 py-2 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                <option value="DEVI AQUA FEEDS">DEVI AQUA FEEDS</option>
                <option value="DEVI SEAFOODS">DEVI SEAFOODS</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Species</label>
              <select id="rm-new-species" class="w-full text-xs px-3 py-2 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                <option value="">Select</option>
                <option value="Vannamei (VM)">Vannamei (VM)</option>
                <option value="Black Tiger (BT)">Black Tiger (BT)</option>
                <option value="Asian Seabass">Asian Seabass</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Plant</label>
              <select id="rm-new-plant" class="w-full text-xs px-3 py-2 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                <option value="">Select</option>
                <option value="DFL UNIT-1 (VSP)">DFL UNIT-1 (VSP)</option>
                <option value="DFL UNIT-2 (KKD)">DFL UNIT-2 (KKD)</option>
                <option value="DFL UNIT-3 (PSP)">DFL UNIT-3 (PSP)</option>
                <option value="DFL UNIT-4 (PND)">DFL UNIT-4 (PND)</option>
                <option value="DFL UNIT-5 (JPT)">DFL UNIT-5 (JPT)</option>
                <option value="DFL UNIT-6 (JPT-II)">DFL UNIT-6 (JPT-II)</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Center</label>
              <select id="rm-new-center" class="w-full text-xs px-3 py-2 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                <option value="">Select</option>
                <option value="Bhimavaram Center #1">Bhimavaram Center #1</option>
                <option value="Kakinada Sea Intake #2">Kakinada Sea Intake #2</option>
                <option value="Machilipatnam Delta #3">Machilipatnam Delta #3</option>
                <option value="Amalapuram Harvesters #4">Amalapuram Harvesters #4</option>
                <option value="Ongole Coastal Hub #1">Ongole Coastal Hub #1</option>
                <option value="Visakhapatnam Gate Dock">Visakhapatnam Gate Dock</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Weight</label>
              <input type="number" id="rm-new-weight" placeholder="Enter Weight" class="w-full text-xs px-3 py-2 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Amount</label>
              <input type="number" id="rm-new-amount" placeholder="Enter Amount" class="w-full text-xs px-3 py-2 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Average Rate</label>
              <input type="number" id="rm-new-avgrate" placeholder="Enter Average Rate" class="w-full text-xs px-3 py-2 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" />
            </div>
          </div>
        </form>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Save',
          type: 'primary',
          onClick: (m) => {
            const arrNo = nextArrNo;
            const date = document.getElementById('rm-new-date').value || '06/10/2026';
            const company = document.getElementById('rm-new-company').value || 'DEVI FISHERIES LIMITED';
            const plant = document.getElementById('rm-new-plant').value || 'DFL UNIT-5 (JPT)';
            const center = document.getElementById('rm-new-center').value || 'Bhimavaram Center #1';
            const species = document.getElementById('rm-new-species').value || 'Vannamei (VM)';
            const weight = parseFloat(document.getElementById('rm-new-weight').value) || 0;
            let amount = parseFloat(document.getElementById('rm-new-amount').value) || 0;
            let avgRate = parseFloat(document.getElementById('rm-new-avgrate').value) || 0;

            if (weight > 0 && avgRate > 0 && amount === 0) {
              amount = weight * avgRate;
            } else if (weight > 0 && amount > 0 && avgRate === 0) {
              avgRate = Math.round(amount / weight);
            }

            const balWeight = Math.round(weight * 0.3);
            const balAmount = balWeight * avgRate;

            const newRecord = {
              sNo: this.rmArrivalsList.length + 1,
              id: arrNo,
              arrivalNumber: arrNo,
              date: date,
              company: company,
              plant: plant,
              center: center,
              species: species,
              weight: weight,
              balanceWeight: balWeight,
              status: 'QC_CLEARED',
              averageRate: avgRate,
              amount: amount,
              balanceAmount: balAmount,
              vehicleNumber: 'AP 37 TE 9011',
              driverName: 'K. Ramu',
              remarks: 'Created via RM Arrival form.'
            };

            this.rmArrivalsList.unshift(newRecord);
            if (tableInstance) tableInstance.setData(this.rmArrivalsList);
            const badge = document.getElementById('rm-arrivals-count-badge');
            if (badge) badge.innerText = `${this.rmArrivalsList.length} Records`;

            m.close();

            // Confirmation Popup after save
            Modal.success({
              title: 'Raw Material Arrival Saved Successfully',
              message: `Arrival record <strong>${arrNo}</strong> has been registered successfully.`,
              details: [
                { label: 'Date', value: date },
                { label: 'Company', value: company },
                { label: 'Species', value: species },
                { label: 'Plant', value: plant },
                { label: 'Center', value: center },
                { label: 'Weight', value: `${weight.toLocaleString()} KG` },
                { label: 'Amount', value: `₹ ${amount.toLocaleString()}` },
                { label: 'Average Rate', value: `₹ ${avgRate} / KG` }
              ]
            });
            Toast.show(`Arrival ${arrNo} saved successfully.`, 'success', 'Arrival Registered');
          }
        }
      ]
    });

    setTimeout(() => {
      const wtInput = document.getElementById('rm-new-weight');
      const amtInput = document.getElementById('rm-new-amount');
      const rateInput = document.getElementById('rm-new-avgrate');

      const recalc = () => {
        const w = parseFloat(wtInput ? wtInput.value : 0) || 0;
        const r = parseFloat(rateInput ? rateInput.value : 0) || 0;
        if (w > 0 && r > 0 && !amtInput.matches(':focus')) {
          amtInput.value = Math.round(w * r);
        }
      };

      if (wtInput) wtInput.addEventListener('input', recalc);
      if (rateInput) rateInput.addEventListener('input', recalc);
      if (amtInput) {
        amtInput.addEventListener('input', () => {
          const w = parseFloat(wtInput ? wtInput.value : 0) || 0;
          const a = parseFloat(amtInput ? amtInput.value : 0) || 0;
          if (w > 0 && a > 0 && !rateInput.matches(':focus')) {
            rateInput.value = (a / w).toFixed(1);
          }
        });
      }
    }, 50);
  },

  openEditArrivalModal(arrival, tableInstance) {
    const editDateVal = arrival.date ? (arrival.date.includes('/') ? arrival.date.split('/').reverse().join('-') : arrival.date) : '2026-10-06';
    Modal.open({
      title: `Edit Raw Material Arrival: ${arrival.arrivalNumber || arrival.id}`,
      size: 'lg',
      content: `
        <form id="form-edit-rm-arrival" class="space-y-4 text-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Date</label>
              <div class="erp-date-wrapper">
                <input type="date" id="rm-edit-date" value="${editDateVal}" class="erp-date-input w-full text-xs px-3 py-2 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" onclick="this.showPicker ? this.showPicker() : this.focus()" />
              </div>
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Company</label>
              <select id="rm-edit-company" class="w-full text-xs px-3 py-2 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                <option value="DEVI FISHERIES LIMITED" ${arrival.company === 'DEVI FISHERIES LIMITED' ? 'selected' : ''}>DEVI FISHERIES LIMITED</option>
                <option value="DEVI AQUA FEEDS" ${arrival.company === 'DEVI AQUA FEEDS' ? 'selected' : ''}>DEVI AQUA FEEDS</option>
                <option value="DEVI SEAFOODS" ${arrival.company === 'DEVI SEAFOODS' ? 'selected' : ''}>DEVI SEAFOODS</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Species</label>
              <select id="rm-edit-species" class="w-full text-xs px-3 py-2 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                <option value="">Select</option>
                <option value="Vannamei (VM)" ${arrival.species === 'Vannamei (VM)' || arrival.species?.includes('Vannamei') ? 'selected' : ''}>Vannamei (VM)</option>
                <option value="Black Tiger (BT)" ${arrival.species === 'Black Tiger (BT)' || arrival.species?.includes('Tiger') ? 'selected' : ''}>Black Tiger (BT)</option>
                <option value="Asian Seabass" ${arrival.species === 'Asian Seabass' ? 'selected' : ''}>Asian Seabass</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Plant</label>
              <select id="rm-edit-plant" class="w-full text-xs px-3 py-2 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                <option value="">Select</option>
                <option value="DFL UNIT-1 (VSP)" ${arrival.plant?.includes('UNIT-1') ? 'selected' : ''}>DFL UNIT-1 (VSP)</option>
                <option value="DFL UNIT-2 (KKD)" ${arrival.plant?.includes('UNIT-2') ? 'selected' : ''}>DFL UNIT-2 (KKD)</option>
                <option value="DFL UNIT-3 (PSP)" ${arrival.plant?.includes('UNIT-3') ? 'selected' : ''}>DFL UNIT-3 (PSP)</option>
                <option value="DFL UNIT-4 (PND)" ${arrival.plant?.includes('UNIT-4') ? 'selected' : ''}>DFL UNIT-4 (PND)</option>
                <option value="DFL UNIT-5 (JPT)" ${arrival.plant?.includes('UNIT-5') ? 'selected' : ''}>DFL UNIT-5 (JPT)</option>
                <option value="DFL UNIT-6 (JPT-II)" ${arrival.plant?.includes('UNIT-6') ? 'selected' : ''}>DFL UNIT-6 (JPT-II)</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Center</label>
              <select id="rm-edit-center" class="w-full text-xs px-3 py-2 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                <option value="">Select</option>
                <option value="Bhimavaram Center #1" ${arrival.center?.includes('Bhimavaram') ? 'selected' : ''}>Bhimavaram Center #1</option>
                <option value="Kakinada Sea Intake #2" ${arrival.center?.includes('Kakinada') ? 'selected' : ''}>Kakinada Sea Intake #2</option>
                <option value="Machilipatnam Delta #3" ${arrival.center?.includes('Machilipatnam') ? 'selected' : ''}>Machilipatnam Delta #3</option>
                <option value="Amalapuram Harvesters #4" ${arrival.center?.includes('Amalapuram') ? 'selected' : ''}>Amalapuram Harvesters #4</option>
                <option value="Ongole Coastal Hub #1" ${arrival.center?.includes('Ongole') ? 'selected' : ''}>Ongole Coastal Hub #1</option>
                <option value="Visakhapatnam Gate Dock" ${arrival.center?.includes('Visakhapatnam') ? 'selected' : ''}>Visakhapatnam Gate Dock</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Weight</label>
              <input type="number" id="rm-edit-weight" value="${arrival.weight || ''}" placeholder="Enter Weight" class="w-full text-xs px-3 py-2 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Amount</label>
              <input type="number" id="rm-edit-amount" value="${arrival.amount || ''}" placeholder="Enter Amount" class="w-full text-xs px-3 py-2 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Average Rate</label>
              <input type="number" id="rm-edit-avgrate" value="${arrival.averageRate || ''}" placeholder="Enter Average Rate" class="w-full text-xs px-3 py-2 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" />
            </div>
          </div>
        </form>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Update',
          type: 'primary',
          onClick: (m) => {
            arrival.date = document.getElementById('rm-edit-date').value || arrival.date;
            arrival.company = document.getElementById('rm-edit-company').value || arrival.company;
            arrival.plant = document.getElementById('rm-edit-plant').value || arrival.plant;
            arrival.center = document.getElementById('rm-edit-center').value || arrival.center;
            arrival.species = document.getElementById('rm-edit-species').value || arrival.species;
            arrival.weight = parseFloat(document.getElementById('rm-edit-weight').value) || 0;
            arrival.amount = parseFloat(document.getElementById('rm-edit-amount').value) || 0;
            arrival.averageRate = parseFloat(document.getElementById('rm-edit-avgrate').value) || 0;

            if (arrival.weight > 0 && arrival.averageRate > 0 && arrival.amount === 0) {
              arrival.amount = arrival.weight * arrival.averageRate;
            } else if (arrival.weight > 0 && arrival.amount > 0 && arrival.averageRate === 0) {
              arrival.averageRate = Math.round(arrival.amount / arrival.weight);
            }

            arrival.balanceWeight = Math.round(arrival.weight * 0.3);
            arrival.balanceAmount = arrival.balanceWeight * arrival.averageRate;

            if (tableInstance) tableInstance.setData(this.rmArrivalsList);
            m.close();

            // Confirmation Popup after edit
            Modal.success({
              title: 'Raw Material Arrival Updated Successfully',
              message: `Arrival record <strong>${arrival.arrivalNumber || arrival.id}</strong> has been updated successfully.`,
              details: [
                { label: 'Date', value: arrival.date },
                { label: 'Company', value: arrival.company },
                { label: 'Species', value: arrival.species },
                { label: 'Plant', value: arrival.plant },
                { label: 'Center', value: arrival.center },
                { label: 'Weight', value: `${arrival.weight.toLocaleString()} KG` },
                { label: 'Amount', value: `₹ ${arrival.amount.toLocaleString()}` },
                { label: 'Average Rate', value: `₹ ${arrival.averageRate} / KG` }
              ]
            });
            Toast.show(`Arrival ${arrival.arrivalNumber || arrival.id} updated successfully.`, 'success');
          }
        }
      ]
    });

    setTimeout(() => {
      const wtInput = document.getElementById('rm-edit-weight');
      const amtInput = document.getElementById('rm-edit-amount');
      const rateInput = document.getElementById('rm-edit-avgrate');

      const recalc = () => {
        const w = parseFloat(wtInput ? wtInput.value : 0) || 0;
        const r = parseFloat(rateInput ? rateInput.value : 0) || 0;
        if (w > 0 && r > 0 && !amtInput.matches(':focus')) {
          amtInput.value = Math.round(w * r);
        }
      };

      if (wtInput) wtInput.addEventListener('input', recalc);
      if (rateInput) rateInput.addEventListener('input', recalc);
      if (amtInput) {
        amtInput.addEventListener('input', () => {
          const w = parseFloat(wtInput ? wtInput.value : 0) || 0;
          const a = parseFloat(amtInput ? amtInput.value : 0) || 0;
          if (w > 0 && a > 0 && !rateInput.matches(':focus')) {
            rateInput.value = (a / w).toFixed(1);
          }
        });
      }
    }, 50);
  },

  deleteArrival(arrival, tableInstance) {
    const arrNo = arrival.arrivalNumber || arrival.id;
    Modal.confirm({
      title: `Delete Arrival ${arrNo}`,
      message: `Are you sure you want to remove raw material arrival record <strong>${arrNo}</strong>?`,
      confirmText: 'Delete Arrival',
      isDestructive: true,
      onConfirm: () => {
        const idx = this.rmArrivalsList.findIndex(a => (a.arrivalNumber === arrNo || a.id === arrNo));
        if (idx > -1) {
          const removed = this.rmArrivalsList.splice(idx, 1)[0];
          if (tableInstance) tableInstance.setData(this.rmArrivalsList);
          const badge = document.getElementById('rm-arrivals-count-badge');
          if (badge) badge.innerText = `${this.rmArrivalsList.length} Records`;

          // Confirmation Popup after delete
          Modal.success({
            title: 'Arrival Record Deleted',
            message: `Raw material arrival <strong>${arrNo}</strong> has been deleted from the database.`,
            details: [
              { label: 'Deleted Record', value: arrNo },
              { label: 'Plant', value: removed.plant || 'DFL UNIT-5' },
              { label: 'Removed Weight', value: `${(removed.weight || 0).toLocaleString()} KG` }
            ]
          });
          Toast.show(`Arrival ${arrNo} deleted.`, 'success');
        }
      }
    });
  },

  // =========================================================================
  // CRUD MODAL HANDLERS FOR ARRIVALS (CENTER CATCH INWARD)
  // =========================================================================
  openCreateArrivalRecordModal(tableInstance) {
    const nextCode = `ARR-2026-${1046 + ERP_DATA.arrivals.length}`;
    Modal.open({
      title: 'Create Inward Harvest Catch Arrival Record',
      size: 'xl',
      content: `
        <form id="form-create-arrival-record" class="space-y-4 text-xs">
          <!-- Section 1: Required Fields -->
          <div>
            <div class="flex items-center justify-between pb-2 mb-3 border-b border-[#EBECF0]">
              <h4 class="text-xs font-bold text-[#172B4D] uppercase tracking-wider">Required Fields</h4>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Species</label>
                <select id="arr-species" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                  <option value="">Select Species</option>
                  <option value="Vannamei Shrimp" selected>Vannamei Shrimp</option>
                  <option value="Black Tiger Shrimp">Black Tiger Shrimp</option>
                  <option value="Asian Seabass">Asian Seabass</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Center Name</label>
                <select id="arr-center" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                  <option value="">Select Center</option>
                  <option value="Bhimavaram Center #1" selected>Bhimavaram Center #1</option>
                  <option value="Kakinada Sea Intake #2">Kakinada Sea Intake #2</option>
                  <option value="Machilipatnam Delta #3">Machilipatnam Delta #3</option>
                  <option value="Amalapuram Harvesters #4">Amalapuram Harvesters #4</option>
                  <option value="Ongole Coastal Hub #1">Ongole Coastal Hub #1</option>
                  <option value="Visakhapatnam Gate Dock">Visakhapatnam Gate Dock</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Arrival Plant</label>
                <select id="arr-plant" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                  <option value="">Select Plant</option>
                  <option value="DFL UNIT-5 (JPT)" selected>DFL UNIT-5 (JPT)</option>
                  <option value="DFL UNIT-3 (PSP)">DFL UNIT-3 (PSP)</option>
                  <option value="DFL UNIT-6 (JPT-II)">DFL UNIT-6 (JPT-II)</option>
                  <option value="DFL UNIT-4 (PND)">DFL UNIT-4 (PND)</option>
                  <option value="DFL UNIT-2 (KKD)">DFL UNIT-2 (KKD)</option>
                  <option value="DFL UNIT-1 (VSP)">DFL UNIT-1 (VSP)</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Bill Date</label>
                <div class="erp-date-wrapper">
                  <input type="date" id="arr-bill-date" value="2026-10-05" class="erp-date-input w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" onclick="this.showPicker ? this.showPicker() : this.focus()" />
                </div>
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Arrival Date</label>
                <div class="erp-date-wrapper">
                  <input type="date" id="arr-arrival-date" value="2026-10-06" class="erp-date-input w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" onclick="this.showPicker ? this.showPicker() : this.focus()" />
                </div>
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Bill Number</label>
                <input type="number" id="arr-bill-number" placeholder="Enter Arrival Number" value="1046" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" />
              </div>

              <div>
                <div class="flex items-center justify-between mb-1">
                  <label class="block text-xs font-semibold text-[#172B4D]">Supplier Name</label>
                  <button type="button" id="btn-quick-new-supplier" class="text-[10px] text-[#17191c] font-bold hover:underline cursor-pointer bg-[#F0F9FF] hover:bg-[#BAE6FD] px-2 py-0.5 rounded transition-colors">New</button>
                </div>
                <select id="arr-supplier" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                  <option value="">Select Supplier</option>
                  <option value="Godavari Coastal Aqua Farms" selected>Godavari Coastal Aqua Farms</option>
                  <option value="Sagar Marine Hatcheries">Sagar Marine Hatcheries</option>
                  <option value="Krishna Delta Prawn Harvesters">Krishna Delta Prawn Harvesters</option>
                  <option value="Konaseema Marine Harvesters Syndicate">Konaseema Marine Harvesters Syndicate</option>
                  <option value="Nellore Brackish Aqua Cultivators">Nellore Brackish Aqua Cultivators</option>
                  <option value="Sri Sai Aqua Farms">Sri Sai Aqua Farms</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Agent Name</label>
                <select id="arr-agent" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                  <option value="">Select Agent</option>
                  <option value="Direct Procurement" selected>Direct Procurement</option>
                  <option value="Coastal Marine Agency">Coastal Marine Agency</option>
                  <option value="Sagar Marine Brokers">Sagar Marine Brokers</option>
                  <option value="Delta Marine Syndicate">Delta Marine Syndicate</option>
                  <option value="East Coast Brokers">East Coast Brokers</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Purchase Type</label>
                <select id="arr-purchase-type" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                  <option value="Site Weightment" selected>Site Weightment</option>
                  <option value="Direct Farmer Procurement">Direct Farmer Procurement</option>
                  <option value="Hatchery Buyback Contract">Hatchery Buyback Contract</option>
                  <option value="Spot Market Purchase">Spot Market Purchase</option>
                  <option value="Agent Procurement Order">Agent Procurement Order</option>
                  <option value="Corporate Feed-Linked Booking">Corporate Feed-Linked Booking</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Farm Location</label>
                <input type="text" id="arr-farm-location" placeholder="Enter Farm Location" value="Pond #4B & 5A, Akividu" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" />
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Grader Name</label>
                <select id="arr-grader" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                  <option value="">Select Grader</option>
                  <option value="B. Venkatesh" selected>B. Venkatesh</option>
                  <option value="K. Ramu">K. Ramu</option>
                  <option value="M. Nagesh">M. Nagesh</option>
                  <option value="G. Suribabu">G. Suribabu</option>
                  <option value="Ch. Narayana">Ch. Narayana</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Supervisor Name</label>
                <select id="arr-supervisor" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                  <option value="">Select Supervisor</option>
                  <option value="S. Prasad" selected>S. Prasad</option>
                  <option value="K. Srinivas">K. Srinivas</option>
                  <option value="V. Satyam">V. Satyam</option>
                  <option value="P. Murthy">P. Murthy</option>
                  <option value="M. Rao">M. Rao</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Driver Name</label>
                <select id="arr-driver" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                  <option value="">Select Driver</option>
                  <option value="K. Appa Rao" selected>K. Appa Rao</option>
                  <option value="S. Manikyam">S. Manikyam</option>
                  <option value="T. Chinna">T. Chinna</option>
                  <option value="G. Suribabu">G. Suribabu</option>
                  <option value="Ch. Narayana">Ch. Narayana</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Vehicle Number</label>
                <select id="arr-vehicle" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                  <option value="">Select Vehicle</option>
                  <option value="AP 37 TE 8812" selected>AP 37 TE 8812</option>
                  <option value="AP 31 XY 4402">AP 31 XY 4402</option>
                  <option value="AP 16 TZ 5590">AP 16 TZ 5590</option>
                  <option value="AP 05 AB 1234">AP 05 AB 1234</option>
                  <option value="AP 27 BB 9012">AP 27 BB 9012</option>
                  <option value="AP 04 TT 5619">AP 04 TT 5619</option>
                  <option value="AP 26 TV 1104">AP 26 TV 1104</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Harvest Commission</label>
                <input type="text" id="arr-commission" placeholder="Enter Harvest Commission" value="2.50" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" />
              </div>
            </div>
          </div>

          <!-- Section 2: Optional Fields -->
          <div>
            <div class="flex items-center justify-between pb-2 mb-3 border-b border-[#EBECF0]">
              <h4 class="text-xs font-bold text-[#5E6C84] uppercase tracking-wider">Optional Fields</h4>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div class="col-span-1 sm:col-span-2 lg:col-span-4">
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Remarks</label>
                <textarea id="arr-remarks" rows="2" placeholder="Enter Remarks - Optional" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]"></textarea>
              </div>
            </div>
          </div>

          <!-- Section 3: Details Section -->
          <div>
            <div class="flex items-center justify-between pb-2 mb-3 border-b border-[#EBECF0]">
              <h4 class="text-xs font-bold text-[#172B4D] uppercase tracking-wider">Details Section</h4>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Total Weight</label>
                <input type="text" id="arr-total-weight" placeholder="Enter Total Weight" value="3850" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" />
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Balance Weight</label>
                <input type="text" id="arr-balance-weight" placeholder="Enter Balance Weight" value="730" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" />
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Total Value</label>
                <input type="text" id="arr-total-value" placeholder="Enter Total Value" value="1326000" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" />
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Balance Value</label>
                <input type="text" id="arr-balance-value" placeholder="Enter Balance Value" value="310250" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" />
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Variety</label>
                <select id="arr-variety" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                  <option value="HEAD ON" selected>HEAD ON</option>
                  <option value="HEADLESS">HEADLESS</option>
                  <option value="EASY PEEL">EASY PEEL</option>
                  <option value="PUD">PUD</option>
                  <option value="PDTO">PDTO</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Arrival Count</label>
                <input type="number" id="arr-arrival-count" placeholder="Enter Arrival Count" value="44" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" />
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Arrival Weight (Kgs)</label>
                <input type="text" id="arr-arrival-weight" placeholder="Enter Arrival Weight in Kgs" value="3120" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" />
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Arrival Rate</label>
                <input type="text" id="arr-arrival-rate" placeholder="Enter Arrival Rate" value="425" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" />
              </div>
            </div>
          </div>
        </form>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Create Arrival Record',
          type: 'primary',
          onClick: (m) => {
            const spec = document.getElementById('arr-species').value || 'Vannamei Shrimp';
            const ctr = document.getElementById('arr-center').value || 'Bhimavaram Center #1';
            const plant = document.getElementById('arr-plant').value || 'DFL UNIT-5 (JPT)';
            const billDate = document.getElementById('arr-bill-date').value || '05/10/2026';
            const arrDate = document.getElementById('arr-arrival-date').value || '06/10/2026';
            const billNo = document.getElementById('arr-bill-number').value || '1046';
            const sup = document.getElementById('arr-supplier').value || 'Godavari Coastal Aqua Farms';
            const agent = document.getElementById('arr-agent').value || 'Direct Procurement';
            const pType = document.getElementById('arr-purchase-type').value || 'Site Weightment';
            const farmLoc = document.getElementById('arr-farm-location').value || 'Pond #4B & 5A';
            const grader = document.getElementById('arr-grader').value || 'B. Venkatesh';
            const supvr = document.getElementById('arr-supervisor').value || 'S. Prasad';
            const driver = document.getElementById('arr-driver').value || 'K. Appa Rao';
            const veh = document.getElementById('arr-vehicle').value || 'AP 37 TE 8812';
            const comm = document.getElementById('arr-commission').value || '2.50';
            const remarks = document.getElementById('arr-remarks').value || 'Verified catch intake';

            const totWt = parseFloat(document.getElementById('arr-total-weight').value) || 3850;
            const balWt = parseFloat(document.getElementById('arr-balance-weight').value) || 730;
            const variety = document.getElementById('arr-variety').value || 'HEAD ON';
            const count = document.getElementById('arr-arrival-count').value || '44';
            const arrWt = parseFloat(document.getElementById('arr-arrival-weight').value) || 3120;
            const arrRate = parseFloat(document.getElementById('arr-arrival-rate').value) || 425;
            const totVal = parseFloat(document.getElementById('arr-total-value').value) || (arrWt * arrRate);
            const balVal = parseFloat(document.getElementById('arr-balance-value').value) || (balWt * arrRate);

            const code = `ARR-2026-${billNo}`;
            const newRecord = {
              id: code,
              arrivalCode: code,
              arrivalNumber: code,
              date: arrDate,
              arrivalDate: arrDate,
              billDate: billDate,
              billNumber: billNo,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              arrivalPlant: plant,
              plant: plant,
              center: ctr,
              supplier: sup,
              pond: farmLoc,
              farmLocation: farmLoc,
              species: spec,
              countRange: `${count} pcs/kg`,
              arrivalCount: `${count} pcs/kg`,
              cratesIn: 120,
              cratesOut: 120,
              iceWeightKg: 650,
              grossWeightKg: totWt,
              tareWeightKg: 470,
              netCatchKg: arrWt,
              arrivalWeight: arrWt,
              ratePerKg: arrRate,
              arrivalRate: arrRate,
              totalAmt: totVal,
              totalWeight: totWt,
              balanceWeight: balWt,
              totalValue: totVal,
              balanceValue: balVal,
              variety: variety,
              temperature: '2.5 °C',
              vehicleNo: veh,
              driverName: driver,
              graderName: grader,
              supervisor: supvr,
              agent: agent,
              purchaseType: pType,
              harvestCommission: comm,
              remarks: remarks,
              status: 'QC_CLEARED'
            };

            ERP_DATA.arrivals.unshift(newRecord);
            if (tableInstance) tableInstance.setData(ERP_DATA.arrivals);
            m.close();

            Modal.success({
              title: 'Arrival Receipt Submitted Successfully',
              message: `Inward catch arrival receipt <strong>${code}</strong> has been recorded and verified.`,
              details: [
                { label: 'Arrival Number', value: code },
                { label: 'Center', value: ctr },
                { label: 'Plant', value: plant },
                { label: 'Supplier', value: sup },
                { label: 'Purchase Type', value: pType },
                { label: 'Arrival Weight', value: `${arrWt.toLocaleString()} KG` },
                { label: 'Arrival Rate', value: `₹ ${arrRate} / KG` },
                { label: 'Total Amt', value: `₹ ${totVal.toLocaleString()}` }
              ]
            });
            Toast.show(`Arrival receipt ${code} created successfully for ${arrWt.toLocaleString()} KG`, 'success');
          }
        }
      ]
    });

    setTimeout(() => {
      // Quick New Supplier button
      const btnNewSup = document.getElementById('btn-quick-new-supplier');
      if (btnNewSup) {
        btnNewSup.addEventListener('click', () => {
          const newName = prompt('Enter New Supplier / Farmer Name:');
          if (newName && newName.trim()) {
            const trimmed = newName.trim();
            const supSelect = document.getElementById('arr-supplier');
            if (supSelect) {
              const opt = document.createElement('option');
              opt.value = trimmed;
              opt.text = trimmed;
              opt.selected = true;
              supSelect.appendChild(opt);
              if (!ERP_DATA.suppliers.some(s => s.name === trimmed)) {
                ERP_DATA.suppliers.push({ id: `SUP-${Date.now()}`, name: trimmed, region: 'East Coast Aqua' });
              }
              Toast.show(`New supplier "${trimmed}" added and selected.`, 'success');
            }
          }
        });
      }

      // Auto calculation for Details section
      const wtInput = document.getElementById('arr-arrival-weight');
      const rateInput = document.getElementById('arr-arrival-rate');
      const valInput = document.getElementById('arr-total-value');
      const balWtInput = document.getElementById('arr-balance-weight');
      const balValInput = document.getElementById('arr-balance-value');
      const totWtInput = document.getElementById('arr-total-weight');

      const recalc = () => {
        const w = parseFloat(wtInput ? wtInput.value : 0) || 0;
        const r = parseFloat(rateInput ? rateInput.value : 0) || 0;
        const bw = parseFloat(balWtInput ? balWtInput.value : 0) || 0;
        if (w > 0 && r > 0 && valInput && !valInput.matches(':focus')) {
          valInput.value = Math.round(w * r);
        }
        if (bw > 0 && r > 0 && balValInput && !balValInput.matches(':focus')) {
          balValInput.value = Math.round(bw * r);
        }
      };

      if (wtInput) wtInput.addEventListener('input', recalc);
      if (rateInput) rateInput.addEventListener('input', recalc);
      if (balWtInput) balWtInput.addEventListener('input', recalc);
      if (totWtInput) {
        totWtInput.addEventListener('input', () => {
          const tw = parseFloat(totWtInput.value) || 0;
          const aw = parseFloat(wtInput ? wtInput.value : 0) || 0;
          if (tw > aw && balWtInput && !balWtInput.matches(':focus')) {
            balWtInput.value = Math.round(tw - aw);
            recalc();
          }
        });
      }
    }, 60);
  },

  openEditArrivalRecordModal(arrival, tableInstance) {
    const editBillDateVal = arrival.billDate ? (arrival.billDate.includes('/') ? arrival.billDate.split('/').reverse().join('-') : arrival.billDate) : '2026-10-05';
    const editArrDateVal = (arrival.arrivalDate || arrival.date) ? ((arrival.arrivalDate || arrival.date).includes('/') ? (arrival.arrivalDate || arrival.date).split('/').reverse().join('-') : (arrival.arrivalDate || arrival.date)) : '2026-10-06';
    Modal.open({
      title: `Edit Arrival Record: ${arrival.arrivalNumber || arrival.arrivalCode || arrival.id}`,
      size: 'xl',
      content: `
        <form id="form-edit-arrival-record" class="space-y-4 text-xs">
          <!-- Section 1: Required Fields -->
          <div>
            <div class="flex items-center justify-between pb-2 mb-3 border-b border-[#EBECF0]">
              <h4 class="text-xs font-bold text-[#172B4D] uppercase tracking-wider">Required Fields</h4>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Species</label>
                <select id="edit-arrec-species" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                  <option value="Vannamei Shrimp" ${arrival.species && arrival.species.includes('Vannamei') ? 'selected' : ''}>Vannamei Shrimp</option>
                  <option value="Black Tiger Shrimp" ${arrival.species && arrival.species.includes('Black Tiger') ? 'selected' : ''}>Black Tiger Shrimp</option>
                  <option value="Asian Seabass" ${arrival.species && arrival.species.includes('Seabass') ? 'selected' : ''}>Asian Seabass</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Center Name</label>
                <select id="edit-arrec-center" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                  <option value="Bhimavaram Center #1" ${arrival.center && arrival.center.includes('Bhimavaram') ? 'selected' : ''}>Bhimavaram Center #1</option>
                  <option value="Kakinada Sea Intake #2" ${arrival.center && arrival.center.includes('Kakinada') ? 'selected' : ''}>Kakinada Sea Intake #2</option>
                  <option value="Machilipatnam Delta #3" ${arrival.center && arrival.center.includes('Machilipatnam') ? 'selected' : ''}>Machilipatnam Delta #3</option>
                  <option value="Amalapuram Harvesters #4" ${arrival.center && arrival.center.includes('Amalapuram') ? 'selected' : ''}>Amalapuram Harvesters #4</option>
                  <option value="Ongole Coastal Hub #1" ${arrival.center && arrival.center.includes('Ongole') ? 'selected' : ''}>Ongole Coastal Hub #1</option>
                  <option value="Visakhapatnam Gate Dock" ${arrival.center && arrival.center.includes('Visakhapatnam') ? 'selected' : ''}>Visakhapatnam Gate Dock</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Arrival Plant</label>
                <select id="edit-arrec-plant" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                  <option value="DFL UNIT-5 (JPT)" ${arrival.arrivalPlant && arrival.arrivalPlant.includes('UNIT-5') ? 'selected' : ''}>DFL UNIT-5 (JPT)</option>
                  <option value="DFL UNIT-3 (PSP)" ${arrival.arrivalPlant && arrival.arrivalPlant.includes('UNIT-3') ? 'selected' : ''}>DFL UNIT-3 (PSP)</option>
                  <option value="DFL UNIT-6 (JPT-II)" ${arrival.arrivalPlant && arrival.arrivalPlant.includes('UNIT-6') ? 'selected' : ''}>DFL UNIT-6 (JPT-II)</option>
                  <option value="DFL UNIT-4 (PND)" ${arrival.arrivalPlant && arrival.arrivalPlant.includes('UNIT-4') ? 'selected' : ''}>DFL UNIT-4 (PND)</option>
                  <option value="DFL UNIT-2 (KKD)" ${arrival.arrivalPlant && arrival.arrivalPlant.includes('UNIT-2') ? 'selected' : ''}>DFL UNIT-2 (KKD)</option>
                  <option value="DFL UNIT-1 (VSP)" ${arrival.arrivalPlant && arrival.arrivalPlant.includes('UNIT-1') ? 'selected' : ''}>DFL UNIT-1 (VSP)</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Bill Date</label>
                <div class="erp-date-wrapper">
                  <input type="date" id="edit-arrec-bill-date" value="${editBillDateVal}" class="erp-date-input w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" onclick="this.showPicker ? this.showPicker() : this.focus()" />
                </div>
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Arrival Date</label>
                <div class="erp-date-wrapper">
                  <input type="date" id="edit-arrec-arrival-date" value="${editArrDateVal}" class="erp-date-input w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" onclick="this.showPicker ? this.showPicker() : this.focus()" />
                </div>
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Bill Number</label>
                <input type="number" id="edit-arrec-bill-number" value="${(arrival.arrivalNumber || arrival.arrivalCode || '').replace(/\D/g, '') || 1045}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" />
              </div>

              <div>
                <div class="flex items-center justify-between mb-1">
                  <label class="block text-xs font-semibold text-[#172B4D]">Supplier Name</label>
                  <button type="button" id="btn-quick-new-supplier-edit" class="text-[10px] text-[#17191c] font-bold hover:underline cursor-pointer bg-[#F0F9FF] hover:bg-[#BAE6FD] px-2 py-0.5 rounded transition-colors">New</button>
                </div>
                <select id="edit-arrec-supplier" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                  <option value="Godavari Coastal Aqua Farms" ${arrival.supplier && arrival.supplier.includes('Godavari') ? 'selected' : ''}>Godavari Coastal Aqua Farms</option>
                  <option value="Sagar Marine Hatcheries" ${arrival.supplier && arrival.supplier.includes('Sagar') ? 'selected' : ''}>Sagar Marine Hatcheries</option>
                  <option value="Krishna Delta Prawn Harvesters" ${arrival.supplier && arrival.supplier.includes('Krishna') ? 'selected' : ''}>Krishna Delta Prawn Harvesters</option>
                  <option value="Konaseema Marine Harvesters Syndicate" ${arrival.supplier && arrival.supplier.includes('Konaseema') ? 'selected' : ''}>Konaseema Marine Harvesters Syndicate</option>
                  <option value="Nellore Brackish Aqua Cultivators" ${arrival.supplier && arrival.supplier.includes('Nellore') ? 'selected' : ''}>Nellore Brackish Aqua Cultivators</option>
                  <option value="Sri Sai Aqua Farms" ${arrival.supplier && arrival.supplier.includes('Sri Sai') ? 'selected' : ''}>Sri Sai Aqua Farms</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Agent Name</label>
                <select id="edit-arrec-agent" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                  <option value="Direct Procurement" ${!arrival.agent || arrival.agent === 'Direct Procurement' ? 'selected' : ''}>Direct Procurement</option>
                  <option value="Coastal Marine Agency" ${arrival.agent && arrival.agent.includes('Coastal') ? 'selected' : ''}>Coastal Marine Agency</option>
                  <option value="Sagar Marine Brokers" ${arrival.agent && arrival.agent.includes('Sagar') ? 'selected' : ''}>Sagar Marine Brokers</option>
                  <option value="Delta Marine Syndicate" ${arrival.agent && arrival.agent.includes('Delta') ? 'selected' : ''}>Delta Marine Syndicate</option>
                  <option value="East Coast Brokers" ${arrival.agent && arrival.agent.includes('East') ? 'selected' : ''}>East Coast Brokers</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Purchase Type</label>
                <select id="edit-arrec-purchase-type" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                  <option value="Site Weightment" ${arrival.purchaseType === 'Site Weightment' ? 'selected' : ''}>Site Weightment</option>
                  <option value="Direct Farmer Procurement" ${arrival.purchaseType === 'Direct Farmer Procurement' ? 'selected' : ''}>Direct Farmer Procurement</option>
                  <option value="Hatchery Buyback Contract" ${arrival.purchaseType === 'Hatchery Buyback Contract' ? 'selected' : ''}>Hatchery Buyback Contract</option>
                  <option value="Spot Market Purchase" ${arrival.purchaseType === 'Spot Market Purchase' ? 'selected' : ''}>Spot Market Purchase</option>
                  <option value="Agent Procurement Order" ${arrival.purchaseType === 'Agent Procurement Order' ? 'selected' : ''}>Agent Procurement Order</option>
                  <option value="Corporate Feed-Linked Booking" ${arrival.purchaseType === 'Corporate Feed-Linked Booking' ? 'selected' : ''}>Corporate Feed-Linked Booking</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Farm Location</label>
                <input type="text" id="edit-arrec-farm-location" value="${arrival.farmLocation || arrival.pond || 'Pond #4B & 5A'}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" />
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Grader Name</label>
                <select id="edit-arrec-grader" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                  <option value="B. Venkatesh" ${arrival.graderName === 'B. Venkatesh' ? 'selected' : ''}>B. Venkatesh</option>
                  <option value="K. Ramu" ${arrival.graderName === 'K. Ramu' ? 'selected' : ''}>K. Ramu</option>
                  <option value="M. Nagesh" ${arrival.graderName === 'M. Nagesh' ? 'selected' : ''}>M. Nagesh</option>
                  <option value="G. Suribabu" ${arrival.graderName === 'G. Suribabu' ? 'selected' : ''}>G. Suribabu</option>
                  <option value="Ch. Narayana" ${arrival.graderName === 'Ch. Narayana' ? 'selected' : ''}>Ch. Narayana</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Supervisor Name</label>
                <select id="edit-arrec-supervisor" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                  <option value="S. Prasad" ${arrival.supervisor === 'S. Prasad' ? 'selected' : ''}>S. Prasad</option>
                  <option value="K. Srinivas" ${arrival.supervisor === 'K. Srinivas' ? 'selected' : ''}>K. Srinivas</option>
                  <option value="V. Satyam" ${arrival.supervisor === 'V. Satyam' ? 'selected' : ''}>V. Satyam</option>
                  <option value="P. Murthy" ${arrival.supervisor === 'P. Murthy' ? 'selected' : ''}>P. Murthy</option>
                  <option value="M. Rao" ${arrival.supervisor === 'M. Rao' ? 'selected' : ''}>M. Rao</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Driver Name</label>
                <select id="edit-arrec-driver" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                  <option value="K. Appa Rao" ${arrival.driverName === 'K. Appa Rao' ? 'selected' : ''}>K. Appa Rao</option>
                  <option value="S. Manikyam" ${arrival.driverName === 'S. Manikyam' ? 'selected' : ''}>S. Manikyam</option>
                  <option value="T. Chinna" ${arrival.driverName === 'T. Chinna' ? 'selected' : ''}>T. Chinna</option>
                  <option value="G. Suribabu" ${arrival.driverName === 'G. Suribabu' ? 'selected' : ''}>G. Suribabu</option>
                  <option value="Ch. Narayana" ${arrival.driverName === 'Ch. Narayana' ? 'selected' : ''}>Ch. Narayana</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Vehicle Number</label>
                <select id="edit-arrec-vehicle" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                  <option value="AP 37 TE 8812" ${arrival.vehicleNo === 'AP 37 TE 8812' ? 'selected' : ''}>AP 37 TE 8812</option>
                  <option value="AP 31 XY 4402" ${arrival.vehicleNo === 'AP 31 XY 4402' ? 'selected' : ''}>AP 31 XY 4402</option>
                  <option value="AP 16 TZ 5590" ${arrival.vehicleNo === 'AP 16 TZ 5590' ? 'selected' : ''}>AP 16 TZ 5590</option>
                  <option value="AP 05 AB 1234" ${arrival.vehicleNo === 'AP 05 AB 1234' ? 'selected' : ''}>AP 05 AB 1234</option>
                  <option value="AP 27 BB 9012" ${arrival.vehicleNo === 'AP 27 BB 9012' ? 'selected' : ''}>AP 27 BB 9012</option>
                  <option value="AP 04 TT 5619" ${arrival.vehicleNo === 'AP 04 TT 5619' ? 'selected' : ''}>AP 04 TT 5619</option>
                  <option value="AP 26 TV 1104" ${arrival.vehicleNo === 'AP 26 TV 1104' ? 'selected' : ''}>AP 26 TV 1104</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Harvest Commission</label>
                <input type="text" id="edit-arrec-commission" value="${arrival.harvestCommission || '2.50'}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" />
              </div>
            </div>
          </div>

          <!-- Section 2: Optional Fields -->
          <div>
            <div class="flex items-center justify-between pb-2 mb-3 border-b border-[#EBECF0]">
              <h4 class="text-xs font-bold text-[#5E6C84] uppercase tracking-wider">Optional Fields</h4>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div class="col-span-1 sm:col-span-2 lg:col-span-4">
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Remarks</label>
                <textarea id="edit-arrec-remarks" rows="2" placeholder="Enter Remarks - Optional" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">${arrival.remarks || ''}</textarea>
              </div>
            </div>
          </div>

          <!-- Section 3: Details Section -->
          <div>
            <div class="flex items-center justify-between pb-2 mb-3 border-b border-[#EBECF0]">
              <h4 class="text-xs font-bold text-[#172B4D] uppercase tracking-wider">Details Section</h4>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Total Weight</label>
                <input type="text" id="edit-arrec-total-weight" value="${arrival.totalWeight || arrival.grossWeightKg || 3850}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" />
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Balance Weight</label>
                <input type="text" id="edit-arrec-balance-weight" value="${arrival.balanceWeight || 730}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" />
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Total Value</label>
                <input type="text" id="edit-arrec-total-value" value="${arrival.totalAmt || arrival.totalValue || 1326000}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" />
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Balance Value</label>
                <input type="text" id="edit-arrec-balance-value" value="${arrival.balanceValue || 310250}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" />
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Variety</label>
                <select id="edit-arrec-variety" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                  <option value="HEAD ON" ${!arrival.variety || arrival.variety === 'HEAD ON' ? 'selected' : ''}>HEAD ON</option>
                  <option value="HEADLESS" ${arrival.variety === 'HEADLESS' ? 'selected' : ''}>HEADLESS</option>
                  <option value="EASY PEEL" ${arrival.variety === 'EASY PEEL' ? 'selected' : ''}>EASY PEEL</option>
                  <option value="PUD" ${arrival.variety === 'PUD' ? 'selected' : ''}>PUD</option>
                  <option value="PDTO" ${arrival.variety === 'PDTO' ? 'selected' : ''}>PDTO</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Arrival Count</label>
                <input type="number" id="edit-arrec-arrival-count" value="${(arrival.arrivalCount || arrival.countRange || '').replace(/\D/g, '') || 44}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" />
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Arrival Weight (Kgs)</label>
                <input type="text" id="edit-arrec-arrival-weight" value="${arrival.arrivalWeight || arrival.netCatchKg || 3120}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" />
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Arrival Rate</label>
                <input type="text" id="edit-arrec-arrival-rate" value="${arrival.arrivalRate || arrival.ratePerKg || 425}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" />
              </div>
            </div>
          </div>
        </form>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Update',
          type: 'primary',
          onClick: (m) => {
            arrival.species = document.getElementById('edit-arrec-species').value;
            arrival.center = document.getElementById('edit-arrec-center').value;
            arrival.arrivalPlant = document.getElementById('edit-arrec-plant').value;
            arrival.plant = arrival.arrivalPlant;
            arrival.billDate = document.getElementById('edit-arrec-bill-date').value;
            arrival.arrivalDate = document.getElementById('edit-arrec-arrival-date').value;
            arrival.date = arrival.arrivalDate;
            arrival.supplier = document.getElementById('edit-arrec-supplier').value;
            arrival.agent = document.getElementById('edit-arrec-agent').value;
            arrival.purchaseType = document.getElementById('edit-arrec-purchase-type').value;
            arrival.farmLocation = document.getElementById('edit-arrec-farm-location').value;
            arrival.pond = arrival.farmLocation;
            arrival.graderName = document.getElementById('edit-arrec-grader').value;
            arrival.supervisor = document.getElementById('edit-arrec-supervisor').value;
            arrival.driverName = document.getElementById('edit-arrec-driver').value;
            arrival.vehicleNo = document.getElementById('edit-arrec-vehicle').value;
            arrival.harvestCommission = document.getElementById('edit-arrec-commission').value;
            arrival.remarks = document.getElementById('edit-arrec-remarks').value;

            arrival.totalWeight = parseFloat(document.getElementById('edit-arrec-total-weight').value) || arrival.totalWeight;
            arrival.grossWeightKg = arrival.totalWeight;
            arrival.balanceWeight = parseFloat(document.getElementById('edit-arrec-balance-weight').value) || arrival.balanceWeight;
            arrival.variety = document.getElementById('edit-arrec-variety').value;
            const count = document.getElementById('edit-arrec-arrival-count').value || '44';
            arrival.arrivalCount = `${count} pcs/kg`;
            arrival.countRange = `${count} pcs/kg`;
            arrival.arrivalWeight = parseFloat(document.getElementById('edit-arrec-arrival-weight').value) || arrival.arrivalWeight;
            arrival.netCatchKg = arrival.arrivalWeight;
            arrival.arrivalRate = parseFloat(document.getElementById('edit-arrec-arrival-rate').value) || arrival.arrivalRate;
            arrival.ratePerKg = arrival.arrivalRate;
            arrival.totalAmt = parseFloat(document.getElementById('edit-arrec-total-value').value) || (arrival.arrivalWeight * arrival.arrivalRate);
            arrival.balanceValue = parseFloat(document.getElementById('edit-arrec-balance-value').value) || (arrival.balanceWeight * arrival.arrivalRate);

            if (tableInstance) tableInstance.setData(ERP_DATA.arrivals);
            m.close();

            Modal.success({
              title: 'Arrival Record Updated',
              message: `Inward arrival receipt <strong>${arrival.arrivalNumber || arrival.arrivalCode}</strong> has been updated successfully.`,
              details: [
                { label: 'Arrival Number', value: arrival.arrivalNumber || arrival.arrivalCode },
                { label: 'Procurement Center', value: arrival.center },
                { label: 'Plant', value: arrival.arrivalPlant },
                { label: 'Net Catch Weight', value: `${arrival.arrivalWeight.toLocaleString()} KG` },
                { label: 'Arrival Rate', value: `₹ ${arrival.arrivalRate} / KG` },
                { label: 'Total Amount', value: `₹ ${arrival.totalAmt.toLocaleString()}` }
              ]
            });
            Toast.show(`Arrival ${arrival.arrivalNumber || arrival.arrivalCode} updated successfully.`, 'success');
          }
        }
      ]
    });

    setTimeout(() => {
      const btnNewSup = document.getElementById('btn-quick-new-supplier-edit');
      if (btnNewSup) {
        btnNewSup.addEventListener('click', () => {
          const newName = prompt('Enter New Supplier / Farmer Name:');
          if (newName && newName.trim()) {
            const trimmed = newName.trim();
            const supSelect = document.getElementById('edit-arrec-supplier');
            if (supSelect) {
              const opt = document.createElement('option');
              opt.value = trimmed;
              opt.text = trimmed;
              opt.selected = true;
              supSelect.appendChild(opt);
              if (!ERP_DATA.suppliers.some(s => s.name === trimmed)) {
                ERP_DATA.suppliers.push({ id: `SUP-${Date.now()}`, name: trimmed, region: 'East Coast Aqua' });
              }
              Toast.show(`New supplier "${trimmed}" added and selected.`, 'success');
            }
          }
        });
      }

      const wtInput = document.getElementById('edit-arrec-arrival-weight');
      const rateInput = document.getElementById('edit-arrec-arrival-rate');
      const valInput = document.getElementById('edit-arrec-total-value');
      const balWtInput = document.getElementById('edit-arrec-balance-weight');
      const balValInput = document.getElementById('edit-arrec-balance-value');
      const totWtInput = document.getElementById('edit-arrec-total-weight');

      const recalc = () => {
        const w = parseFloat(wtInput ? wtInput.value : 0) || 0;
        const r = parseFloat(rateInput ? rateInput.value : 0) || 0;
        const bw = parseFloat(balWtInput ? balWtInput.value : 0) || 0;
        if (w > 0 && r > 0 && valInput && !valInput.matches(':focus')) {
          valInput.value = Math.round(w * r);
        }
        if (bw > 0 && r > 0 && balValInput && !balValInput.matches(':focus')) {
          balValInput.value = Math.round(bw * r);
        }
      };

      if (wtInput) wtInput.addEventListener('input', recalc);
      if (rateInput) rateInput.addEventListener('input', recalc);
      if (balWtInput) balWtInput.addEventListener('input', recalc);
      if (totWtInput) {
        totWtInput.addEventListener('input', () => {
          const tw = parseFloat(totWtInput.value) || 0;
          const aw = parseFloat(wtInput ? wtInput.value : 0) || 0;
          if (tw > aw && balWtInput && !balWtInput.matches(':focus')) {
            balWtInput.value = Math.round(tw - aw);
            recalc();
          }
        });
      }
    }, 60);
  },

  showArrivalRecordDetails(arrival) {
    Modal.open({
      title: `Arrival Receipt Details: ${arrival.arrivalCode}`,
      size: 'lg',
      content: `
        <div class="space-y-4 text-xs">
          <div class="p-3 bg-[#FAFBFC] text-[#172B4D] rounded-lg border border-[#DFE1E6] flex flex-wrap items-center justify-between gap-2">
            <div>
              <span class="font-bold text-sm text-[#172B4D]">${arrival.arrivalCode}</span>
              <span class="ml-2 text-xs text-[#5E6C84]">(${arrival.date} • ${arrival.time})</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="lozenge lozenge-success font-bold">${arrival.status}</span>
              <button type="button" id="details-top-edit-arrec" class="px-2.5 py-1 bg-white hover:bg-[#F0F9FF] text-[#0284C7] border border-[#BAE6FD] rounded text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shadow-2xs" title="Edit this catch arrival receipt">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                <span>Edit</span>
              </button>
              <button type="button" id="details-top-delete-arrec" class="px-2.5 py-1 bg-white hover:bg-[#FFEBE6] text-[#BF2600] border border-[#FFBDAD] rounded text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shadow-2xs" title="Delete this catch arrival receipt">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                <span>Delete</span>
              </button>
            </div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="p-2.5 bg-[#FAFBFC] border border-[#EBECF0] rounded">
              <span class="text-[#6B778C] text-[11px] block">Procurement Center</span>
              <span class="font-bold text-[#172B4D]">${arrival.center}</span>
            </div>
            <div class="p-2.5 bg-[#FAFBFC] border border-[#EBECF0] rounded">
              <span class="text-[#6B778C] text-[11px] block">Farmer / Supplier</span>
              <span class="font-bold text-[#172B4D]">${arrival.supplier}</span>
            </div>
            <div class="p-2.5 bg-[#FAFBFC] border border-[#EBECF0] rounded">
              <span class="text-[#6B778C] text-[11px] block">Harvest Source</span>
              <span class="font-bold text-[#172B4D]">${arrival.pond}</span>
            </div>
            <div class="p-2.5 bg-[#FAFBFC] border border-[#EBECF0] rounded">
              <span class="text-[#6B778C] text-[11px] block">Species</span>
              <span class="font-bold text-[#172B4D]">${arrival.species}</span>
            </div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="p-2.5 bg-[#FAFBFC] border border-[#EBECF0] rounded">
              <span class="text-[#6B778C] text-[11px] block">Count / Grade</span>
              <span class="font-bold text-[#172B4D]">${arrival.countRange}</span>
            </div>
            <div class="p-2.5 bg-[#FAFBFC] border border-[#EBECF0] rounded">
              <span class="text-[#6B778C] text-[11px] block">Gross / Tare Wt</span>
              <span class="font-bold text-[#172B4D]">${arrival.grossWeightKg} / ${arrival.tareWeightKg} KG</span>
            </div>
            <div class="p-2.5 bg-[#FAFBFC] border border-[#EBECF0] rounded">
              <span class="text-[#6B778C] text-[11px] block">Ice Weight</span>
              <span class="font-bold text-[#172B4D]">${arrival.iceWeightKg} KG</span>
            </div>
            <div class="p-2.5 bg-[#E3FCEF] border border-[#ABF5D1] rounded">
              <span class="text-[#006644] text-[11px] block">Net Catch Weight</span>
              <span class="font-extrabold text-sm text-[#006644]">${arrival.netCatchKg.toLocaleString()} KG</span>
            </div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="p-2.5 bg-[#FAFBFC] border border-[#EBECF0] rounded">
              <span class="text-[#6B778C] text-[11px] block">Crates (In / Out)</span>
              <span class="font-bold text-[#172B4D]">${arrival.cratesIn} / ${arrival.cratesOut}</span>
            </div>
            <div class="p-2.5 bg-[#FAFBFC] border border-[#EBECF0] rounded">
              <span class="text-[#6B778C] text-[11px] block">Vehicle No</span>
              <span class="font-bold text-[#172B4D]">${arrival.vehicleNo}</span>
            </div>
            <div class="p-2.5 bg-[#FAFBFC] border border-[#EBECF0] rounded">
              <span class="text-[#6B778C] text-[11px] block">Driver</span>
              <span class="font-bold text-[#172B4D]">${arrival.driverName}</span>
            </div>
            <div class="p-2.5 bg-[#FAFBFC] border border-[#EBECF0] rounded">
              <span class="text-[#6B778C] text-[11px] block">Grader / Lead</span>
              <span class="font-bold text-[#172B4D]">${arrival.graderName}</span>
            </div>
          </div>

          <div class="p-2.5 bg-[#FAFBFC] border border-[#EBECF0] rounded">
            <span class="text-[#6B778C] text-[11px] block">Intake Observations & Remarks</span>
            <span class="font-medium text-[#172B4D]">${arrival.remarks}</span>
          </div>
        </div>
      `,
      footerButtons: [
        { label: 'Close', type: 'secondary', onClick: (m) => m.close() },
        { 
          label: 'Delete Record', 
          type: 'destructive', 
          onClick: (m) => { 
            m.close(); 
            PurchaseView.deleteArrivalRecord(arrival, PurchaseView.arrivalRecordsTable); 
          } 
        },
        { 
          label: 'Edit Record', 
          type: 'primary', 
          onClick: (m) => { 
            m.close(); 
            PurchaseView.openEditArrivalRecordModal(arrival, PurchaseView.arrivalRecordsTable); 
          } 
        },
        { 
          label: 'Print Inward Slip', 
          type: 'secondary', 
          onClick: (m) => {
            Toast.show(`Printing Inward Catch Receipt for ${arrival.arrivalCode}...`, 'info');
          } 
        }
      ]
    });

    setTimeout(() => {
      const eb = document.getElementById('details-top-edit-arrec');
      if (eb) eb.addEventListener('click', () => {
        Modal.close();
        PurchaseView.openEditArrivalRecordModal(arrival, PurchaseView.arrivalRecordsTable);
      });
      const db = document.getElementById('details-top-delete-arrec');
      if (db) db.addEventListener('click', () => {
        Modal.close();
        PurchaseView.deleteArrivalRecord(arrival, PurchaseView.arrivalRecordsTable);
      });
    }, 50);
  },

  deleteArrivalRecord(arrival, tableInstance) {
    Modal.confirm({
      title: `Delete Arrival Record ${arrival.arrivalCode}`,
      message: `Are you sure you want to permanently delete inward arrival receipt <strong>${arrival.arrivalCode}</strong> (${arrival.netCatchKg} KG)?`,
      confirmText: 'Delete Record',
      isDestructive: true,
      onConfirm: () => {
        const idx = ERP_DATA.arrivals.findIndex(a => a.id === arrival.id);
        if (idx > -1) {
          ERP_DATA.arrivals.splice(idx, 1);
          if (tableInstance) tableInstance.setData(ERP_DATA.arrivals);

          // Confirmation Popup after delete
          Modal.success({
            title: 'Arrival Record Deleted',
            message: `Inward arrival receipt ${arrival.arrivalCode} has been deleted.`
          });
          Toast.show(`Arrival record ${arrival.arrivalCode} deleted successfully.`, 'success');
        }
      }
    });
  },

  // =========================================================================
  // CRUD MODAL HANDLERS FOR BOOKINGS (NO MANDATORY FIELDS)
  // =========================================================================
  openCreateBookingModal(tableInstance) {
    Modal.open({
      title: 'Create Booking',
      size: 'xl',
      content: `
        <form id="create-booking-form" class="space-y-4 text-xs">
          <!-- General Information Section -->
          <div class="bg-[#FAFBFC] p-3.5 rounded-lg border border-[#DFE1E6] space-y-3">
            <div class="flex items-center justify-between border-b border-[#EBECF0] pb-2">
              <span class="text-xs font-bold text-[#172B4D] uppercase tracking-wider">General Information</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <!-- Booking Station -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  Booking Station
                </label>
                <select id="newbkg-station" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0284C7]">
                  <option value="">-- Select Booking Station --</option>
                  <option value="Bhimavaram Center #1">Bhimavaram Center #1</option>
                  <option value="Kakinada Sea Intake #2">Kakinada Sea Intake #2</option>
                  <option value="Amalapuram Harvesters #4">Amalapuram Harvesters #4</option>
                  <option value="Machilipatnam Delta #3">Machilipatnam Delta #3</option>
                  <option value="Ongole Coastal Hub #1">Ongole Coastal Hub #1</option>
                  <option value="Visakhapatnam Gate Dock">Visakhapatnam Gate Dock</option>
                </select>
              </div>

              <!-- Species -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  Species
                </label>
                <select id="newbkg-species" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0284C7]">
                  <option value="">-- Select Species --</option>
                  <option value="Vannamei Shrimp">Vannamei Shrimp (Litopenaeus vannamei)</option>
                  <option value="Black Tiger Shrimp">Black Tiger Shrimp (Penaeus monodon)</option>
                  <option value="Asian Seabass (Barramundi)">Asian Seabass (Barramundi)</option>
                  <option value="Freshwater Scampi">Freshwater Scampi</option>
                </select>
              </div>

              <!-- Purchase Type -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  Purchase Type
                </label>
                <select id="newbkg-purchasetype" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0284C7]">
                  <option value="">-- Select Purchase Type --</option>
                  <option value="Direct Farmer Procurement">Direct Farmer Procurement</option>
                  <option value="Hatchery Buyback Contract">Hatchery Buyback Contract</option>
                  <option value="Agent Procurement Order">Agent Procurement Order</option>
                  <option value="Corporate Feed-Linked Booking">Corporate Feed-Linked Booking</option>
                  <option value="Spot Market Purchase">Spot Market Purchase</option>
                </select>
              </div>

              <!-- Booking Number -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  Booking Number
                </label>
                <input type="text" id="newbkg-no" value="PB-2026-${Math.floor(100 + Math.random() * 900)}" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg font-bold text-[#172B4D] focus:outline-none focus:border-[#0284C7]" placeholder="e.g. PB-2026-115" />
              </div>

              <!-- Vehicle Number -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  Vehicle Number
                </label>
                <input type="text" id="newbkg-vehno" placeholder="e.g. AP 37 TE 4821" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0284C7]" />
              </div>

              <!-- Driver Name -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  Driver Name
                </label>
                <input type="text" id="newbkg-driver" placeholder="e.g. G. Narayana" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0284C7]" />
              </div>

              <!-- Grader Name -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  Grader Name
                </label>
                <input type="text" id="newbkg-grader" placeholder="e.g. B. Venkatesh" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0284C7]" />
              </div>

              <!-- Booking Date -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  Booking Date
                </label>
                <div class="erp-date-wrapper">
                  <input type="date" id="newbkg-date" value="2026-10-06" class="erp-date-input w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0284C7]" onclick="this.showPicker ? this.showPicker() : this.focus()" />
                </div>
              </div>

              <!-- Farm Location -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  Farm Location
                </label>
                <input type="text" id="newbkg-farmloc" placeholder="e.g. Bhimavaram Cluster #4 / Pond #12" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0284C7]" />
              </div>

              <!-- Suppliers -->
              <div class="sm:col-span-2 lg:col-span-3">
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  Suppliers
                </label>
                <select id="newbkg-supplier" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0284C7]">
                  <option value="">-- Select Supplier / Farmer --</option>
                  <option value="Godavari Coastal Aqua Farms">Godavari Coastal Aqua Farms (Bhimavaram)</option>
                  <option value="Sagar Marine Hatcheries & Cultivators">Sagar Marine Hatcheries & Cultivators (Kakinada)</option>
                  <option value="Krishna Delta Prawn Harvesters">Krishna Delta Prawn Harvesters (Machilipatnam)</option>
                  <option value="Konaseema Marine Harvesters">Konaseema Marine Harvesters (Amalapuram)</option>
                  <option value="Nellore Brackish Aqua Cultivators">Nellore Brackish Aqua Cultivators (Nellore)</option>
                  <option value="East Coast Aqua Society">East Coast Aqua Society (Visakhapatnam)</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Optional Fields Section -->
          <div class="bg-white p-3.5 rounded-lg border border-[#DFE1E6] space-y-3">
            <div class="flex items-center justify-between border-b border-[#EBECF0] pb-2">
              <span class="text-xs font-bold text-[#5E6C84] uppercase tracking-wider">Agent & Remarks</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <!-- Agent Name -->
              <div>
                <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">
                  Agent Name
                </label>
                <input type="text" id="newbkg-agent" placeholder="e.g. Coastal Marine Agency / Direct" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0284C7]" />
              </div>

              <!-- Remarks -->
              <div>
                <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">
                  Remarks
                </label>
                <textarea id="newbkg-remarks" rows="2" placeholder="e.g. Harvest scheduled for 4:00 AM, ice boxes ready..." class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0284C7]"></textarea>
              </div>
            </div>
          </div>

          <!-- Booking Details Sub-Section -->
          <div class="bg-[#F4F5F7] p-3.5 rounded-lg border border-[#DFE1E6] space-y-3">
            <div class="flex items-center justify-between border-b border-[#DFE1E6] pb-2">
              <span class="text-xs font-bold text-[#172B4D] uppercase tracking-wider">Booking Details</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <!-- Booking Count -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  Booking Count
                </label>
                <input type="text" id="newbkg-count" placeholder="e.g. 40 Count (30-40 pcs/kg)" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg font-bold text-[#172B4D] focus:outline-none focus:border-[#0284C7]" />
              </div>

              <!-- Booking Weight (Kgs) -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  Booking Weight (Kgs)
                </label>
                <input type="number" id="newbkg-weight" placeholder="e.g. 3500" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg font-extrabold text-[#006644] focus:outline-none focus:border-[#0284C7]" />
              </div>

              <!-- Booking Rate -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  Booking Rate (₹ / KG)
                </label>
                <input type="number" id="newbkg-rate" placeholder="e.g. 440" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg font-extrabold text-[#172B4D] focus:outline-none focus:border-[#0284C7]" />
              </div>
            </div>
          </div>
        </form>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Save',
          type: 'primary',
          onClick: (m) => {
            const station = document.getElementById('newbkg-station')?.value?.trim() || 'Bhimavaram Center #1';
            const species = document.getElementById('newbkg-species')?.value?.trim() || 'Vannamei Shrimp';
            const purchaseType = document.getElementById('newbkg-purchasetype')?.value?.trim() || 'Direct Farmer Procurement';
            const bookingNo = document.getElementById('newbkg-no')?.value?.trim() || (`PB-2026-${Math.floor(100 + Math.random() * 900)}`);
            const vehicleNo = document.getElementById('newbkg-vehno')?.value?.trim() || 'AP 37 TE 4821';
            const driverName = document.getElementById('newbkg-driver')?.value?.trim() || 'G. Narayana';
            const graderName = document.getElementById('newbkg-grader')?.value?.trim() || 'B. Venkatesh';
            const bookingDate = document.getElementById('newbkg-date')?.value?.trim() || new Date().toISOString().split('T')[0];
            const farmLocation = document.getElementById('newbkg-farmloc')?.value?.trim() || 'Bhimavaram Cluster #4';
            const supplier = document.getElementById('newbkg-supplier')?.value?.trim() || 'Godavari Coastal Aqua Farms';

            const agent = document.getElementById('newbkg-agent')?.value?.trim() || 'Direct';
            const remarks = document.getElementById('newbkg-remarks')?.value?.trim() || '';

            const bookingCount = document.getElementById('newbkg-count')?.value?.trim() || '40 Count';
            const bookingWeight = parseFloat(document.getElementById('newbkg-weight')?.value) || 0;
            const bookingRate = parseFloat(document.getElementById('newbkg-rate')?.value) || 0;

            const mappedPlant = station.includes('Bhimavaram') ? 'DFL UNIT-5 (JPT)' :
                               station.includes('Kakinada') ? 'DFL UNIT-3 (PSP)' :
                               station.includes('Amalapuram') ? 'DFL UNIT-6 (JPT-II)' :
                               station.includes('Machilipatnam') ? 'DFL UNIT-4 (PND)' :
                               station.includes('Visakhapatnam') ? 'DFL UNIT-1 (VSP)' : 'DFL UNIT-2 (KKD)';

            const newBooking = {
              sNo: PurchaseView.bookingsList.length + 1,
              bookingStation: station,
              species: species,
              purchaseType: purchaseType,
              bookingNo: bookingNo,
              vehicleNo: vehicleNo,
              driverName: driverName,
              grader: graderName,
              bookingDate: bookingDate,
              farmLocation: farmLocation,
              pond: farmLocation,
              supplier: supplier,
              agent: agent,
              remarks: remarks,
              bookingCount: bookingCount,
              bookingWeight: bookingWeight,
              bookedQty: bookingWeight,
              bookingRate: bookingRate,
              arrivalPlant: mappedPlant,
              expectedDate: bookingDate,
              advancePaid: '$ 0',
              status: 'CONFIRMED'
            };

            PurchaseView.bookingsList.unshift(newBooking);

            // Re-assign S.No
            PurchaseView.bookingsList.forEach((b, idx) => {
              b.sNo = idx + 1;
            });

            if (tableInstance) tableInstance.setData(PurchaseView.bookingsList);
            m.close();

            // Confirmation Popup after save
            Modal.success({
              title: 'Booking Saved Successfully',
              message: `Pre-harvest booking ${newBooking.bookingNo} has been saved and registered in the system.`,
              details: [
                { label: 'Booking Number', value: newBooking.bookingNo },
                { label: 'Species', value: newBooking.species },
                { label: 'Purchase Type', value: newBooking.purchaseType },
                { label: 'Booking Station', value: newBooking.bookingStation },
                { label: 'Booking Weight', value: `${newBooking.bookingWeight.toLocaleString()} KG` },
                { label: 'Booking Rate', value: `₹ ${newBooking.bookingRate} / KG` }
              ]
            });
            Toast.show(`Booking ${newBooking.bookingNo} saved successfully.`, 'success', 'Booking Created');
          }
        }
      ]
    });
  },

  openEditBookingModal(booking, tableInstance) {
    Modal.open({
      title: `Edit Booking: ${booking.bookingNo}`,
      size: 'xl',
      content: `
        <form id="edit-booking-form" class="space-y-4 text-xs">
          <!-- General Information Section -->
          <div class="bg-[#FAFBFC] p-3.5 rounded-lg border border-[#DFE1E6] space-y-3">
            <div class="flex items-center justify-between border-b border-[#EBECF0] pb-2">
              <span class="text-xs font-bold text-[#172B4D] uppercase tracking-wider">General Information</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <!-- Booking Station -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  Booking Station
                </label>
                <select id="editbkg-station" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0284C7]">
                  <option value="Bhimavaram Center #1" ${booking.bookingStation === 'Bhimavaram Center #1' || (booking.arrivalPlant && booking.arrivalPlant.includes('UNIT-5')) ? 'selected' : ''}>Bhimavaram Center #1</option>
                  <option value="Kakinada Sea Intake #2" ${booking.bookingStation === 'Kakinada Sea Intake #2' || (booking.arrivalPlant && booking.arrivalPlant.includes('UNIT-3')) ? 'selected' : ''}>Kakinada Sea Intake #2</option>
                  <option value="Amalapuram Harvesters #4" ${booking.bookingStation === 'Amalapuram Harvesters #4' || (booking.arrivalPlant && booking.arrivalPlant.includes('UNIT-6')) ? 'selected' : ''}>Amalapuram Harvesters #4</option>
                  <option value="Machilipatnam Delta #3" ${booking.bookingStation === 'Machilipatnam Delta #3' || (booking.arrivalPlant && booking.arrivalPlant.includes('UNIT-4')) ? 'selected' : ''}>Machilipatnam Delta #3</option>
                  <option value="Ongole Coastal Hub #1" ${booking.bookingStation === 'Ongole Coastal Hub #1' || (booking.arrivalPlant && booking.arrivalPlant.includes('UNIT-2')) ? 'selected' : ''}>Ongole Coastal Hub #1</option>
                  <option value="Visakhapatnam Gate Dock" ${booking.bookingStation === 'Visakhapatnam Gate Dock' || (booking.arrivalPlant && booking.arrivalPlant.includes('UNIT-1')) ? 'selected' : ''}>Visakhapatnam Gate Dock</option>
                </select>
              </div>

              <!-- Species -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  Species
                </label>
                <select id="editbkg-species" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0284C7]">
                  <option value="Vannamei Shrimp" ${booking.species && booking.species.includes('Vannamei') ? 'selected' : ''}>Vannamei Shrimp (Litopenaeus vannamei)</option>
                  <option value="Black Tiger Shrimp" ${booking.species && booking.species.includes('Black Tiger') ? 'selected' : ''}>Black Tiger Shrimp (Penaeus monodon)</option>
                  <option value="Asian Seabass (Barramundi)" ${booking.species && booking.species.includes('Asian Seabass') ? 'selected' : ''}>Asian Seabass (Barramundi)</option>
                  <option value="Freshwater Scampi" ${booking.species && booking.species.includes('Scampi') ? 'selected' : ''}>Freshwater Scampi</option>
                </select>
              </div>

              <!-- Purchase Type -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  Purchase Type
                </label>
                <select id="editbkg-purchasetype" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0284C7]">
                  <option value="Direct Farmer Procurement" ${booking.purchaseType === 'Direct Farmer Procurement' ? 'selected' : ''}>Direct Farmer Procurement</option>
                  <option value="Hatchery Buyback Contract" ${booking.purchaseType === 'Hatchery Buyback Contract' ? 'selected' : ''}>Hatchery Buyback Contract</option>
                  <option value="Agent Procurement Order" ${booking.purchaseType === 'Agent Procurement Order' ? 'selected' : ''}>Agent Procurement Order</option>
                  <option value="Corporate Feed-Linked Booking" ${booking.purchaseType === 'Corporate Feed-Linked Booking' ? 'selected' : ''}>Corporate Feed-Linked Booking</option>
                  <option value="Spot Market Purchase" ${booking.purchaseType === 'Spot Market Purchase' ? 'selected' : ''}>Spot Market Purchase</option>
                </select>
              </div>

              <!-- Booking Number -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  Booking Number
                </label>
                <input type="text" id="editbkg-no" value="${booking.bookingNo}" readonly class="w-full text-xs px-2.5 py-2 bg-[#EBECF0] border border-[#DFE1E6] rounded-lg font-bold text-[#172B4D]" />
              </div>

              <!-- Vehicle Number -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  Vehicle Number
                </label>
                <input type="text" id="editbkg-vehno" value="${booking.vehicleNo || 'AP 37 TE 4821'}" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0284C7]" />
              </div>

              <!-- Driver Name -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  Driver Name
                </label>
                <input type="text" id="editbkg-driver" value="${booking.driverName || 'G. Narayana'}" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0284C7]" />
              </div>

              <!-- Grader Name -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  Grader Name
                </label>
                <input type="text" id="editbkg-grader" value="${booking.grader || 'B. Venkatesh'}" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0284C7]" />
              </div>

              <!-- Booking Date -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  Booking Date
                </label>
                <div class="erp-date-wrapper">
                  <input type="date" id="editbkg-date" value="${(booking.bookingDate || booking.expectedDate || '2026-10-06').includes('/') ? (booking.bookingDate || booking.expectedDate).split('/').reverse().join('-') : (booking.bookingDate || booking.expectedDate || '2026-10-06')}" class="erp-date-input w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0284C7]" onclick="this.showPicker ? this.showPicker() : this.focus()" />
                </div>
              </div>

              <!-- Farm Location -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  Farm Location
                </label>
                <input type="text" id="editbkg-farmloc" value="${booking.farmLocation || booking.pond || 'Bhimavaram Cluster #4'}" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0284C7]" />
              </div>

              <!-- Suppliers -->
              <div class="sm:col-span-2 lg:col-span-3">
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  Suppliers
                </label>
                <select id="editbkg-supplier" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0284C7]">
                  <option value="Godavari Coastal Aqua Farms" ${booking.supplier && booking.supplier.includes('Godavari') ? 'selected' : ''}>Godavari Coastal Aqua Farms (Bhimavaram)</option>
                  <option value="Sagar Marine Hatcheries & Cultivators" ${booking.supplier && booking.supplier.includes('Sagar') ? 'selected' : ''}>Sagar Marine Hatcheries & Cultivators (Kakinada)</option>
                  <option value="Krishna Delta Prawn Harvesters" ${booking.supplier && booking.supplier.includes('Krishna') ? 'selected' : ''}>Krishna Delta Prawn Harvesters (Machilipatnam)</option>
                  <option value="Konaseema Marine Harvesters" ${booking.supplier && booking.supplier.includes('Konaseema') ? 'selected' : ''}>Konaseema Marine Harvesters (Amalapuram)</option>
                  <option value="Nellore Brackish Aqua Cultivators" ${booking.supplier && booking.supplier.includes('Nellore') ? 'selected' : ''}>Nellore Brackish Aqua Cultivators (Nellore)</option>
                  <option value="East Coast Aqua Society" ${booking.supplier && booking.supplier.includes('East Coast') ? 'selected' : ''}>East Coast Aqua Society (Visakhapatnam)</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Optional Fields Section -->
          <div class="bg-white p-3.5 rounded-lg border border-[#DFE1E6] space-y-3">
            <div class="flex items-center justify-between border-b border-[#EBECF0] pb-2">
              <span class="text-xs font-bold text-[#5E6C84] uppercase tracking-wider">Agent & Remarks</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <!-- Agent Name -->
              <div>
                <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">
                  Agent Name
                </label>
                <input type="text" id="editbkg-agent" value="${booking.agent || ''}" placeholder="e.g. Coastal Marine Agency" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0284C7]" />
              </div>

              <!-- Remarks -->
              <div>
                <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">
                  Remarks
                </label>
                <textarea id="editbkg-remarks" rows="2" placeholder="e.g. Harvest notes..." class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0284C7]">${booking.remarks || ''}</textarea>
              </div>
            </div>
          </div>

          <!-- Booking Details Sub-Section -->
          <div class="bg-[#F4F5F7] p-3.5 rounded-lg border border-[#DFE1E6] space-y-3">
            <div class="flex items-center justify-between border-b border-[#DFE1E6] pb-2">
              <span class="text-xs font-bold text-[#172B4D] uppercase tracking-wider">Booking Details</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <!-- Booking Count -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  Booking Count
                </label>
                <input type="text" id="editbkg-count" value="${booking.bookingCount || '40 Count'}" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg font-bold text-[#172B4D] focus:outline-none focus:border-[#0284C7]" />
              </div>

              <!-- Booking Weight (Kgs) -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  Booking Weight (Kgs)
                </label>
                <input type="number" id="editbkg-weight" value="${booking.bookingWeight || booking.bookedQty || 0}" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg font-extrabold text-[#006644] focus:outline-none focus:border-[#0284C7]" />
              </div>

              <!-- Booking Rate -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  Booking Rate (₹ / KG)
                </label>
                <input type="number" id="editbkg-rate" value="${booking.bookingRate || 420}" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg font-extrabold text-[#172B4D] focus:outline-none focus:border-[#0284C7]" />
              </div>
            </div>
          </div>
        </form>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Update',
          type: 'primary',
          onClick: (m) => {
            const station = document.getElementById('editbkg-station')?.value?.trim() || booking.bookingStation;
            const species = document.getElementById('editbkg-species')?.value?.trim() || booking.species;
            const purchaseType = document.getElementById('editbkg-purchasetype')?.value?.trim() || booking.purchaseType;
            const vehicleNo = document.getElementById('editbkg-vehno')?.value?.trim() || booking.vehicleNo;
            const driverName = document.getElementById('editbkg-driver')?.value?.trim() || booking.driverName;
            const graderName = document.getElementById('editbkg-grader')?.value?.trim() || booking.grader;
            const bookingDate = document.getElementById('editbkg-date')?.value?.trim() || booking.bookingDate;
            const farmLocation = document.getElementById('editbkg-farmloc')?.value?.trim() || booking.farmLocation;
            const supplier = document.getElementById('editbkg-supplier')?.value?.trim() || booking.supplier;

            const agent = document.getElementById('editbkg-agent')?.value?.trim() || booking.agent || 'Direct';
            const remarks = document.getElementById('editbkg-remarks')?.value?.trim() || booking.remarks || '';

            const bookingCount = document.getElementById('editbkg-count')?.value?.trim() || booking.bookingCount;
            const bookingWeight = parseFloat(document.getElementById('editbkg-weight')?.value) || booking.bookingWeight;
            const bookingRate = parseFloat(document.getElementById('editbkg-rate')?.value) || booking.bookingRate;

            booking.bookingStation = station;
            booking.species = species;
            booking.purchaseType = purchaseType;
            booking.vehicleNo = vehicleNo;
            booking.driverName = driverName;
            booking.grader = graderName;
            booking.bookingDate = bookingDate;
            booking.expectedDate = bookingDate;
            booking.farmLocation = farmLocation;
            booking.pond = farmLocation;
            booking.supplier = supplier;
            booking.agent = agent;
            booking.remarks = remarks;
            booking.bookingCount = bookingCount;
            booking.bookingWeight = bookingWeight;
            booking.bookedQty = bookingWeight;
            booking.bookingRate = bookingRate;

            if (tableInstance) tableInstance.setData(PurchaseView.bookingsList);
            m.close();

            // Confirmation Popup after edit
            Modal.success({
              title: 'Booking Updated Successfully',
              message: `All changes to Booking ${booking.bookingNo} have been successfully saved.`,
              details: [
                { label: 'Booking Number', value: booking.bookingNo },
                { label: 'Species', value: booking.species },
                { label: 'Booking Weight', value: `${booking.bookingWeight.toLocaleString()} KG` },
                { label: 'Booking Rate', value: `₹ ${booking.bookingRate} / KG` }
              ]
            });
            Toast.show(`Booking ${booking.bookingNo} updated successfully.`, 'success');
          }
        }
      ]
    });
  },

  showBookingDetails(booking) {
    Modal.open({
      title: `Booking Agreement Details: ${booking.bookingNo}`,
      size: 'lg',
      content: `
        <div class="space-y-4 text-xs">
          <div class="p-3 bg-[#FAFBFC] text-[#172B4D] rounded-lg border border-[#DFE1E6] flex flex-wrap items-center justify-between gap-2">
            <div>
              <span class="font-bold text-sm text-[#172B4D]">${booking.bookingNo}</span>
              <span class="ml-2 text-xs text-[#5E6C84]">(${booking.bookingDate || booking.expectedDate} • ${booking.purchaseType || 'Direct Farmer Procurement'})</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="lozenge lozenge-success font-bold">${booking.status || 'CONFIRMED'}</span>
              <button type="button" id="details-top-edit-booking" class="px-2.5 py-1 bg-white hover:bg-[#F0F9FF] text-[#0284C7] border border-[#BAE6FD] rounded text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shadow-2xs" title="Edit this booking agreement">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                <span>Edit</span>
              </button>
              <button type="button" id="details-top-delete-booking" class="px-2.5 py-1 bg-white hover:bg-[#FFEBE6] text-[#BF2600] border border-[#FFBDAD] rounded text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shadow-2xs" title="Delete this booking agreement">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                <span>Delete</span>
              </button>
            </div>
          </div>

          <!-- Required Fields Summary -->
          <div class="bg-[#FAFBFC] p-3 rounded-lg border border-[#DFE1E6] space-y-2">
            <h4 class="font-bold text-xs text-[#172B4D] pb-1">Booking Information</h4>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <div>
                <span class="text-[#6B778C] text-[10px] uppercase font-bold block">Booking Station</span>
                <span class="font-bold text-[#172B4D]">${booking.bookingStation || booking.arrivalPlant || 'Bhimavaram Center #1'}</span>
              </div>
              <div>
                <span class="text-[#6B778C] text-[10px] uppercase font-bold block">Species</span>
                <span class="font-bold text-[#172B4D]">${booking.species}</span>
              </div>
              <div>
                <span class="text-[#6B778C] text-[10px] uppercase font-bold block">Purchase Type</span>
                <span class="font-medium text-[#172B4D]">${booking.purchaseType}</span>
              </div>
              <div>
                <span class="text-[#6B778C] text-[10px] uppercase font-bold block">Booking Number</span>
                <span class="font-bold text-[#172B4D]">${booking.bookingNo}</span>
              </div>
              <div>
                <span class="text-[#6B778C] text-[10px] uppercase font-bold block">Vehicle Number</span>
                <span class="font-bold text-[#172B4D]">${booking.vehicleNo || 'AP 37 TE 4821'}</span>
              </div>
              <div>
                <span class="text-[#6B778C] text-[10px] uppercase font-bold block">Driver Name</span>
                <span class="font-medium text-[#172B4D]">${booking.driverName || 'G. Narayana'}</span>
              </div>
              <div>
                <span class="text-[#6B778C] text-[10px] uppercase font-bold block">Grader Name</span>
                <span class="font-bold text-[#172B4D]">${booking.grader || 'B. Venkatesh'}</span>
              </div>
              <div>
                <span class="text-[#6B778C] text-[10px] uppercase font-bold block">Booking Date</span>
                <span class="font-medium text-[#172B4D]">${booking.bookingDate || booking.expectedDate}</span>
              </div>
              <div>
                <span class="text-[#6B778C] text-[10px] uppercase font-bold block">Farm Location</span>
                <span class="font-medium text-[#172B4D]">${booking.farmLocation || booking.pond || 'Bhimavaram Cluster #4'}</span>
              </div>
              <div class="sm:col-span-3">
                <span class="text-[#6B778C] text-[10px] uppercase font-bold block">Suppliers</span>
                <span class="font-bold text-[#172B4D]">${booking.supplier || 'Godavari Coastal Aqua Farms'}</span>
              </div>
            </div>
          </div>

          <!-- Optional Fields Summary -->
          <div class="bg-white p-3 rounded-lg border border-[#DFE1E6] space-y-2">
            <h4 class="font-bold text-xs text-[#5E6C84] pb-1">Agent & Remarks</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <span class="text-[#6B778C] text-[10px] uppercase font-bold block">Agent Name</span>
                <span class="font-medium text-[#172B4D]">${booking.agent || 'Direct'}</span>
              </div>
              <div>
                <span class="text-[#6B778C] text-[10px] uppercase font-bold block">Remarks</span>
                <span class="font-medium text-[#172B4D]">${booking.remarks || 'Standard procurement contract.'}</span>
              </div>
            </div>
          </div>

          <!-- Booking Details Section -->
          <div class="bg-[#F4F5F7] p-3 rounded-lg border border-[#DFE1E6] space-y-2">
            <h4 class="font-bold text-xs text-[#172B4D] pb-1">Booking Details</h4>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div class="p-2 bg-white rounded border border-[#DFE1E6]">
                <span class="text-[#6B778C] text-[10px] uppercase font-bold block">Booking Count</span>
                <span class="font-bold text-sm text-[#172B4D]">${booking.bookingCount || '40 Count'}</span>
              </div>
              <div class="p-2 bg-white rounded border border-[#DFE1E6]">
                <span class="text-[#6B778C] text-[10px] uppercase font-bold block">Booking Weight</span>
                <span class="font-extrabold text-sm text-[#006644]">${(booking.bookingWeight || booking.bookedQty || 0).toLocaleString()} KG</span>
              </div>
              <div class="p-2 bg-white rounded border border-[#DFE1E6]">
                <span class="text-[#6B778C] text-[10px] uppercase font-bold block">Booking Rate</span>
                <span class="font-extrabold text-sm text-[#172B4D]">₹ ${booking.bookingRate || 420} / KG</span>
              </div>
            </div>
          </div>
        </div>
      `,
      footerButtons: [
        { label: 'Close', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Delete Booking',
          type: 'destructive',
          onClick: (m) => {
            m.close();
            PurchaseView.deleteBooking(booking, PurchaseView.bookingsTable);
          }
        },
        {
          label: 'Edit Booking',
          type: 'primary',
          onClick: (m) => {
            m.close();
            PurchaseView.openEditBookingModal(booking, PurchaseView.bookingsTable);
          }
        },
        {
          label: 'Print Booking Slip',
          type: 'secondary',
          onClick: (m) => {
            Toast.show(`Printing Booking Slip for ${booking.bookingNo}...`, 'info');
          }
        }
      ]
    });

    setTimeout(() => {
      const eb = document.getElementById('details-top-edit-booking');
      if (eb) eb.addEventListener('click', () => {
        Modal.close();
        PurchaseView.openEditBookingModal(booking, PurchaseView.bookingsTable);
      });
      const db = document.getElementById('details-top-delete-booking');
      if (db) db.addEventListener('click', () => {
        Modal.close();
        PurchaseView.deleteBooking(booking, PurchaseView.bookingsTable);
      });
    }, 50);
  },

  deleteBooking(booking, tableInstance) {
    Modal.confirm({
      title: `Delete Booking ${booking.bookingNo}`,
      message: `Are you sure you want to cancel and delete Booking <strong>${booking.bookingNo}</strong>?`,
      confirmText: 'Delete Booking',
      isDestructive: true,
      onConfirm: () => {
        const idx = PurchaseView.bookingsList.findIndex(b => b.bookingNo === booking.bookingNo);
        if (idx > -1) {
          PurchaseView.bookingsList.splice(idx, 1);
          PurchaseView.bookingsList.forEach((b, i) => { b.sNo = i + 1; });
          if (tableInstance) tableInstance.setData(PurchaseView.bookingsList);

          // Confirmation Popup after delete
          Modal.success({
            title: 'Booking Deleted Successfully',
            message: `Booking agreement ${booking.bookingNo} has been removed from the registry.`
          });
          Toast.show(`Booking ${booking.bookingNo} removed.`, 'success');
        }
      }
    });
  },

  // =========================================================================
  // CRUD MODAL HANDLERS FOR SUPPLIER BILLS
  // =========================================================================
  openCreateBillModal(tableInstance) {
    Modal.open({
      title: 'Generate New Supplier Commercial Bill',
      size: 'md',
      content: `
        <form class="space-y-3">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Bill Number</label>
              <input type="text" id="newbill-no" value="BILL-2026-${Math.floor(120 + Math.random() * 800)}" readonly class="w-full text-xs  px-3 py-1.5 bg-[#EBECF0] border border-[#DFE1E6] rounded" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Due Date</label>
              <div class="erp-date-wrapper">
                <input type="date" id="newbill-due" value="2026-10-25" class="erp-date-input w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" onclick="this.showPicker ? this.showPicker() : this.focus()" />
              </div>
            </div>
          </div>
          <div>
            <label class="block text-xs font-semibold text-[#172B4D] mb-1">Supplier</label>
            <select id="newbill-sup" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded">
              ${ERP_DATA.suppliers.map(s => `<option value="${s.name}">${s.name}</option>`).join('')}
            </select>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Linked Lot</label>
              <select id="newbill-lot" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded ">
                ${ERP_DATA.lots.map(l => `<option value="${l.lotNumber}">${l.lotNumber}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Net Weight (KG)</label>
              <input type="number" id="newbill-wt" value="2500" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded " />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Rate per KG (INR)</label>
              <input type="number" id="newbill-rate" value="385" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded " />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Status</label>
              <select id="newbill-status" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded">
                <option value="PENDING_PAYMENT">PENDING_PAYMENT</option>
                <option value="PARTIALLY_PAID">PARTIALLY_PAID</option>
                <option value="PAID">PAID</option>
              </select>
            </div>
          </div>
        </form>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Create Bill',
          type: 'primary',
          onClick: (m) => {
            const no = document.getElementById('newbill-no').value;
            const due = document.getElementById('newbill-due').value;
            const sup = document.getElementById('newbill-sup').value;
            const lot = document.getElementById('newbill-lot').value;
            const wt = parseFloat(document.getElementById('newbill-wt').value) || 2000;
            const rate = parseFloat(document.getElementById('newbill-rate').value) || 380;
            const stat = document.getElementById('newbill-status').value;
            const inr = wt * rate;
            const usd = Math.round(inr / 83);

            const newB = {
              billNo: no,
              supplierName: sup,
              lotNumber: lot,
              weightKg: wt,
              ratePerKg: rate,
              totalAmountInr: inr,
              totalAmountUsd: usd,
              billDate: new Date().toISOString().substring(0, 10),
              dueDate: due,
              status: stat
            };

            ERP_DATA.supplierBills.unshift(newB);
            if (tableInstance) tableInstance.setData(ERP_DATA.supplierBills);
            m.close();
            Toast.show(`Supplier Bill ${newB.billNo} generated.`, 'success');
          }
        }
      ]
    });
  },

  openEditBillModal(bill, tableInstance) {
    Modal.open({
      title: `Edit Bill: ${bill.billNo}`,
      size: 'md',
      content: `
        <form class="space-y-3">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Rate per KG (INR)</label>
              <input type="number" id="editbill-rate" value="${bill.ratePerKg}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded " />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Status</label>
              <select id="editbill-status" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded">
                <option value="PENDING_PAYMENT" ${bill.status === 'PENDING_PAYMENT' ? 'selected' : ''}>PENDING_PAYMENT</option>
                <option value="PARTIALLY_PAID" ${bill.status === 'PARTIALLY_PAID' ? 'selected' : ''}>PARTIALLY_PAID</option>
                <option value="PAID" ${bill.status === 'PAID' ? 'selected' : ''}>PAID</option>
              </select>
            </div>
          </div>
        </form>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Update',
          type: 'primary',
          onClick: (m) => {
            const r = parseFloat(document.getElementById('editbill-rate').value) || bill.ratePerKg;
            bill.ratePerKg = r;
            bill.totalAmountInr = bill.weightKg * r;
            bill.totalAmountUsd = Math.round(bill.totalAmountInr / 83);
            bill.status = document.getElementById('editbill-status').value;

            if (tableInstance) tableInstance.setData(ERP_DATA.supplierBills);
            m.close();
            Toast.show(`Bill ${bill.billNo} updated.`, 'success');
          }
        }
      ]
    });
  },

  deleteBill(bill, tableInstance) {
    Modal.confirm({
      title: `Delete Bill ${bill.billNo}`,
      message: `Are you sure you want to delete Bill <strong>${bill.billNo}</strong>?`,
      confirmText: 'Delete Bill',
      isDestructive: true,
      onConfirm: () => {
        const idx = ERP_DATA.supplierBills.findIndex(b => b.billNo === bill.billNo);
        if (idx > -1) {
          ERP_DATA.supplierBills.splice(idx, 1);
          if (tableInstance) tableInstance.setData(ERP_DATA.supplierBills);
          Toast.show(`Bill ${bill.billNo} deleted.`, 'success');
        }
      }
    });
  },

  // =========================================================================
  // CRUD MODAL HANDLERS FOR COMMERCIAL PRICE BENCHMARKS
  // =========================================================================
  openCreateCommercialRateModal(tableInstance) {
    Modal.open({
      title: 'Add Commercial Price Benchmark',
      size: 'md',
      content: `
        <form class="space-y-3">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Species</label>
              <select id="newrate-spec" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded">
                ${ERP_DATA.species.map(s => `<option value="${s.name}">${s.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Count / Grade</label>
              <input type="text" id="newrate-count" value="31/40 pcs/lb" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded " />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Rate (INR / KG)</label>
              <input type="number" id="newrate-inr" value="350" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded " />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Rate (USD / KG)</label>
              <input type="number" step="0.05" id="newrate-usd" value="4.25" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded " />
            </div>
          </div>
        </form>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Save Benchmark',
          type: 'primary',
          onClick: (m) => {
            const spec = document.getElementById('newrate-spec').value;
            const count = document.getElementById('newrate-count').value;
            const inr = parseFloat(document.getElementById('newrate-inr').value) || 350;
            const usd = parseFloat(document.getElementById('newrate-usd').value) || 4.25;

            const newRate = {
              id: `CR-0${PurchaseView.commercialRates.length + 1}`,
              species: spec,
              count: count,
              rateInr: inr,
              rateUsd: usd,
              effectiveDate: new Date().toISOString().substring(0, 10),
              status: 'ACTIVE'
            };

            PurchaseView.commercialRates.push(newRate);
            if (tableInstance) tableInstance.setData(PurchaseView.commercialRates);
            m.close();
            Toast.show(`Price benchmark for ${spec} (${count}) added.`, 'success');
          }
        }
      ]
    });
  },

  openEditCommercialRateModal(rate, tableInstance) {
    Modal.open({
      title: `Edit Price Benchmark: ${rate.id}`,
      size: 'md',
      content: `
        <form class="space-y-3">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Rate (INR / KG)</label>
              <input type="number" id="editrate-inr" value="${rate.rateInr}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded " />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Rate (USD / KG)</label>
              <input type="number" step="0.05" id="editrate-usd" value="${rate.rateUsd}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded " />
            </div>
          </div>
        </form>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Update',
          type: 'primary',
          onClick: (m) => {
            rate.rateInr = parseFloat(document.getElementById('editrate-inr').value) || rate.rateInr;
            rate.rateUsd = parseFloat(document.getElementById('editrate-usd').value) || rate.rateUsd;

            if (tableInstance) tableInstance.setData(PurchaseView.commercialRates);
            m.close();
            Toast.show(`Price benchmark ${rate.id} updated.`, 'success');
          }
        }
      ]
    });
  },

  deleteCommercialRate(rate, tableInstance) {
    Modal.confirm({
      title: `Delete Price Benchmark ${rate.id}`,
      message: `Are you sure you want to delete the benchmark for ${rate.species} (${rate.count})?`,
      confirmText: 'Delete Benchmark',
      isDestructive: true,
      onConfirm: () => {
        const idx = PurchaseView.commercialRates.findIndex(r => r.id === rate.id);
        if (idx > -1) {
          PurchaseView.commercialRates.splice(idx, 1);
          if (tableInstance) tableInstance.setData(PurchaseView.commercialRates);
          Toast.show(`Benchmark ${rate.id} removed.`, 'success');
        }
      }
    });
  },

  // =========================================================================
  // TRACEABILITY & ARRIVAL DETAILS DRAWERS
  // =========================================================================
  showLotTraceabilityDrawer(lot) {
    const content = `
      <div class="space-y-6">
        <!-- Lot Summary Header Card -->
        <div class="bg-[#FAFBFC] border border-[#DFE1E6] rounded-lg p-4">
          <div class="flex items-start justify-between">
            <div>
              <span class="text-xs  font-bold text-[#17191c]">${lot.lotNumber}</span>
              <h2 class="text-lg font-bold text-[#172B4D] mt-0.5">${lot.species} (${lot.variety})</h2>
              <p class="text-xs text-[#5E6C84] mt-0.5">${lot.supplierName} • Landing: ${lot.landingSource}</p>
            </div>
            <span class="lozenge lozenge-success">${lot.lotStatus}</span>
          </div>

          <!-- Quantitative Mass Balance Pipeline Card -->
          <div class="mt-4 pt-3 border-t border-[#DFE1E6] bg-white p-3 rounded border border-[#EBECF0]">
            <span class="text-[11px] font-bold text-[#172B4D] uppercase tracking-wider block mb-2">Quantitative Mass-Balance Audit (KG)</span>
            <div class="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-xs">
              <div class="bg-[#F4F5F7] p-2 rounded">
                <div class="text-[10px] text-[#6B778C]">RM Received</div>
                <div class="font-bold  text-[#172B4D] mt-0.5">${lot.receivedQtyKg.toLocaleString()} KG</div>
              </div>
              <div class="bg-[#E3FCEF] p-2 rounded">
                <div class="text-[10px] text-[#006644]">QC Accepted</div>
                <div class="font-bold  text-[#006644] mt-0.5">${lot.qcAcceptedQtyKg.toLocaleString()} KG</div>
              </div>
              <div class="bg-[#F0F9FF] p-2 rounded">
                <div class="text-[10px] text-[#0369A1]">Pre-Processed</div>
                <div class="font-bold  text-[#0369A1] mt-0.5">${lot.preProcessedQtyKg.toLocaleString()} KG</div>
              </div>
              <div class="bg-[#EAE6FF] p-2 rounded">
                <div class="text-[10px] text-[#403294]">Production Output</div>
                <div class="font-bold  text-[#403294] mt-0.5">${lot.productionOutputKg.toLocaleString()} KG</div>
              </div>
              <div class="bg-[#FFF0B3] p-2 rounded">
                <div class="text-[10px] text-[#8f4d00]">Dispatched</div>
                <div class="font-bold  text-[#8f4d00] mt-0.5">${lot.dispatchedQtyKg.toLocaleString()} KG</div>
              </div>
              <div class="bg-[#E6FCFF] p-2 rounded">
                <div class="text-[10px] text-[#008DA6]">Coldstore Balance</div>
                <div class="font-bold  text-[#008DA6] mt-0.5">${lot.balanceQtyKg.toLocaleString()} KG</div>
              </div>
            </div>
            <div class="text-right text-[11px] text-[#5E6C84] mt-2">
              Overall Plant Yield: <strong class="text-[#0284C7] ">${lot.yieldPercent}%</strong> | Current Storage: <strong>${lot.currentLocation}</strong>
            </div>
          </div>
        </div>

        <!-- Interactive Tabs for Traceability Details -->
        <div>
          <div class="border-b border-[#DFE1E6] flex gap-4 text-xs font-semibold mb-4">
            <button class="pb-2 border-b-2 border-[#0284C7] text-[#0284C7]">Traceability Timeline</button>
            <button class="pb-2 text-[#5E6C84] hover:text-[#172B4D]">QC & Antibiotic Certificate</button>
            <button class="pb-2 text-[#5E6C84] hover:text-[#172B4D]">Batches & Export Allocations</button>
          </div>

          <!-- Chronological Step-by-Step Flow -->
          <div class="space-y-4 relative pl-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#DFE1E6]">
            ${lot.traceabilityTimeline.map((step) => `
              <div class="relative group">
                <div class="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-[#0284C7] ring-4 ring-white border-2 border-white"></div>
                <div class="bg-white border border-[#DFE1E6] rounded-lg p-3 hover:border-[#0284C7] transition-colors shadow-xs">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-[#172B4D] text-xs">${step.stage}</span>
                    <span class="text-[10px]  text-[#6B778C]">${step.date}</span>
                  </div>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="lozenge lozenge-success text-[10px]">${step.status}</span>
                    <span class="text-xs  font-semibold text-[#0369A1]">${step.quantity}</span>
                  </div>
                  <p class="text-xs text-[#42526E] mt-1.5 leading-relaxed">${step.details}</p>
                  <div class="text-[10px] text-[#8993A4] mt-1">Responsible: ${step.operator}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    Modal.openDrawer({
      title: `Complete Lot Traceability: ${lot.lotNumber}`,
      subtitle: `${lot.species} • Harvested from ${lot.supplierName}`,
      content: content,
      width: 'w-full md:w-[750px]',
      footerContent: `
        <button class="btn-secondary px-3 py-1.5 rounded text-xs" onclick="window.print()">Print HACCP Audit Certificate</button>
        <button class="btn-primary px-3 py-1.5 rounded text-xs" onclick="document.getElementById('erp-drawer-close-btn').click()">Done</button>
      `
    });
  },

  showArrivalDetails(arrival) {
    const arrNo = arrival.arrivalNumber || arrival.id;
    const date = arrival.date || '06/10/2026';
    const company = arrival.company || 'DEVI FISHERIES LIMITED';
    const plant = arrival.plant || 'DFL UNIT-5 (JPT)';
    const center = arrival.center || 'Bhimavaram Center #1';
    const species = arrival.species || 'Vannamei (VM)';
    const weight = typeof arrival.weight === 'number' ? arrival.weight : parseFloat(arrival.weight) || 0;
    const balWeight = typeof arrival.balanceWeight === 'number' ? arrival.balanceWeight : parseFloat(arrival.balanceWeight) || 0;
    const avgRate = arrival.averageRate || 425;
    const amount = typeof arrival.amount === 'number' ? arrival.amount : (weight * avgRate);
    const balAmount = typeof arrival.balanceAmount === 'number' ? arrival.balanceAmount : (balWeight * avgRate);
    const status = arrival.status || 'QC_CLEARED';

    Modal.open({
      title: `Raw Material Arrival: ${arrNo}`,
      size: 'lg',
      content: `
        <div class="space-y-4 text-xs">
          <!-- Top Header Summary Bar -->
          <div class="flex flex-wrap justify-between items-center p-3 bg-[#FAFBFC] border border-[#DFE1E6] rounded-lg gap-2">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-[#17191c]">${arrNo}</span>
              <span class="text-[#6B778C]">•</span>
              <span class="font-semibold text-[#172B4D]">${date}</span>
              <span class="text-[#6B778C]">•</span>
              <span class="text-[#5E6C84] font-medium">${company}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="lozenge lozenge-success font-bold">${status}</span>
              <button type="button" id="details-top-edit-arrival" class="px-2.5 py-1 bg-white hover:bg-[#F0F9FF] text-[#0284C7] border border-[#BAE6FD] rounded text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shadow-2xs" title="Edit this arrival">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                <span>Edit</span>
              </button>
              <button type="button" id="details-top-delete-arrival" class="px-2.5 py-1 bg-white hover:bg-[#FFEBE6] text-[#BF2600] border border-[#FFBDAD] rounded text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shadow-2xs" title="Delete this arrival">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                <span>Delete</span>
              </button>
            </div>
          </div>

          <!-- Key Metrics Cards -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="p-3 bg-white border border-[#DFE1E6] rounded-lg">
              <span class="text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider block mb-1">Total Weight</span>
              <span class="text-base font-extrabold text-[#006644]">${weight.toLocaleString()} KG</span>
            </div>
            <div class="p-3 bg-white border border-[#DFE1E6] rounded-lg">
              <span class="text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider block mb-1">Balance Weight</span>
              <span class="text-base font-extrabold text-[#FF8B00]">${balWeight.toLocaleString()} KG</span>
            </div>
            <div class="p-3 bg-white border border-[#DFE1E6] rounded-lg">
              <span class="text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider block mb-1">Average Rate</span>
              <span class="text-base font-extrabold text-[#172B4D]">₹ ${avgRate} / KG</span>
            </div>
            <div class="p-3 bg-white border border-[#DFE1E6] rounded-lg">
              <span class="text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider block mb-1">Total Valuation</span>
              <span class="text-base font-extrabold text-[#172B4D]">₹ ${amount.toLocaleString()}</span>
            </div>
          </div>

          <!-- Structured Details Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 bg-[#FAFBFC] border border-[#DFE1E6] rounded-lg space-y-2">
              <div class="flex justify-between border-b border-[#EBECF0] pb-1.5">
                <span class="text-[#6B778C]">Plant Facility:</span>
                <span class="font-bold text-[#172B4D]">${plant}</span>
              </div>
              <div class="flex justify-between border-b border-[#EBECF0] pb-1.5">
                <span class="text-[#6B778C]">Procurement Center:</span>
                <span class="font-bold text-[#172B4D]">${center}</span>
              </div>
              <div class="flex justify-between border-b border-[#EBECF0] pb-1.5">
                <span class="text-[#6B778C]">Target Species:</span>
                <span class="font-bold text-[#172B4D]">${species}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-[#6B778C]">Balance Amount:</span>
                <span class="font-bold text-[#6554C0]">₹ ${balAmount.toLocaleString()}</span>
              </div>
            </div>

            <div class="p-3 bg-[#FAFBFC] border border-[#DFE1E6] rounded-lg space-y-2">
              <div class="flex justify-between border-b border-[#EBECF0] pb-1.5">
                <span class="text-[#6B778C]">Vehicle Number:</span>
                <span class="font-bold text-[#172B4D]">${arrival.vehicleNumber || 'AP 37 TE 9011'}</span>
              </div>
              <div class="flex justify-between border-b border-[#EBECF0] pb-1.5">
                <span class="text-[#6B778C]">Driver Name:</span>
                <span class="font-medium text-[#172B4D]">${arrival.driverName || 'K. Ramu'}</span>
              </div>
              <div class="flex justify-between border-b border-[#EBECF0] pb-1.5">
                <span class="text-[#6B778C]">Linked Company:</span>
                <span class="font-medium text-[#172B4D]">${company}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-[#6B778C]">QC Inspection:</span>
                <span class="font-bold text-[#006644]">HACCP Dock Verified</span>
              </div>
            </div>
          </div>

          <!-- Notes -->
          <div class="p-3 bg-[#F4F5F7] rounded-lg text-[#42526E] border border-[#DFE1E6]">
            <strong>Receiving Notes:</strong> ${arrival.remarks || 'Fresh raw material harvest intake recorded at dock weighbridge. Temp and ice ratio checked.'}
          </div>
        </div>
      `,
      footerButtons: [
        { label: 'Close', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Delete Arrival',
          type: 'destructive',
          onClick: (m) => {
            m.close();
            PurchaseView.deleteArrival(arrival, PurchaseView.arrivalsTable);
          }
        },
        {
          label: 'Edit Arrival',
          type: 'primary',
          onClick: (m) => {
            m.close();
            PurchaseView.openEditArrivalModal(arrival, PurchaseView.arrivalsTable);
          }
        }
      ]
    });

    setTimeout(() => {
      const eb = document.getElementById('details-top-edit-arrival');
      if (eb) eb.addEventListener('click', () => {
        Modal.close();
        PurchaseView.openEditArrivalModal(arrival, PurchaseView.arrivalsTable);
      });
      const db = document.getElementById('details-top-delete-arrival');
      if (db) db.addEventListener('click', () => {
        Modal.close();
        PurchaseView.deleteArrival(arrival, PurchaseView.arrivalsTable);
      });
    }, 50);
  },

  downloadRecord(record) {
    const filename = `${record.bookingNo || record.arrivalNumber || record.arrivalCode || record.billNo || record.txnId || record.voucherNo || record.lotNumber || record.id || 'record'}.json`;
    const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(record, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", jsonStr);
    dlAnchorElem.setAttribute("download", filename);
    document.body.appendChild(dlAnchorElem);
    dlAnchorElem.click();
    dlAnchorElem.remove();
    Toast.show(`Downloaded ${filename}`, 'success', 'File Downloaded');
  },

  // =========================================================================
  // SUPPLIER BILL: ADD DETAILS & PRICING MODAL (ACTION ADD ICON)
  // =========================================================================
  openAddBillDetailsModal(bill, tableInstance) {
    // 1. Read-Only / Auto-Populated Fields
    const species = bill.species || 'ST';
    const purchaseStation = bill.purchaseStation || bill.station || 'BALASORE';
    const processingStation = bill.processingStation || bill.plant || 'DFL UNIT-5 (JPT)';
    const purchaseType = bill.purchaseType || 'By Yield';
    const billNumber = bill.billNo || 'BLS/2627/0145';
    const vehicleNumber = bill.vehicleNo || 'AP05TC8585';
    const driverName = bill.driverName || 'ANJI';
    const graderName = bill.graderName || 'LAKSHMI';
    const purchaseDate = bill.purchaseDate || bill.arrivalDate || '06-10-2026';
    const agentName = bill.agent || 'ADITYA AQUA FARMS';
    const farmLocation = bill.farmLocation || 'BALASORE';

    // 2. Editable Fields
    const supplierName = bill.supplier || bill.supplierName || 'K.GOPAL NAIDU--AFCPN8806J';
    const additionDeduction = bill.additionDeduction !== undefined ? parseFloat(bill.additionDeduction) : 0.00;
    const remarks = bill.remarks || '';

    // 3. Table Rows Data
    const defaultWeight = parseFloat(bill.arrivalWeight || bill.weightKg) || 3500;
    const defaultCount = bill.arrivalCount || bill.count || '40';
    let items = (bill.tableItems && bill.tableItems.length) ? JSON.parse(JSON.stringify(bill.tableItems)) : [
      {
        sNo: 1,
        variety: 'VANNAMEI (ST)',
        count: defaultCount,
        weight: defaultWeight,
        masterRate: 480.00,
        harvestCom: 5.00
      }
    ];

    // Compute initial rate and total value
    items.forEach(it => {
      it.rate = it.masterRate + additionDeduction - it.harvestCom;
      it.totalValue = it.weight * it.rate;
    });

    const totalWeight = items.reduce((sum, it) => sum + it.weight, 0);
    const totalValue = items.reduce((sum, it) => sum + it.totalValue, 0);

    Modal.open({
      title: `Add Bill Details & Rates: ${billNumber}`,
      size: 'xl',
      content: `
        <form class="space-y-4 text-xs" onsubmit="return false;">
          <!-- Top Section: Read-Only / Auto-Populated Fields (11 Fields) -->
          <div class="bg-[#FAFBFC] border border-[#EBECF0] rounded-xl p-4 shadow-2xs">
            <div class="flex items-center gap-2 mb-3 pb-2 border-b border-[#EBECF0]">
              <svg class="w-4 h-4 text-[#0284C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              <h3 class="text-xs font-bold text-[#172B4D] uppercase tracking-wider">Arrival &amp; Bill Information (Read-Only / Auto-Populated)</h3>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              <!-- 1. Species -->
              <div>
                <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">Species</label>
                <input type="text" id="bill-add-species" value="${species}" readonly class="w-full text-xs px-2.5 py-1.5 bg-[#F4F5F7] border border-[#DFE1E6] rounded font-semibold text-[#172B4D] cursor-not-allowed select-none" />
              </div>

              <!-- 2. Purchase Station -->
              <div>
                <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">Purchase Station</label>
                <input type="text" id="bill-add-purchase-station" value="${purchaseStation}" readonly class="w-full text-xs px-2.5 py-1.5 bg-[#F4F5F7] border border-[#DFE1E6] rounded font-semibold text-[#172B4D] cursor-not-allowed select-none" />
              </div>

              <!-- 3. Processing Station -->
              <div>
                <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">Processing Station</label>
                <input type="text" id="bill-add-processing-station" value="${processingStation}" readonly class="w-full text-xs px-2.5 py-1.5 bg-[#F4F5F7] border border-[#DFE1E6] rounded font-semibold text-[#172B4D] cursor-not-allowed select-none" />
              </div>

              <!-- 4. Purchase Type -->
              <div>
                <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">Purchase Type</label>
                <input type="text" id="bill-add-purchase-type" value="${purchaseType}" readonly class="w-full text-xs px-2.5 py-1.5 bg-[#F4F5F7] border border-[#DFE1E6] rounded font-semibold text-[#172B4D] cursor-not-allowed select-none" />
              </div>

              <!-- 5. Bill Number -->
              <div>
                <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">Bill Number</label>
                <input type="text" id="bill-add-bill-number" value="${billNumber}" readonly class="w-full text-xs px-2.5 py-1.5 bg-[#F4F5F7] border border-[#DFE1E6] rounded font-bold text-[#17191c] cursor-not-allowed select-none" />
              </div>

              <!-- 6. Vehicle Number -->
              <div>
                <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">Vehicle Number</label>
                <input type="text" id="bill-add-vehicle-number" value="${vehicleNumber}" readonly class="w-full text-xs px-2.5 py-1.5 bg-[#F4F5F7] border border-[#DFE1E6] rounded font-semibold text-[#172B4D] cursor-not-allowed select-none" />
              </div>

              <!-- 7. Driver Name -->
              <div>
                <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">Driver Name</label>
                <input type="text" id="bill-add-driver-name" value="${driverName}" readonly class="w-full text-xs px-2.5 py-1.5 bg-[#F4F5F7] border border-[#DFE1E6] rounded font-semibold text-[#172B4D] cursor-not-allowed select-none" />
              </div>

              <!-- 8. Grader Name -->
              <div>
                <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">Grader Name</label>
                <input type="text" id="bill-add-grader-name" value="${graderName}" readonly class="w-full text-xs px-2.5 py-1.5 bg-[#F4F5F7] border border-[#DFE1E6] rounded font-semibold text-[#172B4D] cursor-not-allowed select-none" />
              </div>

              <!-- 9. Purchase Date -->
              <div>
                <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">Purchase Date</label>
                <input type="text" id="bill-add-purchase-date" value="${purchaseDate}" readonly class="w-full text-xs px-2.5 py-1.5 bg-[#F4F5F7] border border-[#DFE1E6] rounded font-semibold text-[#172B4D] cursor-not-allowed select-none" />
              </div>

              <!-- 10. Agent Name (Dropdown) -->
              <div>
                <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">Agent Name <span class="text-[#0284C7] font-normal">(Dropdown)</span></label>
                <select id="bill-add-agent" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7] font-semibold text-[#172B4D]">
                  <option value="ADITYA AQUA FARMS" ${agentName === 'ADITYA AQUA FARMS' ? 'selected' : ''}>ADITYA AQUA FARMS</option>
                  <option value="Coastal Marine Agency" ${agentName === 'Coastal Marine Agency' ? 'selected' : ''}>Coastal Marine Agency</option>
                  <option value="Sagar Marine Brokers" ${agentName === 'Sagar Marine Brokers' ? 'selected' : ''}>Sagar Marine Brokers</option>
                  <option value="Direct Farmer" ${agentName === 'Direct Farmer' ? 'selected' : ''}>Direct Farmer</option>
                  <option value="Delta Seafood Associates" ${agentName === 'Delta Seafood Associates' ? 'selected' : ''}>Delta Seafood Associates</option>
                  <option value="East Coast Brokers" ${agentName === 'East Coast Brokers' ? 'selected' : ''}>East Coast Brokers</option>
                  <option value="Nellore Aqua Syndicate" ${agentName === 'Nellore Aqua Syndicate' ? 'selected' : ''}>Nellore Aqua Syndicate</option>
                </select>
              </div>

              <!-- 11. Farm Location -->
              <div>
                <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">Farm Location</label>
                <input type="text" id="bill-add-farm-location" value="${farmLocation}" readonly class="w-full text-xs px-2.5 py-1.5 bg-[#F4F5F7] border border-[#DFE1E6] rounded font-semibold text-[#172B4D] cursor-not-allowed select-none" />
              </div>
            </div>
          </div>

          <!-- Middle Section: Editable Fields -->
          <div class="bg-white border border-[#DFE1E6] rounded-xl p-4 shadow-2xs">
            <div class="flex items-center gap-2 mb-3 pb-2 border-b border-[#EBECF0]">
              <svg class="w-4 h-4 text-[#006644]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
              <h3 class="text-xs font-bold text-[#172B4D] uppercase tracking-wider">Settlement Parameters (Editable)</h3>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <!-- 1. Supplier Name - Dropdown (K.GOPAL NAIDU--AFCPN8806J) -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">Supplier Name <span class="text-red-500">*</span></label>
                <select id="bill-add-supplier" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded font-bold text-[#172B4D] focus:outline-none focus:border-[#0284C7]">
                  <option value="K.GOPAL NAIDU--AFCPN8806J" ${supplierName.includes('GOPAL') ? 'selected' : ''}>K.GOPAL NAIDU--AFCPN8806J</option>
                  <option value="Godavari Coastal Aqua Farms" ${supplierName.includes('Godavari') ? 'selected' : ''}>Godavari Coastal Aqua Farms</option>
                  <option value="Sagar Marine Hatcheries & Cultivators" ${supplierName.includes('Sagar') ? 'selected' : ''}>Sagar Marine Hatcheries &amp; Cultivators</option>
                  <option value="Krishna Delta Prawn Harvesters" ${supplierName.includes('Krishna') ? 'selected' : ''}>Krishna Delta Prawn Harvesters</option>
                  <option value="Konaseema Marine Harvesters" ${supplierName.includes('Konaseema') ? 'selected' : ''}>Konaseema Marine Harvesters</option>
                  <option value="Nellore Brackish Aqua Cultivators" ${supplierName.includes('Nellore') ? 'selected' : ''}>Nellore Brackish Aqua Cultivators</option>
                  <option value="Sri Sai Aqua Farms & Seedlings" ${supplierName.includes('Sri Sai') ? 'selected' : ''}>Sri Sai Aqua Farms &amp; Seedlings</option>
                  <option value="East Coast Aqua Society" ${supplierName.includes('East Coast') ? 'selected' : ''}>East Coast Aqua Society</option>
                  <option value="L.G SEA FOODS(D HARIBABU)" ${supplierName.includes('HARIBABU') ? 'selected' : ''}>L.G SEA FOODS(D HARIBABU)</option>
                  <option value="${supplierName}" ${(!supplierName.includes('GOPAL') && !supplierName.includes('Godavari')) ? 'selected' : ''}>${supplierName}</option>
                </select>
              </div>

              <!-- 2. Addition/Deduction Per KG * - Number Input (0.00) - Required -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">Addition/Deduction Per KG <span class="text-red-500">*</span></label>
                <div class="relative">
                  <span class="absolute left-2.5 top-1.5 text-xs font-bold text-[#5E6C84]">₹</span>
                  <input type="number" step="0.01" id="bill-add-deduction" value="${additionDeduction.toFixed(2)}" placeholder="0.00" required class="w-full text-xs pl-7 pr-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded font-bold text-[#17191c] focus:outline-none focus:border-[#0284C7]" />
                </div>
                <span class="text-[10px] text-[#5E6C84] mt-0.5 block">Dynamically adjusts Rate and Total Value below</span>
              </div>

              <!-- 3. Remarks - Text Input (Enter Remarks) -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">Remarks</label>
                <input type="text" id="bill-add-remarks" placeholder="Enter Remarks" value="${remarks}" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" />
              </div>
            </div>
          </div>

          <!-- Bottom Section: Table Columns (8 Columns) -->
          <div class="border border-[#EBECF0] rounded-xl overflow-hidden shadow-2xs">
            <div class="px-4 py-2.5 bg-[#FAFBFC] border-b border-[#EBECF0] flex items-center justify-between">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-[#0284C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                <h4 class="text-xs font-bold text-[#172B4D] uppercase tracking-wider">Bill Variety &amp; Pricing Calculation</h4>
              </div>
              <span class="text-[11px] text-[#5E6C84]">${items.length} Line Item${items.length > 1 ? 's' : ''}</span>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead class="bg-[#FAFBFC] border-b border-[#EBECF0] text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider whitespace-nowrap">
                  <tr>
                    <th class="px-3 py-2.5 text-center">S.No</th>
                    <th class="px-3 py-2.5">Variety</th>
                    <th class="px-3 py-2.5 text-center">Count</th>
                    <th class="px-3 py-2.5 text-right">Weight</th>
                    <th class="px-3 py-2.5 text-right">Master Rate</th>
                    <th class="px-3 py-2.5 text-right">Harvest Com.</th>
                    <th class="px-3 py-2.5 text-right">Rate</th>
                    <th class="px-3 py-2.5 text-right">Total Value</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[#EBECF0] bg-white text-xs">
                  ${items.map((it, idx) => `
                    <tr class="hover:bg-[#F4F5F7] transition-colors">
                      <td class="px-3 py-2.5 text-center font-medium text-[#5E6C84]">${idx + 1}</td>
                      <td class="px-3 py-2.5 font-bold text-[#172B4D]">${it.variety}</td>
                      <td class="px-3 py-2.5 text-center font-semibold text-[#172B4D]">${it.count}</td>
                      <td class="px-3 py-2.5 text-right font-medium text-[#172B4D]">${it.weight.toLocaleString()} KG</td>
                      <td class="px-3 py-2.5 text-right font-medium text-[#5E6C84]">₹ ${it.masterRate.toFixed(2)}</td>
                      <td class="px-3 py-2.5 text-right font-medium text-[#BF2600]">₹ ${it.harvestCom.toFixed(2)}</td>
                      <td class="px-3 py-2.5 text-right font-bold text-[#006644] whitespace-nowrap" id="bill-row-rate-${idx}">₹ ${it.rate.toFixed(2)}</td>
                      <td class="px-3 py-2.5 text-right font-extrabold text-[#172B4D] whitespace-nowrap" id="bill-row-total-${idx}">₹ ${it.totalValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    </tr>
                  `).join('')}
                </tbody>
                <tfoot class="bg-[#F4F5F7] border-t-2 border-[#DFE1E6] text-xs font-bold text-[#172B4D]">
                  <tr>
                    <td colspan="3" class="px-3 py-2.5 text-right uppercase tracking-wider text-[#5E6C84]">Total:</td>
                    <td class="px-3 py-2.5 text-right text-[#172B4D] whitespace-nowrap" id="bill-table-foot-weight">${totalWeight.toLocaleString()} KG</td>
                    <td class="px-3 py-2.5 text-right text-[#5E6C84]">-</td>
                    <td class="px-3 py-2.5 text-right text-[#5E6C84]">-</td>
                    <td class="px-3 py-2.5 text-right text-[#5E6C84]">-</td>
                    <td class="px-3 py-2.5 text-right text-[#006644] whitespace-nowrap" id="bill-table-foot-total">₹ ${totalValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <!-- Total Amount Summary Bar Below the Table -->
            <div class="px-4 py-3 bg-[#FAFBFC] border-t border-[#EBECF0] flex flex-wrap items-center justify-between gap-3">
              <div class="flex items-center gap-2">
                <span class="text-xs font-semibold text-[#5E6C84]">Bill Calculation Summary:</span>
                <span class="text-xs font-bold text-[#172B4D] bg-[#EBECF0] px-2 py-0.5 rounded">${items.length} Item</span>
              </div>
              <div class="flex items-center gap-6">
                <div class="text-right">
                  <span class="text-[10px] font-bold uppercase tracking-wider text-[#5E6C84] block">Addition / Deduction</span>
                  <span class="text-xs font-bold text-[#17191c]" id="bill-summary-add-ded">₹ ${additionDeduction.toFixed(2)} / KG</span>
                </div>
                <div class="text-right pl-3 border-l border-[#DFE1E6]">
                  <span class="text-[11px] font-bold uppercase tracking-wider text-[#17191c] block">Net Total Bill Value</span>
                  <span class="text-base font-extrabold text-[#006644]" id="bill-summary-net-total">₹ ${totalValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Save & Update Bill',
          type: 'primary',
          onClick: (m) => {
            const addDedStr = document.getElementById('bill-add-deduction')?.value;
            if (addDedStr === '' || addDedStr === null || isNaN(parseFloat(addDedStr))) {
              Toast.show('Addition/Deduction Per KG is required.', 'warning');
              return;
            }
            const addDedVal = parseFloat(addDedStr);
            const selectedAgent = document.getElementById('bill-add-agent')?.value || agentName;
            const selectedSupplier = document.getElementById('bill-add-supplier')?.value || supplierName;
            const enteredRemarks = document.getElementById('bill-add-remarks')?.value || '';

            // Recalculate final items
            let finalTotalWeight = 0;
            let finalTotalValue = 0;
            items.forEach(item => {
              item.rate = item.masterRate + addDedVal - item.harvestCom;
              item.totalValue = item.weight * item.rate;
              finalTotalWeight += item.weight;
              finalTotalValue += item.totalValue;
            });

            // Persist all fields to bill object
            bill.species = species;
            bill.purchaseStation = purchaseStation;
            bill.processingStation = processingStation;
            bill.purchaseType = purchaseType;
            bill.billNo = billNumber;
            bill.vehicleNo = vehicleNumber;
            bill.driverName = driverName;
            bill.graderName = graderName;
            bill.purchaseDate = purchaseDate;
            bill.arrivalDate = purchaseDate;
            bill.agent = selectedAgent;
            bill.farmLocation = farmLocation;
            bill.supplier = selectedSupplier;
            bill.supplierName = selectedSupplier;
            bill.additionDeduction = addDedVal;
            bill.remarks = enteredRemarks;
            bill.tableItems = items;
            bill.arrivalWeight = finalTotalWeight;
            bill.weightKg = finalTotalWeight;
            bill.totalBillAmount = finalTotalValue;
            bill.totalAmountInr = finalTotalValue;
            bill.status = 'Approved';

            // Refresh table
            if (tableInstance) {
              tableInstance.setData(ERP_DATA.supplierBills);
            }

            m.close();

            // Rich Confirmation Popup on Action Done
            Modal.success({
              title: 'Bill Saved & Confirmed Successfully',
              message: `
                <div class="space-y-3 text-xs text-[#172B4D]">
                  <p>Bill <strong>${billNumber}</strong> has been updated with the new settlement parameters and pricing.</p>
                  <div class="p-3 bg-[#FAFBFC] rounded-lg border border-[#EBECF0] grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div><span class="text-[#5E6C84] block text-[11px]">Supplier:</span><strong class="text-[#172B4D]">${selectedSupplier}</strong></div>
                    <div><span class="text-[#5E6C84] block text-[11px]">Agent:</span><strong class="text-[#172B4D]">${selectedAgent}</strong></div>
                    <div><span class="text-[#5E6C84] block text-[11px]">Addition/Deduction:</span><strong class="text-[#0284C7]">₹ ${addDedVal.toFixed(2)} / KG</strong></div>
                    <div><span class="text-[#5E6C84] block text-[11px]">Net Total Bill Value:</span><strong class="text-[#006644]">₹ ${finalTotalValue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong></div>
                    <div><span class="text-[#5E6C84] block text-[11px]">Status:</span><span class="inline-flex px-2 py-0.5 rounded text-[11px] font-bold bg-[#F0F9FF] text-[#0284C7]">Approved</span></div>
                  </div>
                </div>
              `
            });
            Toast.show(`Bill ${billNumber} updated successfully!`, 'success', 'Changes Saved');
          }
        }
      ]
    });

    // Real-Time Event Listener for Addition/Deduction
    setTimeout(() => {
      const deductionInput = document.getElementById('bill-add-deduction');
      if (deductionInput) {
        deductionInput.addEventListener('input', () => {
          const val = parseFloat(deductionInput.value) || 0;
          let totW = 0;
          let totV = 0;
          items.forEach((it, idx) => {
            it.rate = it.masterRate + val - it.harvestCom;
            it.totalValue = it.weight * it.rate;
            totW += it.weight;
            totV += it.totalValue;

            const rEl = document.getElementById(`bill-row-rate-${idx}`);
            const vEl = document.getElementById(`bill-row-total-${idx}`);
            if (rEl) rEl.textContent = `₹ ${it.rate.toFixed(2)}`;
            if (vEl) vEl.textContent = `₹ ${it.totalValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
          });

          const fw = document.getElementById('bill-table-foot-weight');
          const fv = document.getElementById('bill-table-foot-total');
          const st = document.getElementById('bill-summary-net-total');
          const sa = document.getElementById('bill-summary-add-ded');

          if (fw) fw.textContent = `${totW.toLocaleString()} KG`;
          if (fv) fv.textContent = `₹ ${totV.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
          if (st) st.textContent = `₹ ${totV.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
          if (sa) sa.textContent = `₹ ${val.toFixed(2)} / KG`;
        });
      }
    }, 50);
  },

  // Backward-compatible alias for payment settlements
  openAddPaymentForBill(bill, tableInstance) {
    this.openAddBillDetailsModal(bill, tableInstance);
  },

  // =========================================================================
  // SUPPLIER BILL: ROW CLICK VIEW DETAILS MODAL (SHOWS ALL ADDED DATA)
  // =========================================================================
  showBillDetails(bill) {
    const species = bill.species || 'ST';
    const purchaseStation = bill.purchaseStation || bill.station || 'BALASORE';
    const processingStation = bill.processingStation || bill.plant || 'DFL UNIT-5 (JPT)';
    const purchaseType = bill.purchaseType || 'By Yield';
    const billNumber = bill.billNo || 'BLS/2627/0145';
    const vehicleNumber = bill.vehicleNo || 'AP05TC8585';
    const driverName = bill.driverName || 'ANJI';
    const graderName = bill.graderName || 'LAKSHMI';
    const purchaseDate = bill.purchaseDate || bill.arrivalDate || '06-10-2026';
    const agentName = bill.agent || 'ADITYA AQUA FARMS';
    const farmLocation = bill.farmLocation || 'BALASORE';
    const supplierName = bill.supplier || bill.supplierName || 'K.GOPAL NAIDU--AFCPN8806J';
    const additionDeduction = bill.additionDeduction !== undefined ? parseFloat(bill.additionDeduction) : 0.00;
    const remarks = bill.remarks || 'Standard harvest delivery';
    const status = bill.status || 'Pending';

    // Line Items
    const defaultWeight = parseFloat(bill.arrivalWeight || bill.weightKg) || 3500;
    const defaultCount = bill.arrivalCount || bill.count || '40';
    const items = (bill.tableItems && bill.tableItems.length) ? bill.tableItems : [
      {
        sNo: 1,
        variety: 'VANNAMEI (ST)',
        count: defaultCount,
        weight: defaultWeight,
        masterRate: 480.00,
        harvestCom: 5.00,
        rate: 480.00 + additionDeduction - 5.00,
        totalValue: defaultWeight * (480.00 + additionDeduction - 5.00)
      }
    ];

    const totalWeight = items.reduce((sum, it) => sum + (parseFloat(it.weight) || 0), 0);
    const totalAmt = bill.totalBillAmount || bill.totalAmountInr || items.reduce((sum, it) => sum + (parseFloat(it.totalValue) || 0), 0);

    Modal.open({
      title: `Supplier Bill Summary: ${billNumber}`,
      size: 'xl',
      content: `
        <div class="space-y-4 text-xs">
          <!-- Top Header Info Banner -->
          <div class="p-3 bg-[#FAFBFC] text-[#172B4D] rounded-xl border border-[#DFE1E6] flex flex-wrap items-center justify-between gap-2 shadow-2xs">
            <div class="flex items-center gap-2">
              <span class="font-extrabold text-base text-[#17191c]">${billNumber}</span>
              <span class="text-xs text-[#5E6C84]">(${purchaseDate})</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-bold ${status === 'Paid' ? 'bg-[#E3FCEF] text-[#006644] border border-[#ABF5D1]' : (status === 'Approved' ? 'bg-[#F0F9FF] text-[#0284C7] border border-[#BAE6FD]' : 'bg-[#FFF0B3] text-[#8F4D00] border border-[#FFE380]')}">${status}</span>
              <button type="button" id="details-top-edit-bill" class="px-2.5 py-1 bg-white hover:bg-[#F0F9FF] text-[#0284C7] border border-[#BAE6FD] rounded text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shadow-2xs" title="Edit bill details">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                <span>Edit / Update Bill</span>
              </button>
            </div>
          </div>

          <!-- Section 1: Auto-Populated & Read-Only Information (11 Fields) -->
          <div class="bg-[#FAFBFC] border border-[#EBECF0] rounded-xl p-4 shadow-2xs">
            <div class="flex items-center gap-2 mb-2 pb-1.5 border-b border-[#EBECF0]">
              <svg class="w-3.5 h-3.5 text-[#0284C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <h4 class="text-[11px] font-bold text-[#172B4D] uppercase tracking-wider">Arrival &amp; Bill Information</h4>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              <div class="p-2 bg-white border border-[#EBECF0] rounded">
                <span class="text-[#6B778C] text-[10px] block font-bold uppercase tracking-wider">Species</span>
                <span class="font-bold text-[#172B4D]">${species}</span>
              </div>
              <div class="p-2 bg-white border border-[#EBECF0] rounded">
                <span class="text-[#6B778C] text-[10px] block font-bold uppercase tracking-wider">Purchase Station</span>
                <span class="font-semibold text-[#172B4D]">${purchaseStation}</span>
              </div>
              <div class="p-2 bg-white border border-[#EBECF0] rounded">
                <span class="text-[#6B778C] text-[10px] block font-bold uppercase tracking-wider">Processing Station</span>
                <span class="font-semibold text-[#172B4D]">${processingStation}</span>
              </div>
              <div class="p-2 bg-white border border-[#EBECF0] rounded">
                <span class="text-[#6B778C] text-[10px] block font-bold uppercase tracking-wider">Purchase Type</span>
                <span class="font-semibold text-[#172B4D]">${purchaseType}</span>
              </div>
              <div class="p-2 bg-white border border-[#EBECF0] rounded">
                <span class="text-[#6B778C] text-[10px] block font-bold uppercase tracking-wider">Bill Number</span>
                <span class="font-bold text-[#17191c]">${billNumber}</span>
              </div>
              <div class="p-2 bg-white border border-[#EBECF0] rounded">
                <span class="text-[#6B778C] text-[10px] block font-bold uppercase tracking-wider">Vehicle Number</span>
                <span class="font-semibold text-[#172B4D]">${vehicleNumber}</span>
              </div>
              <div class="p-2 bg-white border border-[#EBECF0] rounded">
                <span class="text-[#6B778C] text-[10px] block font-bold uppercase tracking-wider">Driver Name</span>
                <span class="font-semibold text-[#172B4D]">${driverName}</span>
              </div>
              <div class="p-2 bg-white border border-[#EBECF0] rounded">
                <span class="text-[#6B778C] text-[10px] block font-bold uppercase tracking-wider">Grader Name</span>
                <span class="font-semibold text-[#172B4D]">${graderName}</span>
              </div>
              <div class="p-2 bg-white border border-[#EBECF0] rounded">
                <span class="text-[#6B778C] text-[10px] block font-bold uppercase tracking-wider">Purchase Date</span>
                <span class="font-semibold text-[#172B4D]">${purchaseDate}</span>
              </div>
              <div class="p-2 bg-white border border-[#EBECF0] rounded">
                <span class="text-[#6B778C] text-[10px] block font-bold uppercase tracking-wider">Agent Name</span>
                <span class="font-bold text-[#172B4D]">${agentName}</span>
              </div>
              <div class="p-2 bg-white border border-[#EBECF0] rounded col-span-2 sm:col-span-1">
                <span class="text-[#6B778C] text-[10px] block font-bold uppercase tracking-wider">Farm Location</span>
                <span class="font-semibold text-[#172B4D]">${farmLocation}</span>
              </div>
            </div>
          </div>

          <!-- Section 2: Added & Editable Settlement Parameters -->
          <div class="bg-white border border-[#EBECF0] rounded-xl p-4 shadow-2xs">
            <div class="flex items-center gap-2 mb-2 pb-1.5 border-b border-[#EBECF0]">
              <svg class="w-3.5 h-3.5 text-[#006644]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <h4 class="text-[11px] font-bold text-[#172B4D] uppercase tracking-wider">Settlement &amp; Supplier Parameters</h4>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div class="p-2.5 bg-[#FAFBFC] border border-[#EBECF0] rounded">
                <span class="text-[#6B778C] text-[11px] block font-semibold uppercase tracking-wider">Supplier Name</span>
                <span class="font-bold text-sm text-[#172B4D]">${supplierName}</span>
              </div>
              <div class="p-2.5 bg-[#FAFBFC] border border-[#EBECF0] rounded">
                <span class="text-[#6B778C] text-[11px] block font-semibold uppercase tracking-wider">Addition / Deduction Per KG</span>
                <span class="font-extrabold text-sm text-[#17191c]">₹ ${additionDeduction.toFixed(2)} / KG</span>
              </div>
              <div class="p-2.5 bg-[#FAFBFC] border border-[#EBECF0] rounded">
                <span class="text-[#6B778C] text-[11px] block font-semibold uppercase tracking-wider">Remarks</span>
                <span class="font-medium text-xs text-[#172B4D]">${remarks}</span>
              </div>
            </div>
          </div>

          <!-- Section 3: Pricing Calculation Table (8 Columns) -->
          <div class="border border-[#EBECF0] rounded-xl overflow-hidden shadow-2xs">
            <div class="px-4 py-2 bg-[#FAFBFC] border-b border-[#EBECF0] flex items-center justify-between">
              <h4 class="text-[11px] font-bold text-[#172B4D] uppercase tracking-wider">Pricing Calculation Breakdown</h4>
              <span class="text-[11px] text-[#5E6C84]">${items.length} Record</span>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead class="bg-[#FAFBFC] border-b border-[#EBECF0] text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider whitespace-nowrap">
                  <tr>
                    <th class="px-3 py-2 text-center">S.No</th>
                    <th class="px-3 py-2">Variety</th>
                    <th class="px-3 py-2 text-center">Count</th>
                    <th class="px-3 py-2 text-right">Weight</th>
                    <th class="px-3 py-2 text-right">Master Rate</th>
                    <th class="px-3 py-2 text-right">Harvest Com.</th>
                    <th class="px-3 py-2 text-right">Rate</th>
                    <th class="px-3 py-2 text-right">Total Value</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[#EBECF0] bg-white text-xs">
                  ${items.map((it, idx) => `
                    <tr>
                      <td class="px-3 py-2 text-center text-[#5E6C84]">${idx + 1}</td>
                      <td class="px-3 py-2 font-bold text-[#172B4D]">${it.variety}</td>
                      <td class="px-3 py-2 text-center font-semibold text-[#172B4D]">${it.count}</td>
                      <td class="px-3 py-2 text-right font-medium text-[#172B4D]">${(parseFloat(it.weight) || 0).toLocaleString()} KG</td>
                      <td class="px-3 py-2 text-right font-medium text-[#5E6C84]">₹ ${(parseFloat(it.masterRate) || 0).toFixed(2)}</td>
                      <td class="px-3 py-2 text-right font-medium text-[#BF2600]">₹ ${(parseFloat(it.harvestCom) || 0).toFixed(2)}</td>
                      <td class="px-3 py-2 text-right font-bold text-[#006644]">₹ ${(parseFloat(it.rate) || 0).toFixed(2)}</td>
                      <td class="px-3 py-2 text-right font-extrabold text-[#172B4D]">₹ ${(parseFloat(it.totalValue) || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    </tr>
                  `).join('')}
                </tbody>
                <tfoot class="bg-[#F4F5F7] border-t-2 border-[#DFE1E6] text-xs font-bold text-[#172B4D]">
                  <tr>
                    <td colspan="3" class="px-3 py-2 text-right uppercase tracking-wider text-[#5E6C84]">Total:</td>
                    <td class="px-3 py-2 text-right whitespace-nowrap">${totalWeight.toLocaleString()} KG</td>
                    <td class="px-3 py-2 text-right text-[#5E6C84]">-</td>
                    <td class="px-3 py-2 text-right text-[#5E6C84]">-</td>
                    <td class="px-3 py-2 text-right text-[#5E6C84]">-</td>
                    <td class="px-3 py-2 text-right text-[#006644] whitespace-nowrap">₹ ${totalAmt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <!-- Total Bill Amount Card -->
          <div class="p-3 bg-[#E3FCEF] border border-[#ABF5D1] rounded-xl flex justify-between items-center shadow-2xs">
            <div>
              <span class="text-[#006644] font-bold block text-xs">Total Bill Amount</span>
              <span class="text-[11px] text-[#5E6C84]">Calculated from variety, weight, rates &amp; adjustments</span>
            </div>
            <span class="text-lg font-extrabold text-[#006644]">₹ ${totalAmt.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
      `,
      footerButtons: [
        { label: 'Close', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Edit / Update Bill',
          type: 'primary',
          onClick: (m) => {
            m.close();
            PurchaseView.openAddBillDetailsModal(bill, PurchaseView.billsTable);
          }
        },
        {
          label: 'Download Record',
          type: 'secondary',
          onClick: (m) => PurchaseView.downloadRecord(bill)
        }
      ]
    });

    setTimeout(() => {
      const eb = document.getElementById('details-top-edit-bill');
      if (eb) eb.addEventListener('click', () => {
        Modal.close();
        PurchaseView.openAddBillDetailsModal(bill, PurchaseView.billsTable);
      });
    }, 50);
  },

    showTransactionDetails(txn) {
    const billNo = txn.billNo || ('AMP/2627/' + (txn.txnId ? txn.txnId.replace(/\D/g, '').slice(-4) : '2967'));
    const voucherNo = txn.voucherNo || ('VCH-2026-' + (txn.txnId ? txn.txnId.split('-')[2] : '9041'));
    const chqNeft = txn.bankRef || txn.chqNeft || ('NEFT-' + (txn.txnId ? txn.txnId.replace(/\D/g, '') : '9912048'));
    const mode = txn.paymentMode || 'NEFT';
    const amt = parseFloat(txn.amountInr) || 11000;
    const comments = txn.description || 'Harvest settlement payment for pond intake';

    Modal.open({
      title: `Commercial Transaction: ${txn.txnId}`,
      size: 'xl',
      content: `
        <div class="space-y-4 text-xs">
          <!-- Top Form Fields Card (5 Fields - View Mode) -->
          <div class="bg-[#FAFBFC] border border-[#EBECF0] rounded-xl p-4 shadow-2xs">
            <div class="flex items-center justify-between pb-3 mb-3 border-b border-[#EBECF0]">
              <div class="flex items-center gap-2">
                <span class="font-extrabold text-sm text-[#172B4D]">${txn.txnId}</span>
                <span class="text-xs text-[#5E6C84]">(${txn.date || txn.rawDate || '06-10-2026'})</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-[#E3FCEF] text-[#006644] border border-[#ABF5D1]">${txn.status || 'SETTLED'}</span>
                <button type="button" id="details-top-edit-txn" class="px-2.5 py-1 bg-white hover:bg-[#F0F9FF] text-[#0284C7] border border-[#BAE6FD] rounded text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shadow-2xs" title="Edit this transaction">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                  <span>Edit</span>
                </button>
                <button type="button" id="details-top-delete-txn" class="px-2.5 py-1 bg-white hover:bg-[#FFEBE6] text-[#BF2600] border border-[#FFBDAD] rounded text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shadow-2xs" title="Delete this transaction">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  <span>Delete</span>
                </button>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
              <!-- 1. Payment Mode -->
              <div class="p-2.5 bg-white border border-[#DFE1E6] rounded">
                <span class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-0.5">Payment Mode</span>
                <span class="font-bold text-[#172B4D]">${mode}</span>
              </div>

              <!-- 2. Voucher No -->
              <div class="p-2.5 bg-white border border-[#DFE1E6] rounded">
                <span class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-0.5">Voucher No</span>
                <span class="font-bold text-[#17191c]">${voucherNo}</span>
              </div>

              <!-- 3. Cheque/NEFT.No -->
              <div class="p-2.5 bg-white border border-[#DFE1E6] rounded">
                <span class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-0.5">Cheque/NEFT.No</span>
                <span class="font-bold text-[#172B4D]">${chqNeft}</span>
              </div>

              <!-- 4. Amount -->
              <div class="p-2.5 bg-white border border-[#DFE1E6] rounded">
                <span class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-0.5">Amount</span>
                <span class="font-bold text-[#006644]">₹ ${amt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>

              <!-- 5. Comments -->
              <div class="p-2.5 bg-white border border-[#DFE1E6] rounded">
                <span class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-0.5">Comments</span>
                <span class="text-[#172B4D] truncate block" title="${comments}">${comments}</span>
              </div>
            </div>
          </div>

          <!-- Table Section (10 Columns matching exact specification) -->
          <div class="border border-[#EBECF0] rounded-xl overflow-hidden shadow-2xs">
            <div class="px-4 py-2.5 bg-[#FAFBFC] border-b border-[#EBECF0] flex items-center justify-between">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-[#0284C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                <h4 class="text-xs font-bold text-[#172B4D] uppercase tracking-wider">Settlement Invoices &amp; Bills</h4>
              </div>
              <span class="text-[11px] text-[#5E6C84]">1 Invoice attached</span>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead class="bg-[#FAFBFC] border-b border-[#EBECF0] text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider whitespace-nowrap">
                  <tr>
                    <th class="px-3 py-2.5">Bill No.</th>
                    <th class="px-3 py-2.5">Bill Date</th>
                    <th class="px-3 py-2.5">Supplier Name</th>
                    <th class="px-3 py-2.5 text-right">Total Bill Amount</th>
                    <th class="px-3 py-2.5 text-right">TDS</th>
                    <th class="px-3 py-2.5 text-right">Bill Amt</th>
                    <th class="px-3 py-2.5 text-right">Already Paid</th>
                    <th class="px-3 py-2.5 text-right">Balance Value</th>
                    <th class="px-3 py-2.5 text-right">Amount</th>
                    <th class="px-3 py-2.5 text-right">Remainings</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[#EBECF0] bg-white text-xs">
                  <tr class="hover:bg-[#F4F5F7] transition-colors">
                    <td class="px-3 py-2.5 font-bold text-[#17191c] whitespace-nowrap">${billNo}</td>
                    <td class="px-3 py-2.5 whitespace-nowrap">${txn.date || '06-10-2026'}</td>
                    <td class="px-3 py-2.5 font-semibold text-[#172B4D] whitespace-nowrap">${txn.supplier}</td>
                    <td class="px-3 py-2.5 text-right font-medium whitespace-nowrap">${amt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td class="px-3 py-2.5 text-right text-[#5E6C84] whitespace-nowrap">0.00</td>
                    <td class="px-3 py-2.5 text-right font-medium whitespace-nowrap">${amt}</td>
                    <td class="px-3 py-2.5 text-right text-[#5E6C84] whitespace-nowrap">0</td>
                    <td class="px-3 py-2.5 text-right font-bold text-[#172B4D] whitespace-nowrap">${amt.toFixed(2)}</td>
                    <td class="px-3 py-2.5 text-right font-bold text-[#006644] whitespace-nowrap">${amt.toFixed(2)}</td>
                    <td class="px-3 py-2.5 text-right font-bold text-[#5E6C84] whitespace-nowrap">0.00</td>
                  </tr>
                </tbody>
                <tfoot class="bg-[#F4F5F7] border-t-2 border-[#DFE1E6] text-xs font-bold text-[#172B4D]">
                  <tr>
                    <td colspan="3" class="px-3 py-2.5 text-right uppercase tracking-wider text-[#5E6C84]">Total:</td>
                    <td class="px-3 py-2.5 text-right whitespace-nowrap">${amt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td class="px-3 py-2.5 text-right text-[#5E6C84] whitespace-nowrap">0.00</td>
                    <td class="px-3 py-2.5 text-right whitespace-nowrap">${amt}</td>
                    <td class="px-3 py-2.5 text-right text-[#5E6C84] whitespace-nowrap">0</td>
                    <td class="px-3 py-2.5 text-right whitespace-nowrap">${amt.toFixed(2)}</td>
                    <td class="px-3 py-2.5 text-right text-[#006644] whitespace-nowrap">${amt.toFixed(2)}</td>
                    <td class="px-3 py-2.5 text-right text-[#5E6C84] whitespace-nowrap">0.00</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <!-- Total Amount Summary Bar Below the Table -->
            <div class="px-4 py-3 bg-[#FAFBFC] border-t border-[#EBECF0] flex flex-wrap items-center justify-between gap-3">
              <div class="flex items-center gap-2">
                <span class="text-xs font-semibold text-[#5E6C84]">Settlement Invoices &amp; Bills Total:</span>
                <span class="text-xs font-bold text-[#172B4D] bg-[#EBECF0] px-2 py-0.5 rounded">1 Record</span>
              </div>
              <div class="flex items-center gap-6">
                <div class="text-right">
                  <span class="text-[10px] font-bold uppercase tracking-wider text-[#5E6C84] block">Total Bill Amount</span>
                  <span class="text-xs font-bold text-[#172B4D]">₹ ${amt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div class="text-right">
                  <span class="text-[10px] font-bold uppercase tracking-wider text-[#5E6C84] block">Balance Value</span>
                  <span class="text-xs font-bold text-[#172B4D]">₹ ${amt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div class="text-right pl-3 border-l border-[#DFE1E6]">
                  <span class="text-[11px] font-bold uppercase tracking-wider text-[#17191c] block">Total Amount</span>
                  <span class="text-base font-extrabold text-[#006644]">₹ ${amt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
      footerButtons: [
        { label: 'Close', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Delete Transaction',
          type: 'destructive',
          onClick: (m) => {
            m.close();
            PurchaseView.deleteTransaction(txn, PurchaseView.commercialTxnsTable);
          }
        },
        {
          label: 'Edit Transaction',
          type: 'primary',
          onClick: (m) => {
            m.close();
            PurchaseView.openEditTransactionModal(txn, PurchaseView.commercialTxnsTable);
          }
        },
        {
          label: 'Download Record',
          type: 'secondary',
          onClick: (m) => PurchaseView.downloadRecord(txn)
        }
      ]
    });

    setTimeout(() => {
      const eb = document.getElementById('details-top-edit-txn');
      if (eb) eb.addEventListener('click', () => {
        Modal.close();
        PurchaseView.openEditTransactionModal(txn, PurchaseView.commercialTxnsTable);
      });
      const db = document.getElementById('details-top-delete-txn');
      if (db) db.addEventListener('click', () => {
        Modal.close();
        PurchaseView.deleteTransaction(txn, PurchaseView.commercialTxnsTable);
      });
    }, 50);
  },

  openAddTransactionModal(tableInstance) {
    Modal.open({
      title: 'Add Commercial Transaction',
      size: 'xl',
      content: `
        <form class="space-y-4">
          <!-- Top Form Fields Card (5 Fields) -->
          <div class="bg-[#FAFBFC] border border-[#EBECF0] rounded-xl p-4 shadow-2xs">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
              <!-- 1. Payment Mode - Dropdown (Select) -->
              <div>
                <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">Payment Mode</label>
                <select id="modal-pay-mode" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                  <option value="">Select</option>
                  <option value="NEFT" selected>NEFT</option>
                  <option value="RTGS">RTGS</option>
                  <option value="Direct Bank Transfer">Direct Bank Transfer</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Cash Voucher">Cash Voucher</option>
                </select>
              </div>

              <!-- 2. Voucher No - Text Input (Enter Voucher No) -->
              <div>
                <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">Voucher No</label>
                <input type="text" id="modal-pay-voucher-no" placeholder="Enter Voucher No" value="VCH-2026-9041" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" />
              </div>

              <!-- 3. Cheque/NEFT.No - Text Input (Enter Cheque/NEFT.No) -->
              <div>
                <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">Cheque/NEFT.No</label>
                <input type="text" id="modal-pay-cheque-neft" placeholder="Enter Cheque/NEFT.No" value="NEFT-9912048" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" />
              </div>

              <!-- 4. Amount - Text Input (11000.00) -->
              <div>
                <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">Amount</label>
                <input type="text" id="modal-pay-amount" placeholder="11000.00" value="11000.00" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded font-bold text-[#172B4D] focus:outline-none focus:border-[#0284C7]" />
              </div>

              <!-- 5. Comments - Text Input (Enter Comments) -->
              <div>
                <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">Comments</label>
                <input type="text" id="modal-pay-comments" placeholder="Enter Comments" value="Harvest settlement payment for pond intake" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" />
              </div>
            </div>
          </div>

          <!-- Table Section (10 Columns matching exact specification) -->
          <div class="border border-[#EBECF0] rounded-xl overflow-hidden shadow-2xs">
            <div class="px-4 py-2.5 bg-[#FAFBFC] border-b border-[#EBECF0] flex items-center justify-between">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-[#0284C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                <h4 class="text-xs font-bold text-[#172B4D] uppercase tracking-wider">Settlement Invoices &amp; Bills</h4>
              </div>
              <span class="text-[11px] text-[#5E6C84]">1 Invoice attached</span>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead class="bg-[#FAFBFC] border-b border-[#EBECF0] text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider whitespace-nowrap">
                  <tr>
                    <th class="px-3 py-2.5">Bill No.</th>
                    <th class="px-3 py-2.5">Bill Date</th>
                    <th class="px-3 py-2.5">Supplier Name</th>
                    <th class="px-3 py-2.5 text-right">Total Bill Amount</th>
                    <th class="px-3 py-2.5 text-right">TDS</th>
                    <th class="px-3 py-2.5 text-right">Bill Amt</th>
                    <th class="px-3 py-2.5 text-right">Already Paid</th>
                    <th class="px-3 py-2.5 text-right">Balance Value</th>
                    <th class="px-3 py-2.5 text-right">Amount</th>
                    <th class="px-3 py-2.5 text-right">Remainings</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[#EBECF0] bg-white text-xs">
                  <tr class="hover:bg-[#F4F5F7] transition-colors">
                    <td class="px-3 py-2.5 font-bold text-[#17191c] whitespace-nowrap">AMP/2627/2967</td>
                    <td class="px-3 py-2.5 whitespace-nowrap">06-10-2026</td>
                    <td class="px-3 py-2.5 font-semibold text-[#172B4D] whitespace-nowrap">L.G SEA FOODS(D HARIBABU)</td>
                    <td class="px-3 py-2.5 text-right font-medium whitespace-nowrap">11,000.00</td>
                    <td class="px-3 py-2.5 text-right text-[#5E6C84] whitespace-nowrap">0.00</td>
                    <td class="px-3 py-2.5 text-right font-medium whitespace-nowrap">11000</td>
                    <td class="px-3 py-2.5 text-right text-[#5E6C84] whitespace-nowrap">0</td>
                    <td class="px-3 py-2.5 text-right font-bold text-[#172B4D] whitespace-nowrap">11000.00</td>
                    <td class="px-3 py-2.5 text-right whitespace-nowrap">
                      <input type="text" id="modal-table-amount-input" value="11000.00" class="w-24 text-right text-xs px-2 py-1 border border-[#DFE1E6] rounded font-bold text-[#006644] focus:outline-none focus:border-[#0284C7]" />
                    </td>
                    <td class="px-3 py-2.5 text-right font-bold text-[#5E6C84] whitespace-nowrap" id="modal-table-remainings">0.00</td>
                  </tr>
                </tbody>
                <tfoot class="bg-[#F4F5F7] border-t-2 border-[#DFE1E6] text-xs font-bold text-[#172B4D]">
                  <tr>
                    <td colspan="3" class="px-3 py-2.5 text-right uppercase tracking-wider text-[#5E6C84]">Total:</td>
                    <td class="px-3 py-2.5 text-right whitespace-nowrap">11,000.00</td>
                    <td class="px-3 py-2.5 text-right text-[#5E6C84] whitespace-nowrap">0.00</td>
                    <td class="px-3 py-2.5 text-right whitespace-nowrap">11000</td>
                    <td class="px-3 py-2.5 text-right text-[#5E6C84] whitespace-nowrap">0</td>
                    <td class="px-3 py-2.5 text-right whitespace-nowrap">11000.00</td>
                    <td class="px-3 py-2.5 text-right text-[#006644] whitespace-nowrap" id="modal-table-foot-amount">11000.00</td>
                    <td class="px-3 py-2.5 text-right text-[#5E6C84] whitespace-nowrap" id="modal-table-foot-remainings">0.00</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <!-- Total Amount Summary Bar Below the Table -->
            <div class="px-4 py-3 bg-[#FAFBFC] border-t border-[#EBECF0] flex flex-wrap items-center justify-between gap-3">
              <div class="flex items-center gap-2">
                <span class="text-xs font-semibold text-[#5E6C84]">Settlement Invoices &amp; Bills Total:</span>
                <span class="text-xs font-bold text-[#172B4D] bg-[#EBECF0] px-2 py-0.5 rounded">1 Record</span>
              </div>
              <div class="flex items-center gap-6">
                <div class="text-right">
                  <span class="text-[10px] font-bold uppercase tracking-wider text-[#5E6C84] block">Total Bill Amount</span>
                  <span class="text-xs font-bold text-[#172B4D]">₹ 11,000.00</span>
                </div>
                <div class="text-right">
                  <span class="text-[10px] font-bold uppercase tracking-wider text-[#5E6C84] block">Balance Value</span>
                  <span class="text-xs font-bold text-[#172B4D]">₹ 11,000.00</span>
                </div>
                <div class="text-right pl-3 border-l border-[#DFE1E6]">
                  <span class="text-[11px] font-bold uppercase tracking-wider text-[#17191c] block">Total Amount</span>
                  <span class="text-base font-extrabold text-[#006644]" id="modal-summary-total-amount">₹ 11,000.00</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        { 
          label: 'Save & Disburse Transaction', 
          type: 'primary', 
          onClick: (m) => {
            const mode = document.getElementById('modal-pay-mode')?.value || 'NEFT';
            const voucherNo = document.getElementById('modal-pay-voucher-no')?.value || 'VCH-2026-9041';
            const chqNeft = document.getElementById('modal-pay-cheque-neft')?.value || 'NEFT-9912048';
            const amtStr = document.getElementById('modal-pay-amount')?.value || '11000.00';
            const comments = document.getElementById('modal-pay-comments')?.value || '';
            const inr = parseFloat(amtStr.replace(/,/g, '')) || 11000;

            if (!mode) {
              Toast.show('Please select a payment mode.', 'warning');
              return;
            }

            const newTxn = {
              sNo: 1,
              txnId: `CTX-2026-${Math.floor(1000 + Math.random() * 9000)}`,
              date: '06/10/2026',
              rawDate: '2026-10-06',
              center: 'Amalapuram Harvesters #4',
              supplier: 'L.G SEA FOODS(D HARIBABU)',
              agent: 'Direct Farmer',
              plant: 'DFL UNIT-6 (JPT-II)',
              billNo: 'AMP/2627/2967',
              voucherNo: voucherNo,
              bankRef: chqNeft,
              paymentMode: mode,
              description: `${comments || 'Bill Settlement AMP/2627/2967'} [${mode} Ref: ${chqNeft}]`,
              amountInr: inr,
              amountUsd: Math.round(inr / 83),
              type: 'PURCHASE_PAYABLE',
              status: 'SETTLED'
            };

            PurchaseView.commercialTxns.unshift(newTxn);
            PurchaseView.commercialTxns.forEach((item, idx) => item.sNo = idx + 1);
            if (tableInstance) tableInstance.setData(PurchaseView.commercialTxns);

            if (PurchaseView.paymentsList) {
              PurchaseView.paymentsList.unshift({
                sNo: 1,
                voucherNo: voucherNo,
                paymentDate: '06/10/2026',
                rawDate: '2026-10-06',
                center: 'Amalapuram Harvesters #4',
                type: 'PURCHASE_PAYABLE',
                supplierName: 'L.G SEA FOODS(D HARIBABU)',
                agent: 'Direct Farmer',
                plant: 'DFL UNIT-6 (JPT-II)',
                billNo: 'AMP/2627/2967',
                bankRef: chqNeft,
                amountInr: inr,
                amountUsd: Math.round(inr / 83),
                paymentMode: mode,
                status: 'COMPLETED'
              });
            }

            m.close();

            // Confirmation message on add action
            Modal.success({
              title: 'Commercial Transaction Added Successfully',
              message: `Commercial transaction <strong>${newTxn.txnId}</strong> (Voucher <strong>${voucherNo}</strong>) has been recorded in the commercial ledger.`,
              details: [
                { label: 'Txn Ref', value: newTxn.txnId },
                { label: 'Voucher No', value: voucherNo },
                { label: 'Party / Supplier', value: newTxn.supplier },
                { label: 'Amount', value: `₹ ${inr.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
                { label: 'Payment Mode', value: mode }
              ]
            });
            Toast.show(`Commercial transaction ${newTxn.txnId} added successfully.`, 'success');
          }
        }
      ]
    });

    // Dynamic 2-way sync between form Amount and table Amount/Remainings/Total
    setTimeout(() => {
      const topAmt = document.getElementById('modal-pay-amount');
      const tblAmt = document.getElementById('modal-table-amount-input');
      const remEl = document.getElementById('modal-table-remainings');
      const footAmt = document.getElementById('modal-table-foot-amount');
      const footRem = document.getElementById('modal-table-foot-remainings');
      const summaryAmt = document.getElementById('modal-summary-total-amount');

      const updateSync = (val) => {
        const entered = parseFloat(val) || 0;
        const balance = 11000;
        const remain = Math.max(0, balance - entered);
        if (remEl) {
          remEl.textContent = remain.toFixed(2);
          if (remain > 0) {
            remEl.className = 'px-3 py-2.5 text-right font-bold text-[#BF2600] whitespace-nowrap';
          } else {
            remEl.className = 'px-3 py-2.5 text-right font-bold text-[#5E6C84] whitespace-nowrap';
          }
        }
        if (footAmt) {
          footAmt.textContent = entered.toFixed(2);
        }
        if (footRem) {
          footRem.textContent = remain.toFixed(2);
          footRem.className = remain > 0 ? 'px-3 py-2.5 text-right font-bold text-[#BF2600] whitespace-nowrap' : 'px-3 py-2.5 text-right text-[#5E6C84] whitespace-nowrap';
        }
        if (summaryAmt) {
          summaryAmt.textContent = `₹ ${entered.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }
      };

      if (tblAmt) {
        tblAmt.addEventListener('input', (e) => {
          if (topAmt) topAmt.value = e.target.value;
          updateSync(e.target.value);
        });
      }

      if (topAmt) {
        topAmt.addEventListener('input', (e) => {
          if (tblAmt) tblAmt.value = e.target.value;
          updateSync(e.target.value);
        });
      }
    }, 50);
  },

  openEditTransactionModal(txn, tableInstance) {
    const billNo = txn.billNo || ('AMP/2627/' + (txn.txnId ? txn.txnId.replace(/\D/g, '').slice(-4) : '2967'));
    const voucherNo = txn.voucherNo || ('VCH-2026-' + (txn.txnId ? txn.txnId.split('-')[2] : '9041'));
    const chqNeft = txn.bankRef || txn.chqNeft || ('NEFT-' + (txn.txnId ? txn.txnId.replace(/\D/g, '') : '9912048'));
    const mode = txn.paymentMode || 'NEFT';
    const initialAmt = parseFloat(txn.amountInr) || 11000;
    const comments = txn.description || 'Harvest settlement payment for pond intake';

    Modal.open({
      title: `Edit Commercial Transaction: ${txn.txnId}`,
      size: 'xl',
      content: `
        <form class="space-y-4">
          <!-- Top Form Fields Card (5 Fields in Edit Mode) -->
          <div class="bg-[#FAFBFC] border border-[#EBECF0] rounded-xl p-4 shadow-2xs">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
              <!-- 1. Payment Mode - Dropdown (Select) -->
              <div>
                <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">Payment Mode</label>
                <select id="edit-pay-mode" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                  <option value="">Select</option>
                  <option value="NEFT" ${mode === 'NEFT' ? 'selected' : ''}>NEFT</option>
                  <option value="RTGS" ${mode === 'RTGS' ? 'selected' : ''}>RTGS</option>
                  <option value="Direct Bank Transfer" ${mode === 'Direct Bank Transfer' ? 'selected' : ''}>Direct Bank Transfer</option>
                  <option value="Cheque" ${mode === 'Cheque' ? 'selected' : ''}>Cheque</option>
                  <option value="Cash Voucher" ${mode === 'Cash Voucher' ? 'selected' : ''}>Cash Voucher</option>
                </select>
              </div>

              <!-- 2. Voucher No - Text Input (Enter Voucher No) -->
              <div>
                <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">Voucher No</label>
                <input type="text" id="edit-pay-voucher-no" placeholder="Enter Voucher No" value="${voucherNo}" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" />
              </div>

              <!-- 3. Cheque/NEFT.No - Text Input (Enter Cheque/NEFT.No) -->
              <div>
                <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">Cheque/NEFT.No</label>
                <input type="text" id="edit-pay-cheque-neft" placeholder="Enter Cheque/NEFT.No" value="${chqNeft}" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" />
              </div>

              <!-- 4. Amount - Text Input -->
              <div>
                <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">Amount</label>
                <input type="text" id="edit-pay-amount" placeholder="11000.00" value="${initialAmt.toFixed(2)}" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded font-bold text-[#172B4D] focus:outline-none focus:border-[#0284C7]" />
              </div>

              <!-- 5. Comments - Text Input (Enter Comments) -->
              <div>
                <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">Comments</label>
                <input type="text" id="edit-pay-comments" placeholder="Enter Comments" value="${comments}" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" />
              </div>
            </div>
          </div>

          <!-- Table Section (10 Columns matching exact specification) -->
          <div class="border border-[#EBECF0] rounded-xl overflow-hidden shadow-2xs">
            <div class="px-4 py-2.5 bg-[#FAFBFC] border-b border-[#EBECF0] flex items-center justify-between">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-[#0284C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                <h4 class="text-xs font-bold text-[#172B4D] uppercase tracking-wider">Settlement Invoices &amp; Bills</h4>
              </div>
              <span class="text-[11px] text-[#5E6C84]">1 Invoice attached</span>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead class="bg-[#FAFBFC] border-b border-[#EBECF0] text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider whitespace-nowrap">
                  <tr>
                    <th class="px-3 py-2.5">Bill No.</th>
                    <th class="px-3 py-2.5">Bill Date</th>
                    <th class="px-3 py-2.5">Supplier Name</th>
                    <th class="px-3 py-2.5 text-right">Total Bill Amount</th>
                    <th class="px-3 py-2.5 text-right">TDS</th>
                    <th class="px-3 py-2.5 text-right">Bill Amt</th>
                    <th class="px-3 py-2.5 text-right">Already Paid</th>
                    <th class="px-3 py-2.5 text-right">Balance Value</th>
                    <th class="px-3 py-2.5 text-right">Amount</th>
                    <th class="px-3 py-2.5 text-right">Remainings</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[#EBECF0] bg-white text-xs">
                  <tr class="hover:bg-[#F4F5F7] transition-colors">
                    <td class="px-3 py-2.5 font-bold text-[#17191c] whitespace-nowrap">${billNo}</td>
                    <td class="px-3 py-2.5 whitespace-nowrap">${txn.date || '06-10-2026'}</td>
                    <td class="px-3 py-2.5 font-semibold text-[#172B4D] whitespace-nowrap">${txn.supplier}</td>
                    <td class="px-3 py-2.5 text-right font-medium whitespace-nowrap" id="edit-tbl-total-bill-amt">${initialAmt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td class="px-3 py-2.5 text-right text-[#5E6C84] whitespace-nowrap">0.00</td>
                    <td class="px-3 py-2.5 text-right font-medium whitespace-nowrap" id="edit-tbl-bill-amt">${initialAmt}</td>
                    <td class="px-3 py-2.5 text-right text-[#5E6C84] whitespace-nowrap">0</td>
                    <td class="px-3 py-2.5 text-right font-bold text-[#172B4D] whitespace-nowrap" id="edit-tbl-bal-value">${initialAmt.toFixed(2)}</td>
                    <td class="px-3 py-2.5 text-right whitespace-nowrap">
                      <input type="text" id="edit-table-amount-input" value="${initialAmt.toFixed(2)}" class="w-24 text-right text-xs px-2 py-1 border border-[#DFE1E6] rounded font-bold text-[#006644] focus:outline-none focus:border-[#0284C7]" />
                    </td>
                    <td class="px-3 py-2.5 text-right font-bold text-[#5E6C84] whitespace-nowrap" id="edit-table-remainings">0.00</td>
                  </tr>
                </tbody>
                <tfoot class="bg-[#F4F5F7] border-t-2 border-[#DFE1E6] text-xs font-bold text-[#172B4D]">
                  <tr>
                    <td colspan="3" class="px-3 py-2.5 text-right uppercase tracking-wider text-[#5E6C84]">Total:</td>
                    <td class="px-3 py-2.5 text-right whitespace-nowrap" id="edit-foot-total-bill-amt">${initialAmt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td class="px-3 py-2.5 text-right text-[#5E6C84] whitespace-nowrap">0.00</td>
                    <td class="px-3 py-2.5 text-right whitespace-nowrap" id="edit-foot-bill-amt">${initialAmt}</td>
                    <td class="px-3 py-2.5 text-right text-[#5E6C84] whitespace-nowrap">0</td>
                    <td class="px-3 py-2.5 text-right whitespace-nowrap" id="edit-foot-bal-value">${initialAmt.toFixed(2)}</td>
                    <td class="px-3 py-2.5 text-right text-[#006644] whitespace-nowrap" id="edit-table-foot-amount">${initialAmt.toFixed(2)}</td>
                    <td class="px-3 py-2.5 text-right text-[#5E6C84] whitespace-nowrap" id="edit-table-foot-remainings">0.00</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <!-- Total Amount Summary Bar Below the Table -->
            <div class="px-4 py-3 bg-[#FAFBFC] border-t border-[#EBECF0] flex flex-wrap items-center justify-between gap-3">
              <div class="flex items-center gap-2">
                <span class="text-xs font-semibold text-[#5E6C84]">Settlement Invoices &amp; Bills Total:</span>
                <span class="text-xs font-bold text-[#172B4D] bg-[#EBECF0] px-2 py-0.5 rounded">1 Record</span>
              </div>
              <div class="flex items-center gap-6">
                <div class="text-right">
                  <span class="text-[10px] font-bold uppercase tracking-wider text-[#5E6C84] block">Total Bill Amount</span>
                  <span class="text-xs font-bold text-[#172B4D]" id="edit-summary-total-bill-amt">₹ ${initialAmt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div class="text-right">
                  <span class="text-[10px] font-bold uppercase tracking-wider text-[#5E6C84] block">Balance Value</span>
                  <span class="text-xs font-bold text-[#172B4D]" id="edit-summary-bal-value">₹ ${initialAmt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div class="text-right pl-3 border-l border-[#DFE1E6]">
                  <span class="text-[11px] font-bold uppercase tracking-wider text-[#17191c] block">Total Amount</span>
                  <span class="text-base font-extrabold text-[#006644]" id="edit-summary-total-amount">₹ ${initialAmt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        { 
          label: 'Save Changes', 
          type: 'primary', 
          onClick: (m) => {
            const newMode = document.getElementById('edit-pay-mode')?.value || mode;
            const newVoucherNo = document.getElementById('edit-pay-voucher-no')?.value || voucherNo;
            const newChqNeft = document.getElementById('edit-pay-cheque-neft')?.value || chqNeft;
            const amtStr = document.getElementById('edit-pay-amount')?.value || initialAmt.toString();
            const newComments = document.getElementById('edit-pay-comments')?.value || comments;
            const inr = parseFloat(amtStr.replace(/,/g, '')) || initialAmt;

            if (!newMode) {
              Toast.show('Please select a payment mode.', 'warning');
              return;
            }

            txn.paymentMode = newMode;
            txn.voucherNo = newVoucherNo;
            txn.bankRef = newChqNeft;
            txn.amountInr = inr;
            txn.amountUsd = Math.round(inr / 83);
            txn.description = newComments;
            txn.billNo = billNo;

            if (PurchaseView.paymentsList) {
              const p = PurchaseView.paymentsList.find(item => item.voucherNo === voucherNo || item.billNo === billNo);
              if (p) {
                p.voucherNo = newVoucherNo;
                p.bankRef = newChqNeft;
                p.amountInr = inr;
                p.amountUsd = Math.round(inr / 83);
                p.paymentMode = newMode;
              }
            }

            if (tableInstance) tableInstance.setData(PurchaseView.commercialTxns);
            m.close();

            // Confirmation message on edit action
            Modal.success({
              title: 'Commercial Transaction Updated Successfully',
              message: `Transaction <strong>${txn.txnId}</strong> (Voucher <strong>${newVoucherNo}</strong>) has been updated in the commercial ledger.`,
              details: [
                { label: 'Txn Ref', value: txn.txnId },
                { label: 'Voucher No', value: newVoucherNo },
                { label: 'Party / Supplier', value: txn.supplier },
                { label: 'Amount', value: `₹ ${inr.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
                { label: 'Payment Mode', value: newMode }
              ]
            });
            Toast.show(`Transaction ${txn.txnId} updated successfully.`, 'success');
          }
        }
      ]
    });

    // Dynamic 2-way sync between form Amount and table Amount/Remainings/Total
    setTimeout(() => {
      const topAmt = document.getElementById('edit-pay-amount');
      const tblAmt = document.getElementById('edit-table-amount-input');
      const remEl = document.getElementById('edit-table-remainings');
      const footAmt = document.getElementById('edit-table-foot-amount');
      const footRem = document.getElementById('edit-table-foot-remainings');
      const summaryAmt = document.getElementById('edit-summary-total-amount');

      const updateSync = (val) => {
        const entered = parseFloat(val) || 0;
        const balance = initialAmt;
        const remain = Math.max(0, balance - entered);
        if (remEl) {
          remEl.textContent = remain.toFixed(2);
          if (remain > 0) {
            remEl.className = 'px-3 py-2.5 text-right font-bold text-[#BF2600] whitespace-nowrap';
          } else {
            remEl.className = 'px-3 py-2.5 text-right font-bold text-[#5E6C84] whitespace-nowrap';
          }
        }
        if (footAmt) {
          footAmt.textContent = entered.toFixed(2);
        }
        if (footRem) {
          footRem.textContent = remain.toFixed(2);
          footRem.className = remain > 0 ? 'px-3 py-2.5 text-right font-bold text-[#BF2600] whitespace-nowrap' : 'px-3 py-2.5 text-right text-[#5E6C84] whitespace-nowrap';
        }
        if (summaryAmt) {
          summaryAmt.textContent = `₹ ${entered.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }
      };

      if (tblAmt) {
        tblAmt.addEventListener('input', (e) => {
          if (topAmt) topAmt.value = e.target.value;
          updateSync(e.target.value);
        });
      }

      if (topAmt) {
        topAmt.addEventListener('input', (e) => {
          if (tblAmt) tblAmt.value = e.target.value;
          updateSync(e.target.value);
        });
      }
    }, 50);
  },

  deleteTransaction(txn, tableInstance) {
    Modal.confirm({
      title: `Delete Transaction ${txn.txnId}`,
      message: `Are you sure you want to void this commercial ledger transaction <strong>${txn.txnId}</strong> for party <strong>${txn.supplier}</strong> (₹ ${(txn.amountInr || 0).toLocaleString()})?`,
      isDestructive: true,
      onConfirm: () => {
        const idx = PurchaseView.commercialTxns.findIndex(t => t.txnId === txn.txnId);
        if (idx > -1) {
          PurchaseView.commercialTxns.splice(idx, 1);
          PurchaseView.commercialTxns.forEach((t, i) => t.sNo = i + 1);
          if (tableInstance) tableInstance.setData(PurchaseView.commercialTxns);

          // Confirmation message on delete action
          Modal.success({
            title: 'Commercial Transaction Voided',
            message: `Commercial ledger transaction <strong>${txn.txnId}</strong> has been voided and deleted.`,
            details: [
              { label: 'Txn Ref', value: txn.txnId },
              { label: 'Party / Supplier', value: txn.supplier },
              { label: 'Amount', value: `₹ ${(txn.amountInr || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` }
            ]
          });
          Toast.show(`Transaction ${txn.txnId} voided and removed from ledger.`, 'success');
        }
      }
    });
  },

  showPaymentDetails(payment) {
    Modal.open({
      title: `Payment Voucher: ${payment.voucherNo}`,
      size: 'md',
      content: `
        <div class="space-y-4 text-xs">
          <div class="p-3 bg-[#FAFBFC] text-[#172B4D] rounded-lg border border-[#DFE1E6] flex flex-wrap items-center justify-between gap-2">
            <div>
              <span class="font-bold text-sm text-[#172B4D]">${payment.voucherNo}</span>
              <span class="ml-2 text-xs text-[#5E6C84]">(${payment.paymentDate})</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="lozenge lozenge-success font-bold">${payment.status}</span>
              <button type="button" id="details-top-edit-payment" class="px-2.5 py-1 bg-white hover:bg-[#F0F9FF] text-[#0284C7] border border-[#BAE6FD] rounded text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shadow-2xs" title="Edit this payment voucher">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                <span>Edit</span>
              </button>
              <button type="button" id="details-top-delete-payment" class="px-2.5 py-1 bg-white hover:bg-[#FFEBE6] text-[#BF2600] border border-[#FFBDAD] rounded text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shadow-2xs" title="Delete this payment voucher">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                <span>Delete</span>
              </button>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="p-2.5 bg-[#FAFBFC] border border-[#EBECF0] rounded">
              <span class="text-[#6B778C] text-[11px] block">Beneficiary Supplier</span>
              <span class="font-bold text-[#172B4D]">${payment.supplierName}</span>
            </div>
            <div class="p-2.5 bg-[#FAFBFC] border border-[#EBECF0] rounded">
              <span class="text-[#6B778C] text-[11px] block">Against Bill No</span>
              <span class="font-bold text-[#172B4D]">${payment.billNo}</span>
            </div>
            <div class="p-2.5 bg-[#FAFBFC] border border-[#EBECF0] rounded">
              <span class="text-[#6B778C] text-[11px] block">Payment Mode</span>
              <span class="font-bold text-[#172B4D]">${payment.paymentMode || 'RTGS Wire'}</span>
            </div>
            <div class="p-2.5 bg-[#FAFBFC] border border-[#EBECF0] rounded">
              <span class="text-[#6B778C] text-[11px] block">Bank Ref / UTR</span>
              <span class="font-bold text-[#172B4D]">${payment.bankRef || 'SBIN20261006091'}</span>
            </div>
          </div>
          <div class="p-3 bg-[#E3FCEF] border border-[#ABF5D1] rounded flex justify-between items-center">
            <span class="text-[#006644] font-bold">Total Paid Amount</span>
            <span class="text-base font-extrabold text-[#006644]">₹ ${(payment.amountInr || 0).toLocaleString()} ($ ${(payment.amountUsd || 0).toLocaleString()})</span>
          </div>
        </div>
      `,
      footerButtons: [
        { label: 'Close', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Delete Voucher',
          type: 'destructive',
          onClick: (m) => {
            m.close();
            PurchaseView.deletePayment(payment, PurchaseView.paymentsTable);
          }
        },
        {
          label: 'Edit Voucher',
          type: 'primary',
          onClick: (m) => {
            m.close();
            PurchaseView.openEditPaymentModal(payment, PurchaseView.paymentsTable);
          }
        },
        {
          label: 'Download Record',
          type: 'secondary',
          onClick: (m) => PurchaseView.downloadRecord(payment)
        }
      ]
    });

    setTimeout(() => {
      const eb = document.getElementById('details-top-edit-payment');
      if (eb) eb.addEventListener('click', () => {
        Modal.close();
        PurchaseView.openEditPaymentModal(payment, PurchaseView.paymentsTable);
      });
      const db = document.getElementById('details-top-delete-payment');
      if (db) db.addEventListener('click', () => {
        Modal.close();
        PurchaseView.deletePayment(payment, PurchaseView.paymentsTable);
      });
    }, 50);
  },

  openEditPaymentModal(payment, tableInstance) {
    Modal.open({
      title: `Edit Payment Voucher: ${payment.voucherNo}`,
      size: 'md',
      content: `
        <form id="edit-pay-form" class="space-y-3 text-xs">
          <div>
            <label class="block font-semibold text-[#172B4D] mb-1">Voucher Number</label>
            <input type="text" value="${payment.voucherNo}" disabled class="w-full text-xs px-3 py-1.5 bg-[#F4F5F7] border border-[#DFE1E6] rounded text-[#5E6C84] cursor-not-allowed" />
          </div>
          <div>
            <label class="block font-semibold text-[#172B4D] mb-1">Beneficiary Supplier</label>
            <input type="text" id="editpay-supplier" value="${payment.supplierName}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-semibold text-[#172B4D] mb-1">Paid Amount (INR)</label>
              <input type="number" id="editpay-amount" value="${payment.amountInr}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" />
            </div>
            <div>
              <label class="block font-semibold text-[#172B4D] mb-1">Payment Status</label>
              <select id="editpay-status" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                <option value="CLEARED" ${payment.status === 'CLEARED' ? 'selected' : ''}>CLEARED</option>
                <option value="PROCESSING" ${payment.status === 'PROCESSING' ? 'selected' : ''}>PROCESSING</option>
                <option value="HELD" ${payment.status === 'HELD' ? 'selected' : ''}>HELD</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block font-semibold text-[#172B4D] mb-1">Bank Reference / UTR</label>
            <input type="text" id="editpay-ref" value="${payment.bankRef || ''}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" />
          </div>
        </form>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Save Changes',
          type: 'primary',
          onClick: (m) => {
            payment.supplierName = document.getElementById('editpay-supplier').value || payment.supplierName;
            payment.amountInr = parseFloat(document.getElementById('editpay-amount').value) || payment.amountInr;
            payment.amountUsd = Math.round(payment.amountInr / 83.2);
            payment.status = document.getElementById('editpay-status').value;
            payment.bankRef = document.getElementById('editpay-ref').value || payment.bankRef;
            if (tableInstance) tableInstance.setData(PurchaseView.paymentsList);
            m.close();
            Toast.show(`Payment voucher ${payment.voucherNo} updated.`, 'success');
          }
        }
      ]
    });
  },

  deletePayment(payment, tableInstance) {
    Modal.confirm({
      title: `Delete Payment Voucher ${payment.voucherNo}`,
      message: `Are you sure you want to delete payment voucher <strong>${payment.voucherNo}</strong>?`,
      confirmText: 'Delete Voucher',
      isDestructive: true,
      onConfirm: () => {
        const idx = PurchaseView.paymentsList.findIndex(p => p.voucherNo === payment.voucherNo);
        if (idx > -1) {
          PurchaseView.paymentsList.splice(idx, 1);
          if (tableInstance) tableInstance.setData(PurchaseView.paymentsList);
          Toast.show(`Payment voucher ${payment.voucherNo} removed.`, 'success');
        }
      }
    });
  }
};
