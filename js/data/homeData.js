// Home & Enterprise Command Center Mock & Operational Data Store
// Aligned with Devi Fisheries Limited Multi-Plant Enterprise Standards

export const HOME_DATA = {
  currentUser: {
    id: "EMP-DFL-001",
    name: "Dr. Y.S. Prasad",
    role: "Super Admin",
    title: "Director of Plant Operations & Corporate Quality",
    department: "Executive Operations",
    facility: "DFL Unit-1 Visakhapatnam (HQ)",
    activeShift: "Shift A (Day Shift: 06:00 - 14:00 IST)",
    dockTemp: "28.4°C / Dew Point 21.2°C",
    lastLogin: "Today at 08:14 IST from 10.42.18.94",
    sessionExpiry: "8h 45m remaining",
    securityClearance: "Level 5 — Enterprise Unrestricted Clearance",
    permissibleRoles: [
      "Super Admin",
      "Plant Operations Director",
      "Corporate Procurement Head",
      "Lead QC & Food Safety Auditor"
    ]
  },

  plants: [
    { id: "unit-1", name: "DFL Unit-1 (Visakhapatnam HQ)", code: "VSP", active: true, dockStatus: "Active Receiving" },
    { id: "unit-2", name: "DFL Unit-2 (Kakinada Deep Port)", code: "KKD", active: false, dockStatus: "Grading Line Active" },
    { id: "unit-3", name: "DFL Unit-3 (Pydibhimavaram)", code: "PSP", active: false, dockStatus: "IQF Freezing Tunnel #2" }
  ],

  enterprisePulse: {
    todayArrivalsKg: 42650,
    arrivalsTrend: "+12.4%",
    activeFloorWipKg: 3103,
    wipTrend: "Normal Load",
    coldstoreCapacityPct: 78.4,
    coldstoreFreeTons: 124,
    pendingApprovalsCount: 6,
    pendingApprovalsList: [
      { id: "APP-01", type: "PURCHASE", label: "Supplier Bill #SB-2026-089 (Godavari Aqua)", amount: "₹16,36,250" },
      { id: "APP-02", type: "CHEMICAL", label: "Chemical PO #PO-CHM-2026-022 (Altesa Neo)", amount: "$21,500" },
      { id: "APP-03", type: "QC", label: "ELISA Antibiotic Clearance Lot #LOT-2026-128", amount: "USFDA Grade" }
    ]
  },

  quickShortcuts: [
    {
      id: "sc-booking",
      title: "New RM Booking",
      desc: "Lock farmer count & rate",
      module: "Purchase",
      icon: "📋",
      color: "bg-teal-50 text-teal-700 border-teal-200",
      hash: "#/purchase/operations/bookings"
    },
    {
      id: "sc-arrival",
      title: "Record Gate Arrival",
      desc: "Weighbridge & truck intake",
      module: "Purchase",
      icon: "🚚",
      color: "bg-sky-50 text-sky-700 border-sky-200",
      hash: "#/purchase/operations/rm-arrivals"
    },
    {
      id: "sc-deheading",
      title: "Start Deheading Batch",
      desc: "HON to HL shift yield",
      module: "Pre-Processing",
      icon: "⚡",
      color: "bg-indigo-50 text-indigo-700 border-indigo-200",
      hash: "#/preprocessing/floor-operations/deheading-peeling"
    },
    {
      id: "sc-chemical",
      title: "Log Chemical Soaking",
      desc: "STPP / non-phosphate dosage",
      module: "Pre-Processing",
      icon: "🧪",
      color: "bg-purple-50 text-purple-700 border-purple-200",
      hash: "#/preprocessing/chemical-inventory/daily-usage"
    },
    {
      id: "sc-qc",
      title: "Antibiotic Testing",
      desc: "ELISA test release",
      module: "Quality",
      icon: "🔬",
      color: "bg-emerald-50 text-emerald-700 border-emerald-200",
      hash: "#/quality/lab/antibiotic-testing"
    },
    {
      id: "sc-coldstore",
      title: "Pallet Inward",
      desc: "Master carton chamber intake",
      module: "Cold Storage",
      icon: "❄️",
      color: "bg-cyan-50 text-cyan-700 border-cyan-200",
      hash: "#/coldstore/inward-intake"
    },
    {
      id: "sc-sales",
      title: "Export Contract",
      desc: "International buyer booking",
      module: "Sales",
      icon: "🚢",
      color: "bg-amber-50 text-amber-700 border-amber-200",
      hash: "#/sales/contracts-pricing"
    },
    {
      id: "sc-roles",
      title: "Allocate User Roles",
      desc: "RBAC permissible controls",
      module: "Admin Studio",
      icon: "🛡️",
      color: "bg-rose-50 text-rose-700 border-rose-200",
      hash: "#/home/admin-controls/user-allocation"
    }
  ],

  modulePermissions: [
    {
      moduleId: "purchase",
      moduleName: "Purchase & Intake",
      level: "FULL_ACCESS",
      permissions: ["Create Bookings", "Verify Weighbridge", "Approve Supplier Bills", "Commercial Settlement", "Price Master Edit"],
      status: "ACTIVE"
    },
    {
      moduleId: "preprocessing",
      moduleName: "Pre-Processing",
      level: "FULL_ACCESS",
      permissions: ["Line Scheduling", "Deheading Yield Audit", "Chemical Tank Dosing", "Inter-Plant Transfer Gate Pass"],
      status: "ACTIVE"
    },
    {
      moduleId: "quality",
      moduleName: "Quality Control (QC)",
      level: "FULL_ACCESS",
      permissions: ["ELISA Screening Sign-off", "Antibiotic Clearance", "Microbiology Swabs", "Lot Hold / Release Action"],
      status: "ACTIVE"
    },
    {
      moduleId: "production",
      moduleName: "Production & Freezing",
      level: "FULL_ACCESS",
      permissions: ["IQF Freezing Controls", "Glaze Formulation", "Packaging Carton Specs", "Anti-Dumping Conversion"],
      status: "ACTIVE"
    },
    {
      moduleId: "coldstore",
      moduleName: "Cold Storage",
      level: "FULL_ACCESS",
      permissions: ["Chamber Rack Allocation", "FIFO Temperature Logs", "Container Loading Manifest"],
      status: "ACTIVE"
    },
    {
      moduleId: "inventory",
      moduleName: "Inventory Stores",
      level: "FULL_ACCESS",
      permissions: ["Material Requisitions", "Store Indents", "GRN Approval", "Stock Issue Vouchers"],
      status: "ACTIVE"
    },
    {
      moduleId: "sales",
      moduleName: "Sales & Export Logistics",
      level: "FULL_ACCESS",
      permissions: ["International Buyer Master", "Sales Contracts", "Port Dock Dispatch", "Container Realization"],
      status: "ACTIVE"
    },
    {
      moduleId: "setup",
      moduleName: "Master Setup & RBAC",
      level: "SUPER_ADMIN",
      permissions: ["Manage Users", "Assign Permissible Roles", "Audit System Logs", "Configure Plant Master"],
      status: "ACTIVE"
    }
  ],

  rbacMatrix: [
    {
      roleName: "Super Admin",
      usersCount: 2,
      description: "Unrestricted operational, audit, security and financial privileges across all multi-plant units.",
      purchaseAccess: "Full",
      preprocAccess: "Full",
      qcAccess: "Full",
      productionAccess: "Full",
      coldstoreAccess: "Full",
      adminControls: "Yes"
    },
    {
      roleName: "Plant Operations Head",
      usersCount: 4,
      description: "Directs factory floor deheading, grading, line scheduling, freezing tunnels, and coldstore dispatch.",
      purchaseAccess: "Read Only",
      preprocAccess: "Full",
      qcAccess: "Read/Review",
      productionAccess: "Full",
      coldstoreAccess: "Full",
      adminControls: "Shift Delegation"
    },
    {
      roleName: "Procurement Lead",
      usersCount: 6,
      description: "Manages farm dock intake, pond bookings, vehicle weight verification, and supplier commercial accounts.",
      purchaseAccess: "Full",
      preprocAccess: "Read (Intake)",
      qcAccess: "Read",
      productionAccess: "None",
      coldstoreAccess: "None",
      adminControls: "None"
    },
    {
      roleName: "QC & Lab Director",
      usersCount: 5,
      description: "Authorized to run antibiotic screening, microbiology audits, and issue statutory export health clearance.",
      purchaseAccess: "QC Inspection",
      preprocAccess: "Chemical Audit",
      qcAccess: "Full / Release",
      productionAccess: "HACCP Check",
      coldstoreAccess: "Temp Audit",
      adminControls: "None"
    },
    {
      roleName: "Floor Supervisor",
      usersCount: 14,
      description: "Shift-level line supervisors logging peeler head-count, crate counts, and ice consumption.",
      purchaseAccess: "None",
      preprocAccess: "Line Operator",
      qcAccess: "None",
      productionAccess: "Batch Operator",
      coldstoreAccess: "None",
      adminControls: "None"
    }
  ],

  roleCockpits: {
    executive: {
      title: "Executive & C-Suite Cockpit",
      subtitle: "High-level financial realization, export container volumes, and multi-unit plant throughput",
      kpis: [
        { label: "Realized Export Value (MTD)", val: "$3.48M", sub: "+14.2% vs target", dir: "up" },
        { label: "Total Volume Processed", val: "842,500 kg", sub: "3 Plants Active", dir: "up" },
        { label: "Average Gross Realization Margin", val: "24.8%", sub: "+1.9% MoM", dir: "up" },
        { label: "Active Overseas Contracts", val: "19 Contracts", sub: "US (12), EU (5), Japan (2)", dir: "neutral" }
      ],
      highlights: [
        "DFL Unit-1 Visakhapatnam operating at 94% rated capacity; processing IQF Vannamei for Walmart USA.",
        "US Anti-Dumping rate maintained at zero-penalty tariff benchmark for FY2026.",
        "Supplier settlements cleared with average turnaround time of 48 hours."
      ]
    },
    plantManager: {
      title: "Plant Operations Head Cockpit",
      subtitle: "Floor yields, processing line runtimes, freezing tunnel efficiency, and coldstore chambers",
      kpis: [
        { label: "Today's Intake Volume", val: "42,650 kg", sub: "5 Trucks docked", dir: "up" },
        { label: "Deheading Recovery Yield", val: "69.45%", sub: "Target 68.50%", dir: "up" },
        { label: "Active Freezing Tunnels", val: "3 Tunnels Running", sub: "IQF 1 & 2, Plate 1", dir: "neutral" },
        { label: "Coldstore Capacity", val: "78.4%", sub: "124 Tons Free", dir: "neutral" }
      ],
      highlights: [
        "Roller Grader #1 achieved 3,550 kg output on 26/30 grade with zero line downtime.",
        "Chilled tote inter-plant transfer TRF-DFL-2026-041 dispatched to DFL Unit-1 VSP (-1.4°C).",
        "STPP chemical buffer requires top-up (18 bags on floor; 400 bags clearing at Kakinada Port)."
      ]
    },
    procurementHead: {
      title: "Procurement Lead Cockpit",
      subtitle: "Farm-gate arrivals, count variance index, spot pricing, and supplier fulfillment rates",
      kpis: [
        { label: "Active Bookings Fulfill Rate", val: "94.2%", sub: "7 of 7 on schedule", dir: "up" },
        { label: "Average Buying Rate", val: "₹415 / kg", sub: "Within budget", dir: "neutral" },
        { label: "Count Discrepancy Index", val: "-19.6 pcs/kg", sub: "Pond #14 flagged", dir: "down" },
        { label: "Pending Vouchers", val: "₹1.63M", sub: "Godavari Coastal", dir: "neutral" }
      ],
      highlights: [
        "Spot price for 40-count Vannamei steady at ₹440/kg in Krishna Delta cluster.",
        "Zero antibiotic rejections across 14 farm ponds sampled this week.",
        "Direct farmer procurement accounts for 68% of today's total harvest intake."
      ]
    },
    qcDirector: {
      title: "Quality & Food Safety Director Cockpit",
      subtitle: "ELISA antibiotic screenings, microbiological compliance, temperature logs, and audit readiness",
      kpis: [
        { label: "Antibiotic Clearance Rate", val: "100.0%", sub: "14 of 14 lots negative", dir: "up" },
        { label: "Microbiology Swab Pass", val: "98.7%", sub: "Table 1 sanitized", dir: "up" },
        { label: "Dock Intake Core Temp", val: "-0.8°C", sub: "Complies with HACCP", dir: "up" },
        { label: "BRCGS Compliance Score", val: "99.4%", sub: "Grade AA Target", dir: "up" }
      ],
      highlights: [
        "USFDA Pre-shipment sample testing completed for export batch EXP-US-2026-904.",
        "Chlorine concentration maintained strictly at 2.0 ppm in pre-processing wash baths.",
        "Internal food defense audit scheduled for Friday at Unit-2 Kakinada."
      ]
    }
  },

  userAllocations: [
    {
      id: "USR-01",
      name: "Dr. Y.S. Prasad",
      email: "ysprasad@devifisheries.com",
      role: "Super Admin",
      department: "Corporate Management",
      assignedPlant: "DFL Unit-1 Visakhapatnam (HQ)",
      accessLevel: "Enterprise Unrestricted",
      status: "ACTIVE"
    },
    {
      id: "USR-02",
      name: "M. Manikanta",
      email: "manikanta@devifisheries.com",
      role: "Plant Operations Head",
      department: "Factory Operations",
      assignedPlant: "DFL Unit-1 Visakhapatnam",
      accessLevel: "Floor & Coldstore Full",
      status: "ACTIVE"
    },
    {
      id: "USR-03",
      name: "B. Venkatesh",
      email: "venkatesh.b@devifisheries.com",
      role: "Procurement Lead",
      department: "RM Procurement",
      assignedPlant: "DFL Unit-2 Kakinada",
      accessLevel: "Purchase & Commercial",
      status: "ACTIVE"
    },
    {
      id: "USR-04",
      name: "Dr. K. Srimannarayana",
      email: "sriman.k@devifisheries.com",
      role: "QC & Lab Director",
      department: "Quality Assurance",
      assignedPlant: "DFL Unit-1 Visakhapatnam",
      accessLevel: "Lab & Compliance Release",
      status: "ACTIVE"
    },
    {
      id: "USR-05",
      name: "Laxmi Narayana",
      email: "laxmi.n@devifisheries.com",
      role: "Floor Supervisor",
      department: "Pre-Processing Line",
      assignedPlant: "DFL Unit-1 Visakhapatnam",
      accessLevel: "Shift Operator",
      status: "ACTIVE"
    }
  ],

  shiftDelegations: [
    {
      id: "DEL-2026-08",
      delegatedFrom: "M. Manikanta (Plant Head)",
      delegatedTo: "Laxmi Narayana (Floor Supervisor)",
      scope: "Deheading Batch Sign-Off & Inter-Plant Transfer Gate Pass",
      shift: "Night Shift (22:00 - 06:00 IST)",
      effectiveDate: "2026-10-14",
      expiryDate: "2026-10-15",
      approvalReason: "Covering night shift emergency inter-unit tote transfer to Unit-3",
      status: "ACTIVE"
    },
    {
      id: "DEL-2026-07",
      delegatedFrom: "Dr. K. Srimannarayana (QC Director)",
      delegatedTo: "M. Nagesh (Senior Chemist)",
      scope: "ELISA Antibiotic Certificate Provisional Clearance",
      shift: "Day Shift",
      effectiveDate: "2026-10-12",
      expiryDate: "2026-10-13",
      approvalReason: "Director attending MPEDA export audit summit in New Delhi",
      status: "EXPIRED"
    }
  ]
};
