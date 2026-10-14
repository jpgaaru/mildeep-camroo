// AquaPulse Framework — Stage 3: Enterprise Organisms & Layout Shells
// Reusable page organisms: AppShell, ChartCard, TableCard

export const Organisms = {
  /**
   * Master Application Shell Organism (Floating Sidebar + Sticky Top Cards + Main Content Viewport)
   */
  AppShell({ isCollapsed = false } = {}) {
    const collapsedClass = isCollapsed ? 'is-collapsed' : '';
    return `
      <div id="erp-app-shell" data-layout="option1" class="min-h-screen bg-[#F8FAFC]">
        <!-- Left Floated Sidebar (Floating with rounded corners) -->
        <div id="sidebar-container" class="${collapsedClass}"></div>

        <!-- Main Layout Wrapper (offset by floating sidebar width + margins) -->
        <div id="main-layout-wrapper" class="${collapsedClass} flex flex-col min-h-screen">
          <!-- Sticky Top Navigation & Tabs Area -->
          <div id="sticky-top-nav-wrapper" class="sticky top-0 z-30 bg-[#F8FAFC] pt-3 mr-3 pb-1 space-y-3">
            <!-- Card 1: Top Header Card -->
            <div class="rounded-2xl border border-[#E2E8F0] bg-white shadow-xs">
              <div id="header-container" class="bg-white rounded-2xl"></div>
            </div>

            <!-- Breadcrumbs, Section Header & Underline Tabs Menu (Sticky, Flat) -->
            <div id="sticky-tabs-header-card" class="pt-1 pb-0 px-1 bg-[#F8FAFC]">
              <div id="breadcrumbs-container" class="mb-1.5"></div>
              <div id="section-title-container" class="mb-2"></div>
              <div id="global-tab-bar-container"></div>
            </div>
          </div>

          <!-- Module Subview Injected Here (Full-Width Responsive UI) -->
          <main id="main-content-container" class="px-0 pt-2 pb-8 flex-1 w-full mr-3"></main>
        </div>
      </div>
    `;
  },

  /**
   * ChartCard Organism — Telemetry Visualization Container
   */
  ChartCard({
    title = '',
    subtitle = '',
    badgeHtml = '',
    canvasId = '',
    heightClass = 'h-64',
    footerHtml = ''
  } = {}) {
    return `
      <div class="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-4">
            <div>
              <h4 class="text-sm font-bold text-[#0F172A]">${title}</h4>
              ${subtitle ? `<p class="text-[11px] text-[#64748B] mt-0.5">${subtitle}</p>` : ''}
            </div>
            ${badgeHtml}
          </div>
          <div class="${heightClass} relative">
            <canvas id="${canvasId}"></canvas>
          </div>
        </div>
        ${footerHtml ? `<div class="mt-3 pt-3 border-t border-[#F1F5F9]">${footerHtml}</div>` : ''}
      </div>
    `;
  },

  /**
   * TableCard Organism — Enterprise Data Table Container
   */
  TableCard({
    title = '',
    subtitle = '',
    actionsHtml = '',
    tableContainerId = ''
  } = {}) {
    return `
      <div class="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden">
        ${(title || actionsHtml) ? `
          <div class="px-6 py-4 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3 bg-[#FAFBFC]">
            <div>
              <h3 class="text-sm font-bold text-[#0F172A]">${title}</h3>
              ${subtitle ? `<p class="text-xs text-[#64748B] mt-0.5">${subtitle}</p>` : ''}
            </div>
            ${actionsHtml ? `<div class="flex items-center gap-2">${actionsHtml}</div>` : ''}
          </div>
        ` : ''}
        <div id="${tableContainerId}" class="p-4"></div>
      </div>
    `;
  }
};
