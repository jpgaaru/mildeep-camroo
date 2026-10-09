// Atomic Design: Templates (Page Skeleton Layouts & Shell Structures)

export const Templates = {
  /**
   * Enterprise ERP Dashboard Layout Shell Template
   */
  appShell({
    sidebarHtml = '',
    headerHtml = '',
    breadcrumbsHtml = '',
    tabBarHtml = '',
    contentHtml = ''
  }) {
    return `
      <div class="flex h-screen w-screen overflow-hidden bg-[#F2F5F9] font-sans antialiased text-[#0F172A]">
        <!-- Sticky Left Floated Sidebar -->
        <div id="sidebar-container" class="shrink-0 p-3 h-full z-30">
          ${sidebarHtml}
        </div>

        <!-- Main Content Viewport -->
        <div class="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
          <!-- Top Global Header -->
          <header id="header-container" class="shrink-0 bg-white border-b border-[#E2E8F0] z-20">
            ${headerHtml}
          </header>

          <!-- Breadcrumbs & Context Header Strip -->
          <div id="breadcrumbs-container" class="shrink-0 px-6 py-2 bg-[#FAFBFC] border-b border-[#E2E8F0]/75">
            ${breadcrumbsHtml}
          </div>

          <!-- Secondary Tab Navigation Bar -->
          <div id="tabbar-container" class="shrink-0 px-6 bg-white border-b border-[#E2E8F0]">
            ${tabBarHtml}
          </div>

          <!-- Scrollable Dynamic Workspace / View -->
          <main id="main-content-scroll" class="flex-1 overflow-y-auto px-6 py-5">
            <div id="view-mount-point" class="max-w-[1720px] mx-auto pb-12">
              ${contentHtml}
            </div>
          </main>
        </div>
      </div>
    `;
  },

  /**
   * Split Auth / Sign-in Template
   */
  authShell({
    illustrationHtml = '',
    formHtml = ''
  }) {
    return `
      <div class="min-h-screen w-screen flex bg-white font-sans antialiased">
        <div class="hidden lg:flex lg:w-1/2 bg-[#F0F9FF] items-center justify-center p-12">
          ${illustrationHtml}
        </div>
        <div class="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
          <div class="w-full max-w-md">
            ${formHtml}
          </div>
        </div>
      </div>
    `;
  }
};
