// Enterprise Notification Center View — Streamlined Apple/Airbnb Minimalist Architecture
// Whitespace over borders, zero redundant metric cards, subtle badges & Noto Sans typographic scale

import { Toast } from '../components/toast.js';
import { Header } from '../components/header.js';

export const NOTIFICATIONS_DATA = [
  {
    id: 'NOTIF-2026-091',
    title: 'Critical Cold Chain Alert: Chamber #2 Temperature Drift (-15.8°C)',
    message: 'Coldstore Chamber #2 recorded a 2.2°C rise above the -18.0°C threshold for 18 minutes. Maintenance & Refrigeration team notified for immediate compressor valve check.',
    category: 'quality',
    module: 'Cold Storage',
    priority: 'Critical',
    plant: 'Devi Fisheries #1 — Kakinada',
    timestamp: '10 mins ago • 13 Oct 2026, 11:02 AM',
    unread: true,
    recordRef: 'CH-02 / PAL-8841',
    targetHash: '#/coldstore/dashboard/overview'
  },
  {
    id: 'NOTIF-2026-090',
    title: 'Fresh RM Dock Arrival: RMA-2026-00348 (Vannamei 40C — 4,850 KG)',
    message: 'Insulated reefer vehicle AP-05-TU-8821 from Godavari Coastal Aqua Farms arrived at Receiving Dock #1. Core pulp temperature verified at 1.9°C.',
    category: 'procurement',
    module: 'Purchase & RM',
    priority: 'High',
    plant: 'Devi Fisheries #1 — Kakinada',
    timestamp: '28 mins ago • 13 Oct 2026, 10:44 AM',
    unread: true,
    recordRef: 'RMA-2026-00348',
    targetHash: '#/purchase/operations/rm-arrivals'
  },
  {
    id: 'NOTIF-2026-089',
    title: 'Antibiotic ELISA Screening Passed: LOT-2026-00125',
    message: 'Zero Nitrofurans (AOZ/AMOZ) and Chloramphenicol detected for Lot LOT-2026-00125. Cleared for IQF HLSO freezing line allocation.',
    category: 'quality',
    module: 'Quality Control',
    priority: 'Normal',
    plant: 'Devi Fisheries #1 — Kakinada',
    timestamp: '1 hour ago • 13 Oct 2026, 10:15 AM',
    unread: true,
    recordRef: 'LOT-2026-00125',
    targetHash: '#/quality/dashboard/qc-overview'
  },
  {
    id: 'NOTIF-2026-088',
    title: 'Supplier Invoice Pending Approval: BILL-2026-118 (₹ 14,82,500)',
    message: 'Final weighment and grade reconciliation completed for Sri Venkateswara Aqua Exports. Bill requires Procurement Manager sign-off before RTGS batch release.',
    category: 'procurement',
    module: 'Transactions & Bills',
    priority: 'High',
    plant: 'Devi Fisheries #1 — Kakinada',
    timestamp: '2 hours ago • 13 Oct 2026, 09:30 AM',
    unread: true,
    recordRef: 'BILL-2026-118',
    targetHash: '#/purchase/transactions-bills/supplier-bills'
  },
  {
    id: 'NOTIF-2026-087',
    title: 'Pre-Processing Peeling Yield Above Target (84.6%)',
    message: 'Floor Line B achieved 84.6% HLSO recovery on Vannamei 30C batch (Target: 83.0%). Incentive log updated for Morning Shift supervisors.',
    category: 'quality',
    module: 'Pre-Processing',
    priority: 'Normal',
    plant: 'Devi Fisheries #2 — Bhimavaram',
    timestamp: '3 hours ago • 13 Oct 2026, 08:20 AM',
    unread: true,
    recordRef: 'BATCH-PP-409',
    targetHash: '#/preprocessing/dashboard/floor-overview'
  },
  {
    id: 'NOTIF-2026-086',
    title: 'New Purchase Booking Confirmed: PB-2026-0912 (6,200 KG Black Tiger)',
    message: 'Field agent Manikanta confirmed pond harvest booking at Amalapuram Cluster. Ice dispatch and 2 insulated trucks scheduled for 14:00 HRS.',
    category: 'procurement',
    module: 'Purchase & RM',
    priority: 'Normal',
    plant: 'Devi Fisheries #1 — Kakinada',
    timestamp: '5 hours ago • 13 Oct 2026, 06:40 AM',
    unread: false,
    recordRef: 'PB-2026-0912',
    targetHash: '#/purchase/operations/purchase-bookings'
  },
  {
    id: 'NOTIF-2026-085',
    title: 'Export Container Sealed & Dispatched: CONT-MAEU-992814',
    message: '40ft High-Cube Reefer loaded with 2,200 Master Cartons (Sysco Corp USA PO #88412). E-Seal verified and departed for Visakhapatnam Port Terminal.',
    category: 'procurement',
    module: 'Sales & Export',
    priority: 'Normal',
    plant: 'Devi Fisheries #1 — Kakinada',
    timestamp: 'Yesterday • 12 Oct 2026, 07:15 PM',
    unread: false,
    recordRef: 'CONT-MAEU-992814',
    targetHash: '#/sales/dashboard/overview'
  },
  {
    id: 'NOTIF-2026-084',
    title: 'HACCP Metal Detector Calibration Completed — IQF Line #1 & #2',
    message: 'Hourly Fe (1.5mm), Non-Fe (2.0mm), and SUS (2.5mm) test wands verified with 100% auto-reject response across all packaging conveyor lanes.',
    category: 'quality',
    module: 'Quality Control',
    priority: 'Low',
    plant: 'Devi Fisheries #2 — Bhimavaram',
    timestamp: 'Yesterday • 12 Oct 2026, 04:50 PM',
    unread: false,
    recordRef: 'HACCP-CCP-04',
    targetHash: '#/quality/dashboard/qc-overview'
  }
];

export const NotificationsView = {
  activeTab: 'all-notifications',
  filterStatus: 'ALL', // 'ALL', 'UNREAD', 'CRITICAL'
  searchQuery: '',

  getUnreadCount() {
    return NOTIFICATIONS_DATA.filter(n => n.unread).length;
  },

  render(containerId, tabName = 'all-notifications') {
    this.activeTab = tabName || 'all-notifications';
    const container = document.getElementById(containerId);
    if (!container) return;

    const unreadCount = this.getUnreadCount();
    const filteredList = this.getFilteredNotifications();

    container.innerHTML = `
      <div class="max-w-5xl mx-auto space-y-6 pt-1 pb-12 font-sans select-none">
        
        <!-- Streamlined Top Control Bar (Clean, Unobtrusive Whitespace Design) -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5 pb-2">
          
          <!-- Consolidated Search Input -->
          <div class="relative flex-1 max-w-md">
            <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <i data-lucide="search" class="w-4 h-4"></i>
            </div>
            <input
              type="text"
              id="notif-search-input"
              value="${this.searchQuery}"
              placeholder="Search notifications, lots, chambers, plants..."
              class="w-full h-10 pl-9 pr-8 text-[13px] bg-white border border-slate-200/80 rounded-xl focus:outline-none focus:border-[#006C7A] focus:ring-2 focus:ring-[#006C7A]/15 text-slate-800 placeholder-slate-400 transition-all font-normal shadow-xs"
            />
            ${this.searchQuery ? `
              <button id="notif-search-clear" class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 text-xs cursor-pointer">✕</button>
            ` : ''}
          </div>

          <!-- Quick Filter Pills & Actions -->
          <div class="flex items-center justify-between sm:justify-end gap-2 shrink-0">
            <div class="inline-flex items-center bg-slate-100/80 p-1 rounded-xl gap-1">
              <button
                type="button"
                class="notif-pill-btn px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${this.filterStatus === 'ALL' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'}"
                data-status="ALL"
              >
                All (${NOTIFICATIONS_DATA.length})
              </button>
              <button
                type="button"
                class="notif-pill-btn px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${this.filterStatus === 'UNREAD' ? 'bg-white text-[#006C7A] shadow-xs' : 'text-slate-500 hover:text-slate-900'}"
                data-status="UNREAD"
              >
                Unread (${unreadCount})
              </button>
              <button
                type="button"
                class="notif-pill-btn px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${this.filterStatus === 'CRITICAL' ? 'bg-white text-red-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'}"
                data-status="CRITICAL"
              >
                Critical & High
              </button>
            </div>

            <!-- Mark All Read Subtle Link -->
            ${unreadCount > 0 ? `
              <button
                type="button"
                id="notif-mark-all-read-btn"
                class="text-xs font-semibold text-[#006C7A] hover:text-[#005662] hover:bg-[#F0FAFC] px-3 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                title="Mark all notifications as read"
              >
                <i data-lucide="check-check" class="w-3.5 h-3.5"></i>
                <span class="hidden md:inline">Mark all read</span>
              </button>
            ` : ''}
          </div>

        </div>

        <!-- Notification Feed List (Border-free Whitespace Architecture) -->
        <div class="space-y-1">
          ${filteredList.length === 0 ? `
            <div class="py-16 text-center">
              <div class="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <i data-lucide="bell-off" class="w-5 h-5"></i>
              </div>
              <div class="text-sm font-semibold text-slate-800">No notifications found</div>
              <p class="text-xs text-slate-400 mt-1">There are no alerts matching your search criteria.</p>
            </div>
          ` : filteredList.map(item => this.renderNotificationRow(item)).join('')}
        </div>

      </div>
    `;

    if (typeof window !== 'undefined' && window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }

    this.bindEvents(containerId);
  },

  getFilteredNotifications() {
    return NOTIFICATIONS_DATA.filter(item => {
      // Submenu tabs filter
      if (this.activeTab === 'unread-alerts' && !item.unread) return false;
      if (this.activeTab === 'procurement-alerts' && item.category !== 'procurement') return false;
      if (this.activeTab === 'quality-alerts' && item.category !== 'quality') return false;

      // Status pill filter
      if (this.filterStatus === 'UNREAD' && !item.unread) return false;
      if (this.filterStatus === 'CRITICAL' && item.priority !== 'Critical' && item.priority !== 'High') return false;

      // Search query filter
      if (this.searchQuery.trim() !== '') {
        const q = this.searchQuery.toLowerCase();
        const match =
          item.title.toLowerCase().includes(q) ||
          item.message.toLowerCase().includes(q) ||
          item.recordRef.toLowerCase().includes(q) ||
          item.plant.toLowerCase().includes(q) ||
          item.module.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  },

  renderNotificationRow(item) {
    // Subtle low-opacity badges (informs gently without screaming for attention)
    const priorityBadge = {
      Critical: 'bg-red-50 text-red-700',
      High: 'bg-amber-50 text-amber-800',
      Normal: 'bg-slate-100 text-slate-600',
      Low: 'bg-slate-50 text-slate-500'
    }[item.priority] || 'bg-slate-100 text-slate-600';

    return `
      <div 
        class="group relative rounded-2xl p-4 sm:p-5 transition-all duration-150 cursor-pointer ${item.unread ? 'bg-[#F0FAFC]/50 hover:bg-[#F0FAFC]/90' : 'bg-transparent hover:bg-slate-50/80'} flex items-start gap-3.5"
        data-id="${item.id}"
        data-href="${item.targetHash}"
      >
        <!-- Left Unread Dot Beacon -->
        <div class="pt-1.5 shrink-0">
          <div 
            class="w-2 h-2 rounded-full transition-transform ${item.unread ? 'bg-[#006C7A] scale-100 shadow-[0_0_6px_rgba(0,108,122,0.6)]' : 'bg-transparent scale-0'}" 
            title="${item.unread ? 'Unread notification' : 'Read'}"
          ></div>
        </div>

        <!-- Notification Content Body (Typographic Unification with Strict Noto Sans Scale) -->
        <div class="min-w-0 flex-1 pr-2">
          
          <!-- Header Line: Title & Subtle Tags -->
          <div class="flex flex-wrap items-center gap-2 mb-1.5">
            <h4 class="text-[13.5px] font-bold text-[#0F172A] tracking-tight group-hover:text-[#006C7A] transition-colors leading-snug">
              ${item.title}
            </h4>
            <span class="text-[11px] font-medium px-2 py-0.5 rounded-md ${priorityBadge}">
              ${item.priority}
            </span>
            <span class="text-[11px] font-medium text-slate-500">
              ${item.module}
            </span>
            <span class="text-[11px] font-mono font-medium text-slate-600 bg-slate-100/80 px-1.5 py-0.5 rounded">
              ${item.recordRef}
            </span>
          </div>

          <!-- Description Text (Unboxed, Natural Flow) -->
          <p class="text-[13px] font-normal text-[#475569] leading-relaxed max-w-4xl">
            ${item.message}
          </p>

          <!-- Metadata Footer: Timestamp & Facility -->
          <div class="flex flex-wrap items-center gap-2.5 mt-2.5 text-[11.5px] font-normal text-slate-400">
            <span class="text-slate-500 font-medium">${item.timestamp}</span>
            <span>•</span>
            <span>${item.plant}</span>
          </div>

        </div>

        <!-- Far Right Actions: Subtle, Appears on Hover without Permanent Clutter -->
        <div class="shrink-0 flex items-center gap-3 pt-1">
          <!-- Quick Toggle Read/Unread Icon -->
          <button
            type="button"
            class="notif-toggle-btn w-8 h-8 rounded-full text-slate-400 hover:text-[#006C7A] hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow-2xs"
            data-id="${item.id}"
            title="${item.unread ? 'Mark as read' : 'Mark as unread'}"
          >
            <i data-lucide="${item.unread ? 'check' : 'mail'}" class="w-4 h-4"></i>
          </button>

          <!-- Subtle Open Record Link -->
          <a
            href="${item.targetHash}"
            class="text-xs font-semibold text-[#006C7A] hover:text-[#005662] hidden sm:inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all pr-1"
            title="Open record in ERP"
          >
            <span>Open</span>
            <i data-lucide="arrow-up-right" class="w-3.5 h-3.5"></i>
          </a>
        </div>

      </div>
    `;
  },

  bindEvents(containerId) {
    const searchInput = document.getElementById('notif-search-input');
    const searchClear = document.getElementById('notif-search-clear');
    const markAllBtn = document.getElementById('notif-mark-all-read-btn');

    // Search input
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.render(containerId, this.activeTab);
        const el = document.getElementById('notif-search-input');
        if (el) {
          el.focus();
          el.setSelectionRange(el.value.length, el.value.length);
        }
      });
    }

    // Search clear
    if (searchClear) {
      searchClear.addEventListener('click', () => {
        this.searchQuery = '';
        this.render(containerId, this.activeTab);
      });
    }

    // Filter pills (All / Unread / Critical)
    document.querySelectorAll('.notif-pill-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.filterStatus = btn.dataset.status || 'ALL';
        this.render(containerId, this.activeTab);
      });
    });

    // Mark all as read
    if (markAllBtn) {
      markAllBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        NOTIFICATIONS_DATA.forEach(n => { n.unread = false; });
        this.render(containerId, this.activeTab);
        Header.render('header-container');
        Toast.show('All notifications marked as read', 'success');
      });
    }

    // Row click: navigate to targetHash & mark as read
    document.querySelectorAll('[data-href]').forEach(row => {
      row.addEventListener('click', (e) => {
        // Prevent trigger if clicking the toggle button or open link directly
        if (e.target.closest('.notif-toggle-btn') || e.target.closest('a')) {
          return;
        }
        const id = row.dataset.id;
        const targetHref = row.dataset.href;
        const item = NOTIFICATIONS_DATA.find(n => n.id === id);
        if (item) {
          item.unread = false;
          Header.render('header-container');
        }
        if (targetHref) {
          window.location.hash = targetHref;
        }
      });
    });

    // Toggle read/unread button
    document.querySelectorAll('.notif-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const item = NOTIFICATIONS_DATA.find(n => n.id === id);
        if (item) {
          item.unread = !item.unread;
          this.render(containerId, this.activeTab);
          Header.render('header-container');
          Toast.show(item.unread ? 'Marked as unread' : 'Marked as read', 'info');
        }
      });
    });
  }
};
