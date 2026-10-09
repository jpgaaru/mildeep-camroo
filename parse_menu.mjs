import fs from 'fs';

const rawList = `DASHBOARD

    Dashboard
    Purchase Dashboard
    RM Dashboard
    Production Dashboard
    Coldstore Dashboard
    Quality Control Dashboard
    CS Dashboard New

MASTER

    Exporter
        Add Exporter
    Processor
        Add Processor
    Payment Terms
        Add Payment Terms
    CHA
        Add Logistics
    Liners List
        Add Liner
    Description List
        Add Description
    Ports List
        Add Port
    Exchange Rates
        Add Exchange Rate
    Banks List
        Add Bank
    Store Delivery Details List
        Add Store Delivery Details
    Graders List
        Create Details
    Agents List
        Create Agent
    Financiers List
        Create Financier
    Drivers List
        Create Details
    Vehicle List
        Add Vehicle
    Yields
    Supervisor
        Create Details
    Traceability
    Lab Users List
        Doc Add Lab User Names
    HL VA Variety List
        Create HLVA Variety
    Countrywise Address List
        Create Countrywise Addresses
    Lab Analysis List
        Analysis Required Create
    External Lab Names
        Quality Control Lab Names Create
        Lab Names Create
    Tax Charges
        Create Tax Charges
    Currency
    VM Rates 2
        Add Purchase Rates M1
    Master Counts
        Master Add Counts
    Chemicals Buyers List
    Chemicals Master
    Chemicals Suppliers List
    Audit Categories Options List
        Audit Categories Option Create
    Audit Categories List
    Farms List
        Farm Master Create
    Certification Body List
        Certification Body Master Create
    Audit Dropdown Master
        Audit Dropdowns Master Create
    Hatchery List
        Hatchery Master Create
    Freight Rates
        Add Freight Rates New
    Liners Contracts
    Reciprocal Tariffs
    GST Master
    Prices Master
    Departments Master
    Brands Master
    Vendors Master
    General Items
    PO Tax Rates

BUYERS

    Buyer List
        Add Buyer Details
    Consignee List
        Add Consignee Details
    Notify Party List
        Add Notify Party Details
    Applicant List
        Create Applicant
    Brands List
        Add Brand

ORDERS

    Proforma List
        PI Generation
        PO Edit
        Proforma Inv
        Doc Proforma Invoice Print
        PO Breakup
    Custom Invoices
        Add Custom Invoice
        Custom Invoice
    ISF Details
        Add ISF Form
    ETA Status
    FDA Status
        Add FDA Details
    Clearing Agent
        Clearing Agent Form
    Shipping Bill
        Shipping Bill Form
    Commercial Invoice
        Add Commercial Invoice
        Doc Add Reports
    Running Orders
        Create Shipment Status
    Orders Status
    Shipments List

PAYMENTS

    Forward Contracts
        Add Forward Contract
    Collections
        Add Collection
    Negotiations
        Add Bill Of Exchange
        Add Collection
    Realization
        Realization Form
    Realization Done

INSURANCE

    Pending Insurance
    Insurance Templates
    Insurance Payments

REPORTS

    Pending Contracts
    Approved Contracts
    Out Of ETD/ETA Report
    FDA Examination Report
    MPEDA Report
    Shipment Report
    Lab Report
    Q Certificate Report
    Pending Payments
    Pending Negotiation Report
    Bills Realization
    FC Utilized Report
    GST Sales Report
    Clearing Agent Report
    M Transit Ins & Payments
    Packing Report
    Shipment Line Item Wise Report
    Purchase Report
    Purchase Count Wise
    Center Wise Report
    Supplier Bill Summary
    Center Wise Abstract Report
    Date Wise Abstract Report
    Supplier Wise Outstanding Report
    Monthly Abstract Report
    Bill & Date Wise Payment Summary
    Supplier Wise Abstract Report
    Supplier & Bill Wise Outstanding Amount
    Supplier Wise Ledger
        Supplier Wise Ledger Report
    Company Wise TDS Report
    Arrival Report
        Doc Excel RM Overall Arrival Report
    Return Container Report
    Freight Rates Report
    Agent Commission Report
    Price Book

PURCHASE

    Bookings
        Create Booking
    RM Arrival
    Arrivals
        Create Arrival
    Bills
        RM Bill
        Commission Bill Page 1
        Bulk Download Bills
        Commission Bill Page 2
    Payments
    Payments Summary
        Cash Payment Voucher
        Bank Payment Voucher
        Journal Payment Voucher

TICKETS

    Tickets

HELP

    Help Line

STOCK

    Stock In
    Stock Out

STORE

    View Store
    Rack Names
        Create Store Layout
    View Stock

SHIPMENTS

    Shipment Out

QUALITY CONTROL

    Documentation
        Doc Add Reports
        Doc CL Create
        Doc Decl Credit
        Doc Add DS Report
        Add Payment
        Doc Add MPEDA Purchase Reg
        Doc Shipment Create
        QC New Addon Fields For Sysco
        Variety Add
        Doc Sample Letter
        Add HC Covering Letter
        Doc Add PHP Report
        Doc Add ELSAR Report
        Doc Add Combined Report
        Doc Add Salmonella
        Doc CL Edit
        Shrimp Two Excel Report
        Doc Product Release Edit
        Edit Salmonella Report
        Doc Edit CMB Report
        Doc Edit PHP Report
        Shrimp Two Report
    QC Orders
        Doc Add Reports

PRODUCTION

    Soaking (V2)
    Daily Production
        Daily Production
        Daily Production Data
    Freezing Store
    Soaking
    Freezing
    Daily Stockout
        Daily Production Data Stock Out ID

STORE REPORTS

    Rack Wise Stock Report
    Inward Report
    Outward Report
    RM Requirement
    Excess Stock Report
    Stock Overall Report
    Stock Report
    Stock Summary
    Excess Order Report
    Daily & Monthly Production
        CS Monthly Production Report
    Opening & Closing Report
    Shipment Report Daily & Monthly
    IBT - IBT+ Report
    Thawing Report
        CS Thawing Report
        Thawing Report
    Repacking Report (Rep+ And Rep -)
        CS Repacking Report
    Shipment Status Report
    Daily Stock Report (Plant Wise)
    Order Timeline Report
    Daily Production Report
    Physical Report (Phy+ And Phy-)
    Stock Production Report

SALES

    Delayed Shipments

PRE PROCESSING

    Deheading
    Lot Track
    Grading
        Grading All Plants Report
    RM Received Track ID
    De-Heading Track ID
    Grading Track ID
    Value Addition Track ID
    Soaking Track ID
    Freezing Track ID
    Hon Qty Transfer After VA

LAB

    Lots List
    AB Report
        RM AB Report
    RM Report
        RM Report Create
    MB Report
        IH Add MB Report
        IH Add MB Result
    Lab Report
        IH Add Bore Water Analysis
    External Lab Report

QC REPORTS

    Food Audit Report
    Social Audit Report
    Farm Audit Report
    Hatchery Audit Report
    Feed Mill Audit Report
    BAP Report
    Buyer Request List
    Sysco Status List
    Traceability Utilized Report
    Payment Statement
        Doc Edit Sample Letter External
    Traceability Report

PRODUCT

    Product List
        Add Product
    Preparation List
        Add Preparation
    Grades List
        Add Options
    Packing Style List
        Create Packing Styles
    Variety List
        Add Variety
    Species
        Species Master Create

DEVELOPMENT

    Production Standard Yields
        Production Standard Yields
    Daily Stock Report (Plant Wise) New
    Stock Value Report
    Stock Value Report Landscape
    Consolidation Report

GENERAL STORE

    Material Issue (GS)
    Goods Receipt Note (GS)
    Proforma Order (GS)
    Indent Page (GS)
        Indent Page
    Indent List (GS)
    Proforma List (GS)
    Goods Receipt Note List (GS)

CS MASTER

    General Options List
        CS General Options List
        CS Create General Options
    Tenants List
        CS Create Tenants
    Coldstores List
        Daily Production Data
        CS Create Coldstores
    General Categories List
        CS Create General Categories
    Floor List
        CS Create Floor
    Block List
        CS Create Block
    Variety List
    Hon Packing Count Master
        Grade Master HL Count

QC AUDIT

    Feed Mill Audit List
    Social Audit List
    Food Audit List
    Farm Audit List
    Hatchery Audit List

IBT

    CS IBT Request List
        CS IBT Breakup Data
        CS IBT Breakup Preview

STOCK APPROVALS

    Admin Daily Production List
    Admin Inward Approval

CHEMICAL SCREENS

    Chemical Payments List
    Food & Social Audit
    Farm/Mill/Hatchery Audit
    Received Chemicals
        GS Chem Orders List
    Chemical POs
        GS Chem PO Create
    Chemicals Consumption
        GS Chem Consumption Create
    Hatchery List
    Chemical Opening Balance Report
    Chemical Balance Report
    Chemical Received Report
        GS Chem Orders Create

PRODUCTION REPORTS

    Reconciliation Report
    Consolidation Report Daily & Monthly
        Consolidation Report Daily And Monthly
    Deheading Day Wise Report
    RM Received Day Wise Report
    VA Floor Balance Report
    Assumed Reports By RM & Arrival
    Grading Day & Machine Wise Report
    Soaking Report
    Freezing Report
        Freezing Production Report
    VA Transfer Report
    Track Code Report
    Soaking Floor Balance Report
    File Upload
    Value Addition Report
    Head On To Finished Report
        Head On To Finished Report PDF D1
    Untreated Report
    Freezing Production Report
    Soaking Floor Balance Variety Report New
    Value Addition Report New

QC DASHBOARD

    QC Dashboard New

ANTI DUMPING

    Anti Dumping Entry Form
    Anti Dumping Report
    Anti Dumping Negative Report
    Anti Dumping Shipment Report
    Anti Dumping Opening & Closing Report
    Anti Dumping Closing Report

INVENTORY

    Proforma Register Create (GS)
    Proforma Register (GS)

PACKING MATERIAL

    Material Issue (PM)
    Goods Receipt Note (PM)
    Purchase Order (PM)
    Proforma Invoice (PM)
    Proforma List (PM)
    Purchase Order List (PM)`;

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const lines = rawList.split('\n');
const modules = [];
let currentModule = null;
let currentSubmenu = null;

for (let line of lines) {
  if (!line.trim()) continue;

  const indent = line.search(/\S|$/);
  const text = line.trim();

  if (indent === 0) {
    currentModule = {
      id: slugify(text),
      key: slugify(text),
      label: text,
      submenus: []
    };
    modules.push(currentModule);
    currentSubmenu = null;
  } else if (indent === 4) {
    currentSubmenu = {
      id: slugify(text),
      title: text,
      tabs: []
    };
    currentModule.submenus.push(currentSubmenu);
  } else if (indent >= 8 && currentSubmenu) {
    currentSubmenu.tabs.push({
      id: slugify(text),
      label: text,
      route: `#/${currentModule.id}/${currentSubmenu.id}/${slugify(text)}`,
      type: 'system',
      badge: ''
    });
  }
}

for (const mod of modules) {
  for (const sm of mod.submenus) {
    if (sm.tabs.length === 0) {
      sm.tabs.push({
        id: sm.id,
        label: sm.title,
        route: `#/${mod.id}/${sm.id}/${sm.id}`,
        type: 'system',
        badge: ''
      });
    }
  }
}

console.log('Parsed modules count:', modules.length);
console.log('Total submenus count:', modules.reduce((a, m) => a + m.submenus.length, 0));

fs.writeFileSync('parsed_erp_menu.json', JSON.stringify(modules, null, 2));
