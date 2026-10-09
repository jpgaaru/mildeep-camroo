// Enterprise User Onboarding Tour Guide Component with Spotlight & Directional Popups

export const TourGuide = {
  currentStep: 0,
  isActive: false,
  resizeListener: null,
  keyListener: null,

  steps: [
    {
      target: () => document.querySelector('.sidebar-mod-btn') || document.querySelector('[data-module-id="purchase"]') || document.querySelector('#sidebar-nav-groups'),
      title: '🏢 1. Department Modules',
      content: 'Navigate across end-to-end seafood operations: Raw Material Purchase, Pre-Processing, Quality Lab (QC), Production, Coldstore, and Export Sales.',
      placement: 'right',
      badge: 'Step 1 of 4'
    },
    {
      target: () => document.querySelector('#sidebar-nav-groups a[href*="purchase"]') || document.querySelector('#sidebar-nav-groups a') || document.querySelector('.sidebar-mod-btn'),
      title: '📋 2. Functional Sub-Menus',
      content: 'Access daily dock receiving logs, procurement bookings, supplier bills, payment registers, and quantitative processing ledgers.',
      placement: 'right',
      badge: 'Step 2 of 4'
    },
    {
      target: () => document.querySelector('[id$="-tab-bar-container"]') || document.querySelector('.tab-active') || document.querySelector('button[role="tab"]'),
      title: '📑 3. Workspace Tabs',
      content: 'Switch smoothly between real-time KPI Dashboards, Deep Lot Tracking, Farm Bookings, and Delivery records without refreshing.',
      placement: 'bottom',
      badge: 'Step 3 of 4'
    },
    {
      target: () => document.querySelector('[id$="-dt-filter-bar"]') || document.querySelector('.bg-white.rounded-xl.border') || document.querySelector('select'),
      title: '🔍 4. Multi-Parameter Filters',
      content: 'Filter records by Species (Vannamei/Black Tiger), Center, Plant, and Date ranges. Click "Hide Filter" to collapse and maximize screen space.',
      placement: 'bottom',
      badge: 'Step 4 of 4'
    }
  ],

  start(force = true) {
    this.currentStep = 0;
    this.isActive = true;
    this.createElements();
    this.bindEvents();
    
    // Give DOM a tick to stabilize layout before measuring coordinates
    setTimeout(() => {
      this.renderStep(0);
    }, 60);
  },

  createElements() {
    this.cleanup();

    // Container
    const root = document.createElement('div');
    root.id = 'tour-guide-root';
    root.className = 'fixed inset-0 z-[9990] pointer-events-auto select-none';

    root.innerHTML = `
      <!-- Background Click-Blocker & Dimmer Overlay with cutout effect -->
      <div id="tour-spotlight-box" class="fixed pointer-events-none rounded-xl transition-all duration-300 ease-out" 
           style="box-shadow: 0 0 0 9999px rgba(9, 30, 66, 0.72), 0 0 0 3px #0284C7; z-index: 9992;">
        <!-- Pulsing beacon marker on corner of spotlight -->
        <span class="absolute -top-1.5 -right-1.5 flex h-4 w-4">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0284C7] opacity-75"></span>
          <span class="relative inline-flex rounded-full h-4 w-4 bg-[#0284C7] border-2 border-white"></span>
        </span>
      </div>

      <!-- Popover Tooltip Card -->
      <div id="tour-popover-card" class="fixed z-[9999] w-[360px] max-w-[90vw] bg-white rounded-xl border border-[#DFE1E6] p-5 text-xs transition-all duration-300 ease-out" style="top: 20%; left: 50%; transform: translate(-50%, 0);">
        <!-- Header -->
        <div class="flex items-center justify-between pb-3 border-b border-[#EBECF0]">
          <div class="flex items-center gap-2">
            <span id="tour-step-badge" class="px-2.5 py-0.5 rounded-full bg-[#F0F9FF] text-[#0284C7] font-bold text-[11px] uppercase tracking-wide">Step 1 of 4</span>
            <span class="w-1.5 h-1.5 rounded-full bg-[#36B37E]"></span>
          </div>
          <button id="tour-close-btn" class="text-[#6B778C] hover:text-[#172B4D] p-1.5 rounded-md hover:bg-[#EBECF0] transition-colors cursor-pointer" title="Skip Tour (Esc)">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <!-- Content Body -->
        <div class="py-3.5 space-y-2">
          <h4 id="tour-step-title" class="text-sm font-black text-[#172B4D] leading-snug"></h4>
          <p id="tour-step-content" class="text-[#42526E] leading-relaxed text-xs"></p>
        </div>

        <!-- Footer Navigation -->
        <div class="pt-3 border-t border-[#EBECF0] flex items-center justify-between gap-3">
          <!-- Step Dots -->
          <div id="tour-dots-container" class="flex items-center gap-1.5"></div>

          <!-- Action Buttons -->
          <div class="flex items-center gap-2">
            <button id="tour-prev-btn" class="px-3 py-1.5 rounded-md text-xs font-semibold text-[#5E6C84] hover:bg-[#EBECF0] hover:text-[#172B4D] transition-colors cursor-pointer">
              Back
            </button>
            <button id="tour-next-btn" class="btn-primary px-4 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer">
              <span id="tour-next-text">Next</span>
              <svg id="tour-next-icon" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>

        <!-- Directional Pointer Arrow -->
        <div id="tour-arrow" class="absolute w-3 h-3 bg-white border border-[#DFE1E6] transform rotate-45 pointer-events-none"></div>
      </div>
    `;

    document.body.appendChild(root);
  },

  renderStep(index) {
    if (index < 0 || index >= this.steps.length) {
      this.finish();
      return;
    }

    this.currentStep = index;
    const step = this.steps[index];
    const targetEl = typeof step.target === 'function' ? step.target() : step.target;

    const popover = document.getElementById('tour-popover-card');
    const badgeEl = document.getElementById('tour-step-badge');
    const titleEl = document.getElementById('tour-step-title');
    const contentEl = document.getElementById('tour-step-content');
    const prevBtn = document.getElementById('tour-prev-btn');
    const nextBtnText = document.getElementById('tour-next-text');
    const nextBtnIcon = document.getElementById('tour-next-icon');
    const dotsContainer = document.getElementById('tour-dots-container');

    if (!popover || !badgeEl || !titleEl || !contentEl) return;

    badgeEl.innerText = step.badge;
    titleEl.innerText = step.title;
    contentEl.innerText = step.content;

    // Previous Button
    if (index === 0) {
      prevBtn.style.visibility = 'hidden';
    } else {
      prevBtn.style.visibility = 'visible';
    }

    // Next vs Finish Button
    if (index === this.steps.length - 1) {
      nextBtnText.innerText = 'Finish Tour';
      if (nextBtnIcon) nextBtnIcon.style.display = 'none';
    } else {
      nextBtnText.innerText = 'Next';
      if (nextBtnIcon) nextBtnIcon.style.display = 'inline-block';
    }

    // Interactive Dots
    if (dotsContainer) {
      dotsContainer.innerHTML = this.steps.map((_, i) => `
        <span class="inline-block h-2 rounded-full transition-all cursor-pointer ${i === index ? 'bg-[#0284C7] w-5' : 'bg-[#DFE1E6] hover:bg-[#A5ADBA] w-2'}" data-step-dot="${i}" title="Jump to step ${i + 1}"></span>
      `).join('');

      dotsContainer.querySelectorAll('[data-step-dot]').forEach(dot => {
        dot.addEventListener('click', (e) => {
          const s = parseInt(e.currentTarget.dataset.stepDot, 10);
          this.renderStep(s);
        });
      });
    }

    // Position the spotlight box & popover tooltip
    this.positionSpotlightAndPopover(targetEl, step.placement);
  },

  positionSpotlightAndPopover(targetEl, preferredPlacement = 'bottom') {
    const spotlightBox = document.getElementById('tour-spotlight-box');
    const popover = document.getElementById('tour-popover-card');
    const arrow = document.getElementById('tour-arrow');

    if (!spotlightBox || !popover) return;

    let targetRect = null;
    if (targetEl && typeof targetEl.getBoundingClientRect === 'function') {
      try {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      } catch (e) {}
      targetRect = targetEl.getBoundingClientRect();
    }

    // If target element is not found or has 0 size, default to center
    if (!targetRect || (targetRect.width === 0 && targetRect.height === 0)) {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetRect = { left: cx - 150, top: cy - 80, width: 300, height: 160, right: cx + 150, bottom: cy + 80 };
    }

    const pad = 6;
    const boxX = Math.max(0, targetRect.left - pad);
    const boxY = Math.max(0, targetRect.top - pad);
    const boxW = Math.max(24, targetRect.width + pad * 2);
    const boxH = Math.max(24, targetRect.height + pad * 2);

    spotlightBox.style.left = `${boxX}px`;
    spotlightBox.style.top = `${boxY}px`;
    spotlightBox.style.width = `${boxW}px`;
    spotlightBox.style.height = `${boxH}px`;
    spotlightBox.style.opacity = '1';

    // Popover placement
    const popW = 360;
    const popH = 220;
    const gap = 16;

    let popLeft = 0;
    let popTop = 0;
    let arrowCss = '';

    if (preferredPlacement === 'right') {
      popLeft = boxX + boxW + gap;
      popTop = boxY + boxH / 2 - popH / 2;
      arrowCss = `left: -6px; top: ${popH / 2 - 6}px; border-right: none; border-top: none;`;
      // If right overflows screen, flip to bottom or left
      if (popLeft + popW > window.innerWidth - 12) {
        popLeft = Math.max(12, boxX + boxW / 2 - popW / 2);
        popTop = boxY + boxH + gap;
        arrowCss = `top: -6px; left: 32px; border-bottom: none; border-right: none;`;
      }
    } else if (preferredPlacement === 'left') {
      popLeft = boxX - popW - gap;
      popTop = boxY + boxH / 2 - popH / 2;
      arrowCss = `right: -6px; top: ${popH / 2 - 6}px; border-left: none; border-bottom: none;`;
      // If left overflows
      if (popLeft < 12) {
        popLeft = Math.max(12, boxX + boxW / 2 - popW / 2);
        popTop = boxY + boxH + gap;
        arrowCss = `top: -6px; left: 32px; border-bottom: none; border-right: none;`;
      }
    } else if (preferredPlacement === 'bottom-left') {
      popLeft = boxX + boxW - popW;
      popTop = boxY + boxH + gap;
      arrowCss = `top: -6px; right: 28px; border-bottom: none; border-right: none;`;
    } else { // 'bottom'
      popLeft = boxX + boxW / 2 - popW / 2;
      popTop = boxY + boxH + gap;
      arrowCss = `top: -6px; left: ${popW / 2 - 6}px; border-bottom: none; border-right: none;`;
    }

    // Boundary constraints
    if (popLeft + popW > window.innerWidth - 16) {
      popLeft = window.innerWidth - popW - 16;
    }
    if (popLeft < 16) {
      popLeft = 16;
    }
    if (popTop + popH > window.innerHeight - 16) {
      popTop = Math.max(16, boxY - popH - gap);
      arrowCss = `bottom: -6px; left: ${popW / 2 - 6}px; border-top: none; border-left: none;`;
    }
    if (popTop < 16) {
      popTop = 16;
    }

    popover.style.left = `${popLeft}px`;
    popover.style.top = `${popTop}px`;
    popover.style.transform = 'none';

    if (arrow) {
      arrow.style.cssText = arrowCss;
    }
  },

  next() {
    this.renderStep(this.currentStep + 1);
  },

  prev() {
    this.renderStep(this.currentStep - 1);
  },

  finish() {
    this.cleanup();
  },

  skip() {
    this.cleanup();
  },

  cleanup() {
    this.isActive = false;
    const root = document.getElementById('tour-guide-root');
    if (root) {
      root.remove();
    }
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
      this.resizeListener = null;
    }
    if (this.keyListener) {
      window.removeEventListener('keydown', this.keyListener);
      this.keyListener = null;
    }
  },

  bindEvents() {
    const closeBtn = document.getElementById('tour-close-btn');
    const nextBtn = document.getElementById('tour-next-btn');
    const prevBtn = document.getElementById('tour-prev-btn');

    if (closeBtn) closeBtn.onclick = () => this.skip();
    if (nextBtn) nextBtn.onclick = () => this.next();
    if (prevBtn) prevBtn.onclick = () => this.prev();

    this.resizeListener = () => {
      if (this.isActive) {
        this.renderStep(this.currentStep);
      }
    };
    window.addEventListener('resize', this.resizeListener);

    this.keyListener = (e) => {
      if (!this.isActive) return;
      if (e.key === 'Escape') {
        this.skip();
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        this.next();
      } else if (e.key === 'ArrowLeft') {
        this.prev();
      }
    };
    window.addEventListener('keydown', this.keyListener);
  }
};
