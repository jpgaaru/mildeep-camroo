// Atlassian Design System - Interactive Skeleton Shimmer Loader Component

export const Skeleton = {
  // Render full Raw Material & Commercial Dashboard Skeleton
  renderDashboard() {
    return `
      <div class="space-y-4 animate-fade-in select-none">
        <!-- Top Title & Filter Bar Skeleton -->
        <div class="bg-white p-4 rounded-xl border border-[#DFE1E6] space-y-3">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div class="space-y-2">
              <div class="skeleton-shimmer h-6 w-56 rounded"></div>
              <div class="skeleton-shimmer h-3.5 w-80 rounded"></div>
            </div>
            <div class="flex items-center gap-2">
              <div class="skeleton-shimmer h-8 w-24 rounded"></div>
              <div class="skeleton-shimmer h-8 w-28 rounded"></div>
            </div>
          </div>
          <div class="pt-2 border-t border-[#EBECF0] flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="skeleton-shimmer h-6 w-16 rounded-full"></div>
              <div class="skeleton-shimmer h-6 w-16 rounded-full"></div>
              <div class="skeleton-shimmer h-6 w-20 rounded-full"></div>
              <div class="skeleton-shimmer h-6 w-24 rounded-full"></div>
            </div>
          </div>
        </div>

        <!-- 4 KPI Metrics Grid Skeleton -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          ${[1, 2, 3, 4].map(() => `
            <div class="bg-white border border-[#DFE1E6] rounded-xl p-4 flex items-center justify-between">
              <div class="space-y-2 flex-1 mr-3">
                <div class="skeleton-shimmer h-3 w-28 rounded"></div>
                <div class="skeleton-shimmer h-7 w-36 rounded"></div>
              </div>
              <div class="skeleton-shimmer w-10 h-10 rounded-lg shrink-0"></div>
            </div>
          `).join('')}
        </div>

        <!-- Middle Charts Grid Skeleton -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div class="bg-white p-4 rounded-xl border border-[#DFE1E6] space-y-3">
            <div class="flex justify-between items-center border-b border-[#EBECF0] pb-3">
              <div class="skeleton-shimmer h-4 w-44 rounded"></div>
              <div class="skeleton-shimmer h-4 w-16 rounded-full"></div>
            </div>
            <div class="skeleton-shimmer h-60 w-full rounded-lg"></div>
          </div>

          <div class="bg-white p-4 rounded-xl border border-[#DFE1E6] space-y-3">
            <div class="flex justify-between items-center border-b border-[#EBECF0] pb-3">
              <div class="skeleton-shimmer h-4 w-44 rounded"></div>
              <div class="skeleton-shimmer h-4 w-16 rounded-full"></div>
            </div>
            <div class="skeleton-shimmer h-60 w-full rounded-lg"></div>
          </div>
        </div>

        <!-- Bottom Spline Curve & Abstract Skeleton -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div class="lg:col-span-2 bg-white p-4 rounded-xl border border-[#DFE1E6] space-y-3">
            <div class="flex justify-between items-center border-b border-[#EBECF0] pb-3">
              <div class="skeleton-shimmer h-4 w-48 rounded"></div>
              <div class="flex gap-1">
                <div class="skeleton-shimmer h-6 w-8 rounded-full"></div>
                <div class="skeleton-shimmer h-6 w-8 rounded-full"></div>
                <div class="skeleton-shimmer h-6 w-8 rounded-full"></div>
              </div>
            </div>
            <div class="skeleton-shimmer h-56 w-full rounded-lg"></div>
          </div>

          <div class="bg-white p-4 rounded-xl border border-[#DFE1E6] space-y-3">
            <div class="skeleton-shimmer h-4 w-36 rounded border-b border-[#EBECF0] pb-2"></div>
            <div class="space-y-2 pt-2">
              <div class="skeleton-shimmer h-12 w-full rounded-md"></div>
              <div class="skeleton-shimmer h-12 w-full rounded-md"></div>
              <div class="skeleton-shimmer h-12 w-full rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // Render Table / CRUD View Skeleton
  renderTable(rows = 7, cols = 6) {
    const colWidths = ['w-24', 'w-36', 'w-28', 'w-32', 'w-20', 'w-16'];
    return `
      <div class="space-y-4 animate-fade-in select-none">
        <!-- Title & Action Bar Skeleton -->
        <div class="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div class="space-y-2">
            <div class="skeleton-shimmer h-6 w-60 rounded"></div>
            <div class="skeleton-shimmer h-3.5 w-96 rounded"></div>
          </div>
          <div class="flex items-center gap-2">
            <div class="skeleton-shimmer h-8 w-32 rounded"></div>
          </div>
        </div>

        <!-- Table Card Skeleton -->
        <div class="bg-white rounded-lg border border-[#DFE1E6] shadow-xs overflow-hidden">
          <!-- Toolbar (Search, Filter, Export) -->
          <div class="p-3 bg-[#FAFBFC] border-b border-[#DFE1E6] flex flex-wrap items-center justify-between gap-3">
            <div class="skeleton-shimmer h-8 w-64 rounded-md"></div>
            <div class="flex items-center gap-2">
              <div class="skeleton-shimmer h-8 w-20 rounded"></div>
              <div class="skeleton-shimmer h-8 w-20 rounded"></div>
            </div>
          </div>

          <!-- Table Header -->
          <div class="px-4 py-3 bg-[#EBECF0]/60 border-b border-[#DFE1E6] flex items-center justify-between gap-4">
            ${Array.from({ length: cols }).map((_, i) => `
              <div class="skeleton-shimmer h-4 ${colWidths[i % colWidths.length]} rounded"></div>
            `).join('')}
          </div>

          <!-- Table Rows -->
          <div class="divide-y divide-[#EBECF0]">
            ${Array.from({ length: rows }).map(() => `
              <div class="px-4 py-3.5 flex items-center justify-between gap-4">
                <div class="skeleton-shimmer h-4 w-24 rounded"></div>
                <div class="skeleton-shimmer h-4 w-40 rounded"></div>
                <div class="skeleton-shimmer h-4 w-28 rounded"></div>
                <div class="skeleton-shimmer h-4 w-32 rounded"></div>
                <div class="skeleton-shimmer h-4 w-16 rounded-full"></div>
                <div class="skeleton-shimmer h-6 w-14 rounded"></div>
              </div>
            `).join('')}
          </div>

          <!-- Pagination Bar -->
          <div class="p-3 bg-[#FAFBFC] border-t border-[#DFE1E6] flex items-center justify-between">
            <div class="skeleton-shimmer h-4 w-32 rounded"></div>
            <div class="flex items-center gap-1.5">
              <div class="skeleton-shimmer h-7 w-7 rounded"></div>
              <div class="skeleton-shimmer h-7 w-7 rounded"></div>
              <div class="skeleton-shimmer h-7 w-7 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // Render Reports Grid Skeleton
  renderReportsGrid() {
    return `
      <div class="space-y-4 animate-fade-in select-none">
        <div class="bg-white p-5 rounded-xl border border-[#DFE1E6] space-y-4">
          <div class="flex items-center justify-between border-b border-[#EBECF0] pb-3">
            <div class="skeleton-shimmer h-5 w-44 rounded"></div>
            <div class="skeleton-shimmer h-4 w-28 rounded-full"></div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
            ${Array.from({ length: 12 }).map(() => `
              <div class="bg-[#FAFBFC] border border-[#DFE1E6] p-3.5 rounded-lg space-y-3">
                <div class="skeleton-shimmer w-8 h-8 rounded-lg"></div>
                <div class="skeleton-shimmer h-4 w-full rounded"></div>
                <div class="skeleton-shimmer h-3 w-3/4 rounded"></div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
};
