# Devi Fisheries ERP — Enterprise Seafood Processing & Export SaaS

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FVinayak-Indalkar%2FMiledeep-ERP)
[![GitHub Pages](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-2ea44f?style=for-the-badge&logo=github)](https://vinayak-indalkar.github.io/Miledeep-ERP/)

### 🚀 Live Preview & Deployment
- **🌐 Live Demo on GitHub Pages**: [https://vinayak-indalkar.github.io/Miledeep-ERP/](https://vinayak-indalkar.github.io/Miledeep-ERP/)
- **▲ Deploy to Vercel in 1-Click**: [Click here to deploy your own instance on Vercel](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FVinayak-Indalkar%2FMiledeep-ERP)

---

A modern, production-grade Fisheries & Marine Processing ERP SaaS web application built with **HTML5, CSS3, JavaScript (ES6 Modules), Tailwind CSS, and the Atlassian Design System** visual language and UX principles.

---

## 🌟 Key Features & Business Modules

### 1. 🔐 Creator / Login Page
* Enterprise SaaS authentication screen with Devi Fisheries branding.
* One-click demo persona quick-login:
  * **Plant Operations Director** (Full plant visibility & controls)
  * **QC Lead & Lab Manager** (Antibiotic screening & microbiology)
  * **Production Supervisor** (Soaking, freezing & floor batches)
  * **Export Manager** (Sales contracts & shipping logistics)
* Show/hide password toggle, remember me, validation, and password reset flow.

---

### 2. 🧭 Navigation Architecture & Layout
* **Nested 3-Level Hierarchy**: `Main Menu → Sub Menu → Tab / Page`
* **Collapsible Left Sidebar**: Module icons, active module indicators, and HACCP operational status.
* **Global Header**:
  * Keyboard shortcut `Ctrl+K` for instant Categorized Global Search.
  * Quick Create Action dropdown (`+`).
  * Live notifications panel (arrivals, QC clearances, reefer dispatches).
  * Persona switcher dropdown & user profile.
* **Dynamic Breadcrumbs**: Automatic linkable breadcrumbs on every screen.

---

### 3. 🦐 Purchase & Operations
* **Raw Material Dashboard**: Daily intake KPIs, weekly species intake charts, live dock weighment status.
* **Commercial Dashboard**: Procurement spend, vendor ratings, count-wise price volatility.
* **Lot Tracking & End-to-End Traceability (Dedicated)**:
  * Comprehensive quantitative mass-balance table (`RM Received → QC Accepted → Pre-Processed → Production Output → Coldstore → Dispatched → Balance`).
  * **Slide-In Traceability Drawer**: Full chronological audit timeline from seed/pond to reefer export container with operator sign-offs and HACCP parameters.
* **Raw Material Arrivals**:
  * Gross weight, tare weight, automatic net weight calculation, temperature log, de-icing checks.
  * Interactive **"Create RM Arrival"** modal form with automatic lot generation.
* **Bookings, Supplier Bills & Payments**: Farmer pond bookings, bills in INR & USD, and bank payment logs.

---

### 4. 🔪 Pre-Processing Floor
* **Floor Overview**: Active lines, operators count, real-time actual vs target yield % calculation.
* **Pre-Processing Tasks**: De-heading, mechanical grading (HLSO), peeling & deveining (PD/PDTO), fish filleting.
* **Chemical Inventory & Usage Logs**: Food-grade additives (STPP, Sodium Metabisulfite, Chlorinated wash water ppm).
* **Batch Traceability**: Shift-wise mass balance and floor yield outputs.

---

### 5. 🔬 Quality Control (QC) & HACCP Lab
* **QC Overview**: Lab test counts, passing rates, incubator monitoring.
* **Antibiotics Screening**: Rapid ELISA and LC-MS/MS testing for Nitrofurans (AOZ, AMOZ, SEM, AHD), Chloramphenicol (CAP), and Oxytetracycline (OTC) with regulatory MRL limits.
* **Microbiology Lab**: Total Plate Count (TPC), E. Coli, Salmonella spp., Vibrio cholerae, Vibrio parahaemolyticus.
* **Sensory & Physical Panel**: 10-point organoleptic grading, melanin blackspot %, broken piece %.
* **International Audits**: BAP 4-Star, BRCGS Issue 9 Grade AA, USFDA Seafood HACCP, and EIA export clearance registers.

---

### 6. ❄️ Production & Freezing Control
* **Production Overview**: Finished output MT, freezing efficiency, core exit temperatures (-23.4°C).
* **Standard Yields Matrix**: Master conversion benchmarks, allowed tolerances, expected waste %, cycle times.
* **Batch Tracking**: Soaking tumbling logs (moisture gain %), IQF Spiral, Tunnel, and Plate freezing runs.
* **Production Control**: Floor balances, untreated balances, reconciliation, and head-on conversion.
* **US Anti-Dumping Compliance**: Statutory ledger for US DOC anti-dumping duty calculation, audit logs, and Certificates of Origin.

---

### 7. 🧊 Coldstore & Visual Rack Grid
* **Chamber Telemetry**: Real-time dials for Chamber #1 (-22.4°C), Chamber #2 (-24.8°C), and Deep Freeze Vault #3 (-28.2°C).
* **Interactive Visual Rack Visualizer**:
  * Multi-bay, multi-tier pallet visualizer (Racks A1 to D1).
  * Color-coded statuses: Available, Export Allocated, Full / Staged.
  * Interactive on-click pallet modal: product specs, RFID tags, cartons count, batch references, and export reservations.
* **Inward & Dispatch**: Production intake, thawing/repacking, and reefer stuffing.

---

### 8. 📦 Inventory & Consumables
* **Packaging & Additives Register**: Master cartons (5-ply heavy kraft), printed LDPE polybags, strapping rolls, STPP, and sanitation flakes.
* **Requisitions & Indents**: Purchase indents, PO generation, Goods Receipt Notes (GRN), and material issue slips.

---

### 9. 🚢 Sales & Global Exports
* **Export Realization Hub**: Active sales contract values, in-transit reefers, buyer credit limits.
* **Customer & Buyer Directory**: US (Red Lobster, Pacific Seafood), Japan (Maruha Nichiro), EU (Royal Greenland).
* **Export Sales Contracts**: Contract generation, Incoterms (CIF, FOB, CFR), payment terms (LC at Sight, DA 60 Days).
* **Shipping Documentation & Logistics**: EIA Export Health Certificates, Bills of Lading, shipping bills, container temperature set points (-22.0°C), and datalogger IDs.
* **Export Trade Finance**: LC negotiations, export bill discounting, and forward forex hedging contracts.

---

### 10. 📊 Global Reports & Executive Analytics
* **Production Analytics**: Yield & recovery trend curves, floor loss summaries.
* **Coldstore Valuation & Movement Logs**: Valuation by species and age.
* **Sales & Export Analytics**: Country-wise realization bar charts and executive KPI summaries (YTD vs MTD).
* **Export to CSV & PDF**: Data table CSV exports and executive PDF report simulation.

---

## 🎨 Design System & UI Architecture

* **Atlassian Design System Language**: Charlie palette (Atlassian Blue `#0052CC`, Deep Slate `#172B4D`, Neutral Gray `#F4F5F7`, crisp borders `#DFE1E6`).
* **Atlassian Lozenges (Badges)**: Success (Green), In Progress (Blue), Warning (Yellow), Danger (Red), Info (Cyan), Purple.
* **Accessible Component Architecture**:
  * Reusable Enterprise `DataTable` with multi-column sorting, search, column filters, bulk actions, and pagination.
  * Modal dialogs and Right-hand slide-in Flyout Drawers.
  * Animated Toast notifications system.
  * Chart.js analytics graphs.

---

## 🚀 How to Run the Application

The application is completely standalone and requires no build tools. You can run it with any static web server:

```powershell
# Option 1: Python HTTP server
python -m http.server 8080

# Option 2: Node.js http-server
npx http-server -p 8080

# Option 3: VS Code Live Server extension or direct browser launch
```

Then open `http://localhost:8080` in your web browser.
