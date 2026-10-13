// Enterprise Notification Center View — Dedicated Full Page for Plant Alerts & Operational Notifications

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
  filters: {
    search: '',
    priority: 'ALL',
    module: 'ALL',
    status: 'ALL'
  },

  getUnreadCount() {
    return NOTIFICATIONS_DATA.filter(n => n.unread).length;
  },

  render(containerId, tabName = 'all-notifications') {
    this.activeTab = tabName || 'all-notifications';
    const container = document.getElementById(containerId);
    if (!container) return;

    const totalCount = NOTIFICATIONS_DATA.length;
    const unreadCount = NOTIFICATIONS_DATA.filter(n => n.unread).length;
    const criticalCount = NOTIFICATIONS_DATA.filter(n => n.priority === 'Critical' || n.priority === 'High').length;
    const procurementCount = NOTIFICATIONS_DATA.filter(n => n.category === 'procurement').length;

    const filteredList = this.getFilteredNotifications();

    container.innerHTML = `
      <div class="space-y-4">
        <!-- KPI Summary Row -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div class="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs flex items-center justify-between">
            <div>
              <div class="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">Total Notifications</div>
              <div class="text-2xl font-extrabold text-[#0F172A] mt-1">${totalCount}</div>
              <div class="text-[11px] text-[#006C7A] font-semibold mt-1">All active plant feeds</div>
            </div>
            <div class="w-11 h-11 rounded-xl bg-[#F0FAFC] border border-[#B2ECF3] flex items-center justify-center text-[#006C7A]">
              <i data-lucide="bell" class="w-5 h-5"></i>
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs flex items-center justify-between">
            <div>
              <div class="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">Unread Alerts</div>
              <div class="text-2xl font-extrabold text-[#006C7A] mt-1">${unreadCount}</div>
              <div class="text-[11px] text-[#64748B] font-medium mt-1">Requires supervisor review</div>
            </div>
            <div class="w-11 h-11 rounded-xl bg-[#E0F2FE] border border-[#7DD3FC] flex items-center justify-center text-[#0369A1]">
              <i data-lucide="mail-warning" class="w-5 h-5"></i>
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs flex items-center justify-between">
            <div>
              <div class="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">High / Critical Priority</div>
              <div class="text-2xl font-extrabold text-[#DC2626] mt-1">${criticalCount}</div>
              <div class="text-[11px] text-[#B45309] font-semibold mt-1">Cold chain & pending bills</div>
            </div>
            <div class="w-11 h-11 rounded-xl bg-[#FFE4E6] border border-[#FDA4AF] flex items-center justify-center text-[#BE123C]">
              <i data-lucide="shield-alert" class="w-5 h-5"></i>
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs flex items-center justify-between">
            <div>
              <div class="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">Procurement & Arrivals</div>
              <div class="text-2xl font-extrabold text-[#047857] mt-1">${procurementCount}</div>
              <div class="text-[11px] text-[#065F46] font-semibold mt-1">Live dock & booking events</div>
            </div>
            <div class="w-11 h-11 rounded-xl bg-[#DCFCE7] border border-[#86EFAC] flex items-center justify-center text-[#047857]">
              <i data-lucide="truck" class="w-5 h-5"></i>
            </div>
          </div>
        </div>

        <!-- Filter & Action Bar Card -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs">
          <div class="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1.5">Search Alerts</label>
              <div class="relative">
                <input
                  type="text"
                  id="notif-search-input"
                  value="${this.filters.search}"
                  placeholder="Search lot, arrival, chamber..."
                  class="w-full h-9 pl-9 pr-3 text-xs rounded-lg border border-[#CBD5E1]"
                />
                <svg class="w-4 h-4 text-[#64748B] absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1.5">Priority Level</label>
              <select id="notif-priority-filter" class="w-full h-9 px-3 text-xs rounded-lg border border-[#CBD5E1]">
                <option value="ALL" ${this.filters.priority === 'ALL' ? 'selected' : ''}>All Priorities</option>
                <option value="Critical" ${this.filters.priority === 'Critical' ? 'selected' : ''}>Critical</option>
                <option value="High" ${this.filters.priority === 'High' ? 'selected' : ''}>High</option>
                <option value="Normal" ${this.filters.priority === 'Normal' ? 'selected' : ''}>Normal</option>
                <option value="Low" ${this.filters.priority === 'Low' ? 'selected' : ''}>Low</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1.5">ERP Module</label>
              <select id="notif-module-filter" class="w-full h-9 px-3 text-xs rounded-lg border border-[#CBD5E1]">
                <option value="ALL" ${this.filters.module === 'ALL' ? 'selected' : ''}>All Modules</option>
                <option value="Purchase & RM" ${this.filters.module === 'Purchase & RM' ? 'selected' : ''}>Purchase & RM</option>
                <option value="Transactions & Bills" ${this.filters.module === 'Transactions & Bills' ? 'selected' : ''}>Transactions & Bills</option>
                <option value="Quality Control" ${this.filters.module === 'Quality Control' ? 'selected' : ''}>Quality Control</option>
                <option value="Cold Storage" ${this.filters.module === 'Cold Storage' ? 'selected' : ''}>Cold Storage</option>
                <option value="Pre-Processing" ${this.filters.module === 'Pre-Processing' ? 'selected' : ''}>Pre-Processing</option>
                <option value="Sales & Export" ${this.filters.module === 'Sales & Export' ? 'selected' : ''}>Sales & Export</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1.5">Read Status</label>
              <select id="notif-status-filter" class="w-full h-9 px-3 text-xs rounded-lg border border-[#CBD5E1]">
                <option value="ALL" ${this.filters.status === 'ALL' ? 'selected' : ''}>All Statuses</option>
                <option value="UNREAD" ${this.filters.status === 'UNREAD' ? 'selected' : ''}>Unread Only</option>
                <option value="READ" ${this.filters.status === 'READ' ? 'selected' : ''}>Read Only</option>
              </select>
            </div>

            <div class="flex items-center gap-2">
              <button
                type="button"
                id="notif-reset-btn"
                class="h-9 px-3 rounded-lg border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-xs font-semibold text-[#334155] cursor-pointer transition-colors"
              >
                Reset
              </button>
              <button
                type="button"
                id="notif-mark-all-read-btn"
                class="flex-1 h-9 px-3.5 rounded-lg btn-primary text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <i data-lucide="check-check" class="w-4 h-4"></i>
                <span>Mark All Read</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Dedicated Notification Feed List -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden">
          <div class="px-5 py-3.5 border-b border-[#E2E8F0] flex items-center justify-between bg-[#FAFBFC]">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-[#0F172A]">Showing ${filteredList.length} Notification${filteredList.length === 1 ? '' : 's'}</span>
              <span class="lozenge lozenge-inprogress">${unreadCount} Unread</span>
            </div>
            <div class="text-[11px] text-[#64748B] font-medium">Real-time Plant Telemetry & Workflow Stream</div>
          </div>

          <div class="divide-y divide-[#E2E8F0]">
            ${filteredList.length === 0 ? `
              <div class="py-12 text-center">
                <div class="w-12 h-12 rounded-2xl bg-[#F0FAFC] border border-[#B2ECF3] text-[#006C7A] flex items-center justify-center mx-auto mb-3">
                  <i data-lucide="bell-off" class="w-6 h-6"></i>
                </div>
                <div class="text-sm font-bold text-[#0F172A]">No matching notifications</div>
                <p class="text-xs text-[#64748B] mt-1">Try clearing your filters or switching notification tabs above.</p>
              </div>
            ` : filteredList.map(item => this.renderNotificationCard(item)).join('')}
          </div>
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
      if (this.activeTab === 'unread-alerts' && !item.unread) return false;
      if (this.activeTab === 'procurement-alerts' && item.category !== 'procurement') return false;
      if (this.activeTab === 'quality-alerts' && item.category !== 'quality') return false;

      if (this.filters.priority !== 'ALL' && item.priority !== this.filters.priority) return false;
      if (this.filters.module !== 'ALL' && item.module !== this.filters.module) return false;
      if (this.filters.status === 'UNREAD' && !item.unread) return false;
      if (this.filters.status === 'READ' && item.unread) return false;

      if (this.filters.search.trim() !== '') {
        const q = this.filters.search.toLowerCase();
        const match =
          item.title.toLowerCase().includes(q) ||
          item.message.toLowerCase().includes(q) ||
          item.recordRef.toLowerCase().includes(q) ||
          item.plant.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  },

  renderNotificationCard(item) {
    const priorityBadge = {
      Critical: 'lozenge-danger',
      High: 'lozenge-warning',
      Normal: 'lozenge-inprogress',
      Low: 'lozenge-default'
    }[item.priority] || 'lozenge-default';

    const iconMap = {
      'Cold Storage': 'snowflake',
      'Purchase & RM': 'truck',
      'Quality Control': 'microscope',
      'Transactions & Bills': 'receipt',
      'Pre-Processing': 'layers',
      'Sales & Export': 'ship'
    };
    const iconName = iconMap[item.module] || 'bell';

    return `
      <div class="p-4 sm:px-6 transition-colors ${item.unread ? 'bg-[#F0FAFC]/60 hover:bg-[#F0FAFC]' : 'bg-white hover:bg-[#F8FAFC]'} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="flex items-start gap-3.5 min-w-0">
          <div class="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center border ${item.unread ? 'bg-[#006C7A] text-white border-[#005662]' : 'bg-[#F8FAFC] text-[#64748B] border-[#CBD5E1]'}">
            <i data-lucide="${iconName}" class="w-5 h-5"></i>
          </div>
          <div class="min-w-0 flex-1">
            <div class="flex flex-wrap items-center gap-2 mb-1">
              ${item.unread ? `<span class="inline-block w-2 h-2 rounded-full bg-[#006C7A]" title="Unread"></span>` : ''}
              <span class="text-xs font-bold text-[#0F172A]">${item.title}</span>
              <span class="lozenge ${priorityBadge}">${item.priority}</span>
              <span class="lozenge lozenge-default">${item.module}</span>
              <span class="text-[11px] font-semibold text-[#006C7A] bg-[#E0F7FA] px-2 py-0.5 rounded">${item.recordRef}</span>
            </div>
            <p class="text-xs text-[#475569] leading-relaxed">${item.message}</p>
            <div class="flex flex-wrap items-center gap-3 mt-2 text-[11px] text-[#64748B]">
              <span class="inline-flex items-center gap-1"><i data-lucide="clock" class="w-3.5 h-3.5"></i> ${item.timestamp}</span>
              <span>•</span>
              <span class="inline-flex items-center gap-1"><i data-lucide="building-2" class="w-3.5 h-3.5"></i> ${item.plant}</span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2 shrink-0 self-end sm:self-center">
          <button
            type="button"
            class="notif-toggle-read-btn px-3 py-1.5 rounded-lg border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-[11px] font-semibold text-[#334155] cursor-pointer transition-colors"
            data-id="${item.id}"
          >
            ${item.unread ? 'Mark Read' : 'Mark Unread'}
          </button>
          <a
            href="${item.targetHash}"
            class="px-3 py-1.5 rounded-lg bg-[#F0FAFC] hover:bg-[#E0F7FA] border border-[#B2ECF3] text-[11px] font-bold text-[#006C7A] inline-flex items-center gap-1 transition-colors"
          >
            <span>Open Record</span>
            <i data-lucide="arrow-up-right" class="w-3.5 h-3.5"></i>
          </a>
        </div>
      </div>
    `;
  },

  bindEvents(containerId) {
    const searchInput = document.getElementById('notif-search-input');
    const prioritySel = document.getElementById('notif-priority-filter');
    const moduleSel = document.getElementById('notif-module-filter');
    const statusSel = document.getElementById('notif-status-filter');
    const resetBtn = document.getElementById('notif-reset-btn');
    const markAllBtn = document.getElementById('notif-mark-all-read-btn');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.filters.search = e.target.value;
        this.render(containerId, this.activeTab);
        const el = document.getElementById('notif-search-input');
        if (el) {
          el.focus();
          el.setSelectionRange(el.value.length, el.value.length);
        }
      });
    }

    if (prioritySel) {
      prioritySel.addEventListener('change', (e) => {
        this.filters.priority = e.target.value;
        this.render(containerId, this.activeTab);
      });
    }

    if (moduleSel) {
      moduleSel.addEventListener('change', (e) => {
        this.filters.module = e.target.value;
        this.render(containerId, this.activeTab);
      });
    }

    if (statusSel) {
      statusSel.addEventListener('change', (e) => {
        this.filters.status = e.target.value;
        this.render(containerId, this.activeTab);
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.filters = { search: '', priority: 'ALL', module: 'ALL', status: 'ALL' };
        this.render(containerId, this.activeTab);
        Toast.show('Notification filters reset', 'info');
      });
    }

    if (markAllBtn) {
      markAllBtn.addEventListener('click', () => {
        NOTIFICATIONS_DATA.forEach(n => { n.unread = false; });
        this.render(containerId, this.activeTab);
        Header.render('header-container');
        Toast.show('All notifications marked as read', 'success');
      });
    }

    document.querySelectorAll('.notif-toggle-read-btn').forEach(btn => {
      btn.addEventListener('click', () => {
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
