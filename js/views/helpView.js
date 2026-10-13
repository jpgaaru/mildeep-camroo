// Help & Support Center View — 24/7 IT Helpdesk, Plant Support Tickets & Compliance Documentation

import { Toast } from '../components/toast.js';
import { Modal } from '../components/modal.js';

const SUPPORT_TICKETS = [
  {
    ticketId: 'SUP-2026-412',
    subject: 'Weighbridge #2 RS-232 Serial Auto-Capture Calibration',
    category: 'Hardware & IoT',
    plant: 'Devi Fisheries #1 — Kakinada',
    priority: 'High',
    assignedTo: 'Ramesh Babu (Plant IT)',
    status: 'In Progress',
    createdAt: '13 Oct 2026, 09:40 AM'
  },
  {
    ticketId: 'SUP-2026-409',
    subject: 'Add New Export Buyer Bank Swift Code for EU Rotterdam Consignee',
    category: 'ERP Master Data',
    plant: 'Devi Fisheries #1 — Kakinada',
    priority: 'Normal',
    assignedTo: 'Srinivas Rao (ERP Admin)',
    status: 'Resolved',
    createdAt: '12 Oct 2026, 04:15 PM'
  },
  {
    ticketId: 'SUP-2026-404',
    subject: 'Zebra ZT411 Barcode Thermal Printer Label Alignment on IQF Line #1',
    category: 'Barcode & Scanners',
    plant: 'Devi Fisheries #2 — Bhimavaram',
    priority: 'Normal',
    assignedTo: 'Kiran Kumar (Floor Support)',
    status: 'Resolved',
    createdAt: '11 Oct 2026, 11:20 AM'
  }
];

export const HelpView = {
  render(containerId, activeTab = 'it-support') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="space-y-4">
        <!-- Support Desk KPI Banner -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div class="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs flex items-center justify-between">
            <div>
              <div class="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">24/7 Plant IT Helpline</div>
              <div class="text-lg font-extrabold text-[#006C7A] mt-1">+91 884-230-9900</div>
              <div class="text-[11px] text-[#64748B] font-medium mt-1">Ext: 108 (Kakinada HQ)</div>
            </div>
            <div class="w-11 h-11 rounded-xl bg-[#F0FAFC] border border-[#B2ECF3] flex items-center justify-center text-[#006C7A]">
              <i data-lucide="headset" class="w-5 h-5"></i>
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs flex items-center justify-between">
            <div>
              <div class="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">Open Support Tickets</div>
              <div class="text-2xl font-extrabold text-[#0F172A] mt-1">${SUPPORT_TICKETS.filter(t => t.status !== 'Resolved').length}</div>
              <div class="text-[11px] text-[#047857] font-semibold mt-1">Avg response: 14 mins</div>
            </div>
            <div class="w-11 h-11 rounded-xl bg-[#E0F2FE] border border-[#7DD3FC] flex items-center justify-center text-[#0369A1]">
              <i data-lucide="life-buoy" class="w-5 h-5"></i>
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs flex items-center justify-between">
            <div>
              <div class="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">ERP Cloud Telemetry</div>
              <div class="text-lg font-extrabold text-[#047857] mt-1">99.98% Online</div>
              <div class="text-[11px] text-[#64748B] font-medium mt-1">All 4 Plants Synced</div>
            </div>
            <div class="w-11 h-11 rounded-xl bg-[#DCFCE7] border border-[#86EFAC] flex items-center justify-center text-[#047857]">
              <i data-lucide="activity" class="w-5 h-5"></i>
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs flex items-center justify-between">
            <div>
              <div class="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">HACCP & BRCGS SOPs</div>
              <div class="text-lg font-extrabold text-[#0F172A] mt-1">v2026.4 Certified</div>
              <div class="text-[11px] text-[#006C7A] font-semibold mt-1">MPEDA / USFDA Ready</div>
            </div>
            <div class="w-11 h-11 rounded-xl bg-[#FEF3C7] border border-[#FCD34D] flex items-center justify-center text-[#B45309]">
              <i data-lucide="file-check-2" class="w-5 h-5"></i>
            </div>
          </div>
        </div>

        <!-- Support Tickets & Quick Help Section -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden">
          <div class="px-6 py-4 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3 bg-[#FAFBFC]">
            <div>
              <h2 class="text-sm font-bold text-[#0F172A]">Plant IT & ERP Support Tickets</h2>
              <p class="text-xs text-[#64748B] mt-0.5">Raise hardware, weighbridge, thermal barcode, or ERP workflow requests directly with the Devi Fisheries IT Desk.</p>
            </div>
            <button
              type="button"
              id="raise-support-ticket-btn"
              class="btn-primary h-9 px-4 rounded-lg text-xs font-bold inline-flex items-center gap-2 cursor-pointer"
            >
              <i data-lucide="plus-circle" class="w-4 h-4"></i>
              <span>Raise Support Ticket</span>
            </button>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                  <th class="py-3 px-5">Ticket ID</th>
                  <th class="py-3 px-4">Subject & Issue</th>
                  <th class="py-3 px-4">Category</th>
                  <th class="py-3 px-4">Plant Location</th>
                  <th class="py-3 px-4">Priority</th>
                  <th class="py-3 px-4">Assigned Engineer</th>
                  <th class="py-3 px-4">Status</th>
                  <th class="py-3 px-5 text-right">Logged Time</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#E2E8F0] text-xs">
                ${SUPPORT_TICKETS.map(t => `
                  <tr class="hover:bg-[#F8FAFC] transition-colors">
                    <td class="py-3.5 px-5 font-bold text-[#006C7A]">${t.ticketId}</td>
                    <td class="py-3.5 px-4 font-semibold text-[#0F172A]">${t.subject}</td>
                    <td class="py-3.5 px-4"><span class="lozenge lozenge-default">${t.category}</span></td>
                    <td class="py-3.5 px-4 text-[#475569]">${t.plant}</td>
                    <td class="py-3.5 px-4">
                      <span class="lozenge ${t.priority === 'High' ? 'lozenge-warning' : 'lozenge-inprogress'}">${t.priority}</span>
                    </td>
                    <td class="py-3.5 px-4 text-[#334155] font-medium">${t.assignedTo}</td>
                    <td class="py-3.5 px-4">
                      <span class="lozenge ${t.status === 'Resolved' ? 'lozenge-success' : 'lozenge-warning'}">${t.status}</span>
                    </td>
                    <td class="py-3.5 px-5 text-right text-[#64748B]">${t.createdAt}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    if (typeof window !== 'undefined' && window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }

    const raiseBtn = document.getElementById('raise-support-ticket-btn');
    if (raiseBtn) {
      raiseBtn.addEventListener('click', () => {
        Modal.open({
          title: 'Raise Plant IT / ERP Support Ticket',
          size: 'md',
          content: `
            <div class="space-y-3.5 text-xs">
              <div>
                <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Issue Subject</label>
                <input type="text" id="new-ticket-subject" placeholder="e.g., Dock #1 Weighbridge indicator sync delay" class="w-full h-9 px-3 rounded-lg border border-[#CBD5E1]" />
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Category</label>
                  <select id="new-ticket-category" class="w-full h-9 px-3 rounded-lg border border-[#CBD5E1]">
                    <option value="Hardware & IoT">Hardware & IoT</option>
                    <option value="Barcode & Scanners">Barcode & Scanners</option>
                    <option value="ERP Master Data">ERP Master Data</option>
                    <option value="Accounts & Billing">Accounts & Billing</option>
                  </select>
                </div>
                <div>
                  <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Priority</label>
                  <select id="new-ticket-priority" class="w-full h-9 px-3 rounded-lg border border-[#CBD5E1]">
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Plant Location</label>
                <select id="new-ticket-plant" class="w-full h-9 px-3 rounded-lg border border-[#CBD5E1]">
                  <option value="Devi Fisheries #1 — Kakinada">Devi Fisheries #1 — Kakinada</option>
                  <option value="Devi Fisheries #2 — Bhimavaram">Devi Fisheries #2 — Bhimavaram</option>
                  <option value="Devi Fisheries #3 — Visakhapatnam">Devi Fisheries #3 — Visakhapatnam</option>
                </select>
              </div>
            </div>
          `,
          footerButtons: [
            { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
            {
              label: 'Submit Ticket',
              type: 'primary',
              onClick: (m) => {
                const subj = document.getElementById('new-ticket-subject')?.value?.trim() || 'Plant Floor Support Request';
                const cat = document.getElementById('new-ticket-category')?.value || 'Hardware & IoT';
                const prio = document.getElementById('new-ticket-priority')?.value || 'Normal';
                const plant = document.getElementById('new-ticket-plant')?.value || 'Devi Fisheries #1 — Kakinada';
                SUPPORT_TICKETS.unshift({
                  ticketId: `SUP-2026-${413 + SUPPORT_TICKETS.length}`,
                  subject: subj,
                  category: cat,
                  plant,
                  priority: prio,
                  assignedTo: 'Ramesh Babu (Plant IT)',
                  status: 'In Progress',
                  createdAt: 'Just now'
                });
                m.close();
                this.render(containerId, activeTab);
                Toast.show('Support ticket logged with IT Helpdesk', 'success');
              }
            }
          ]
        });
      });
    }
  }
};
