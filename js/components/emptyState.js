// Spacious, Prominent & Beautiful Under Construction Component with Collapsible Filter Bar & Large Lottie Animation

export function renderEmptyState({
  moduleName = "Module",
  tabName = "Section"
}) {
  const title = `${tabName}`.toUpperCase();
  const dateStr = new Date().toLocaleDateString('en-GB');

  return `
    <div class="space-y-4 animate-fade-in">

      <!-- Under Construction Card -->
      <div class="bg-white rounded-2xl border border-[#DFE1E6] p-10 sm:p-12 text-center shadow-xs animate-fade-in flex flex-col items-center justify-center max-w-3xl mx-auto my-4 min-h-[420px]">
        <!-- Prominent Lottie Player -->
        <div class="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
          <lottie-player 
            src="https://assets9.lottiefiles.com/packages/lf20_m6cuL6.json" 
            background="transparent" 
            speed="1" 
            style="width: 100%; height: 100%;" 
            loop 
            autoplay
          ></lottie-player>

          <!-- Smooth SVG Construction Illustration Fallback (Works offline instantly) -->
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 opacity-30">
            <svg class="w-48 h-48 text-[#FFAB00] animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
            </svg>
          </div>
        </div>

        <!-- Clean Minimal Status Badge -->
        <div class="inline-flex items-center gap-2 px-3 py-1 bg-[#FFF0B3] text-[#8f4d00] font-bold text-xs rounded-full mt-2 mb-2 uppercase tracking-wider">
          <span class="w-2 h-2 rounded-full bg-[#FFAB00] animate-ping"></span>
          Under Construction
        </div>

        <p class="text-sm text-[#5E6C84] max-w-md leading-relaxed mt-1">
          This module is currently in development and staging.
        </p>
      </div>
    </div>
  `;
}
