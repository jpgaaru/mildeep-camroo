/* ================================================================
   APPLICATION MAIN ENTRY POINT & GLOBAL EVENT LISTENERS
   ================================================================ */

/* ================= RIPPLE EFFECT ================= */
document.addEventListener('click', function (e) {
  const btn = e.target.closest('.btn');
  if (!btn) return;
  const circle = document.createElement('span');
  const diameter = Math.max(btn.clientWidth, btn.clientHeight);
  const radius = diameter / 2;
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${e.clientX - btn.getBoundingClientRect().left - radius}px`;
  circle.style.top = `${e.clientY - btn.getBoundingClientRect().top - radius}px`;
  circle.classList.add('ripple');
  const ripple = btn.getElementsByClassName('ripple')[0];
  if (ripple) ripple.remove();
  btn.appendChild(circle);
});

/* ================= CLICK-TO-COPY ROW IDS ================= */
document.addEventListener('click', e => {
  const rid = e.target.closest('.row-id');
  if (!rid) return;
  e.stopPropagation();
  if (navigator.clipboard) navigator.clipboard.writeText(rid.textContent);
  rid.classList.add('copied');
  setTimeout(() => rid.classList.remove('copied'), 700);
});

/* ================= KEYBOARD ACCESSIBILITY FOR TABS ================= */
document.addEventListener('keydown', e => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.nav-item, .sub-nav-item')) {
    e.preventDefault();
    e.target.click();
  }
});

/* ================= CONTEXT MENU ================= */
document.addEventListener('contextmenu', e => {
  const card = e.target.closest('.kpi-card, .chart-card, .data-table tbody tr, .kanban-card, .product-card, .coldroom-card');
  if (!card) return;
  e.preventDefault();
  const m = document.getElementById('contextMenu');
  m.innerHTML = `<div class="context-menu-item" onclick="showToast('info','View','Opening details')"><i data-lucide="eye"></i> View Details</div>
    <div class="context-menu-item" onclick="showToast('info','Edit','Opening editor')"><i data-lucide="edit"></i> Edit</div>
    <div class="context-menu-item" onclick="showToast('info','Duplicate','Record duplicated')"><i data-lucide="copy"></i> Duplicate</div>
    <div class="context-menu-divider"></div>
    <div class="context-menu-item" onclick="exportDashboard()"><i data-lucide="download"></i> Export</div>
    <div class="context-menu-item" onclick="showToast('info','Share','Link copied')"><i data-lucide="share-2"></i> Share</div>
    <div class="context-menu-divider"></div>
    <div class="context-menu-item danger" onclick="showToast('warning','Deleted','Record deleted')"><i data-lucide="trash-2"></i> Delete</div>`;
  m.style.left = Math.min(e.pageX, window.innerWidth - 220) + 'px';
  m.style.top = Math.min(e.pageY, window.innerHeight - 300) + 'px';
  m.classList.add('open');
  if (window.lucide) lucide.createIcons();
});

document.addEventListener('click', () => {
  const m = document.getElementById('contextMenu');
  if (m) m.classList.remove('open');
});

/* ================= NAV SCROLL SHADOWS ================= */
['primaryNav', 'secondaryNav'].forEach(id => {
  const nav = document.getElementById(id);
  if (!nav) return;
  const update = () => {
    nav.classList.toggle('scroll-left', nav.scrollLeft > 4);
    nav.classList.toggle('scroll-right', nav.scrollLeft < nav.scrollWidth - nav.clientWidth - 4);
  };
  nav.addEventListener('scroll', update);
  update();
});

/* ================= SCROLL-TO-TOP VISIBILITY ================= */
document.addEventListener('DOMContentLoaded', () => {
  const contentArea = document.getElementById('contentArea');
  if (contentArea) {
    contentArea.addEventListener('scroll', function () {
      const btn = document.getElementById('scrollTopBtn');
      if (btn) btn.classList.toggle('show', this.scrollTop > 300);
    });
  }
});

/* ================= GLOBAL SHORTCUTS ================= */
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openCommandPalette(); }
  if (e.key === 'Escape') { 
    closeCommandPalette(); 
    closeDrawer(); 
    closeNotifications(); 
    document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open')); 
  }
  if (!e.target.matches('input,textarea,select')) {
    if (e.key === 'n') { e.preventDefault(); openModal('newOrderModal'); }
    if (e.key === 'r') { e.preventDefault(); refreshData(); }
    if (e.key === 'f') { e.preventDefault(); toggleFullscreen(); }
    if (e.key === '?') { e.preventDefault(); openModal('shortcutsModal'); }
  }
  if (document.getElementById('cmdPalette').classList.contains('open')) {
    const n = cmdFiltered(document.getElementById('cmdSearch').value).length;
    if (e.key === 'ArrowDown') { e.preventDefault(); state.cmdIndex = Math.min(state.cmdIndex + 1, n - 1); renderCmdPalette(document.getElementById('cmdSearch').value); }
    if (e.key === 'ArrowUp') { e.preventDefault(); state.cmdIndex = Math.max(state.cmdIndex - 1, 0); renderCmdPalette(document.getElementById('cmdSearch').value); }
    if (e.key === 'Enter') { e.preventDefault(); executeCmd(state.cmdIndex); }
  }
});

/* ================= BOOT SEQUENCE ================= */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof initBrand === 'function') initBrand();
  if (window.lucide) lucide.createIcons();
  navigate('sales', 'dashboard');
});
