#!/usr/bin/env python3
"""
Synchronizes the updated Pre Processing module into miledeep-devi-fisheries.html and standalone.html:
1. Navigation Hierarchy:
   - Main Menu: Pre Processing
   - Submenus:
     - Dashboard (Overview)
     - Pre Processing (Deheading, Grading, Rm Received trackid, De-Heading trackid, Grading trackid, Value Addition trackid, Hon Qty Transfer After VA)
     - Production Reports (Track Code Report, VA Floor Balance, VA Transfer Report, Assumed Reports, Consolidation Report, File Upload)
     - Chemical Screens (Chemical Pos, Received Chemicals, Chemicals Consumption, Chemical Received Report, Chemical Opening Balance Report, Chemical Balance Report, Chemical Payments List)
2. Embeds full PreprocessingView with on-screen TabBar into miledeep-devi-fisheries.html
3. Embeds Molecules.StatTile helper if not present in miledeep-devi-fisheries.html
"""

def main():
    with open('standalone.html', 'r', encoding='utf-8') as f:
        standalone = f.read()

    with open('miledeep-devi-fisheries.html', 'r', encoding='utf-8') as f:
        miledeep = f.read()

    # Nav block for Pre Processing
    preprocessing_nav_code = """  {
    id: "preprocessing",
    title: "Pre Processing",
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>`,
    submenus: [
      {
        id: "dashboard",
        title: "Dashboard",
        defaultTab: "overview",
        tabs: [
          { id: "overview", label: "Overview", hash: "#/preprocessing/dashboard/overview" }
        ]
      },
      {
        id: "pre-processing",
        title: "Pre Processing",
        defaultTab: "deheading",
        tabs: [
          { id: "deheading", label: "Deheading", hash: "#/preprocessing/pre-processing/deheading" },
          { id: "grading", label: "Grading", hash: "#/preprocessing/pre-processing/grading" },
          { id: "rm-received", label: "Rm Received trackid", hash: "#/preprocessing/pre-processing/rm-received" },
          { id: "deheading-trackid", label: "De-Heading trackid", hash: "#/preprocessing/pre-processing/deheading-trackid" },
          { id: "grading-trackid", label: "Grading trackid", hash: "#/preprocessing/pre-processing/grading-trackid" },
          { id: "value-addition", label: "Value Addition trackid", hash: "#/preprocessing/pre-processing/value-addition" },
          { id: "hon-qty-transfer", label: "Hon Qty Transfer After VA", hash: "#/preprocessing/pre-processing/hon-qty-transfer" }
        ]
      },
      {
        id: "production-reports",
        title: "Production Reports",
        defaultTab: "track-code-report",
        tabs: [
          { id: "track-code-report", label: "Track Code Report", hash: "#/preprocessing/production-reports/track-code-report" },
          { id: "va-floor-balance", label: "VA Floor Balance", hash: "#/preprocessing/production-reports/va-floor-balance" },
          { id: "va-transfer", label: "VA Transfer Report", hash: "#/preprocessing/production-reports/va-transfer" },
          { id: "assumed-reports", label: "Assumed Reports", hash: "#/preprocessing/production-reports/assumed-reports" },
          { id: "consolidation-daily", label: "Consolidation Report", hash: "#/preprocessing/production-reports/consolidation-daily" },
          { id: "file-upload", label: "File Upload", hash: "#/preprocessing/production-reports/file-upload" }
        ]
      },
      {
        id: "chemical-screens",
        title: "Chemical Screens",
        defaultTab: "chemical-pos",
        tabs: [
          { id: "chemical-pos", label: "Chemical Pos", hash: "#/preprocessing/chemical-screens/chemical-pos" },
          { id: "received-chemicals", label: "Received Chemicals", hash: "#/preprocessing/chemical-screens/received-chemicals" },
          { id: "chemicals-consumption", label: "Chemicals Consumption", hash: "#/preprocessing/chemical-screens/chemicals-consumption" },
          { id: "chemical-received-report", label: "Chemical Received Report", hash: "#/preprocessing/chemical-screens/chemical-received-report" },
          { id: "chemical-opening-balance", label: "Chemical Opening Balance Report", hash: "#/preprocessing/chemical-screens/chemical-opening-balance" },
          { id: "chemical-balance-report", label: "Chemical Balance Report", hash: "#/preprocessing/chemical-screens/chemical-balance-report" },
          { id: "chemical-payments-list", label: "Chemical Payments List", hash: "#/preprocessing/chemical-screens/chemical-payments-list" }
        ]
      }
    ]
  },\n"""

    # 1. Update nav in miledeep-devi-fisheries.html
    m_nav_start = miledeep.find('  {\n    id: "preprocessing",')
    m_nav_end = miledeep.find('  {\n    id: "quality",', m_nav_start)
    assert m_nav_start != -1 and m_nav_end != -1, "Preprocessing nav block not found in miledeep-devi-fisheries.html"

    miledeep = miledeep[:m_nav_start] + preprocessing_nav_code + miledeep[m_nav_end:]
    print("Nav preprocessing block replaced in miledeep-devi-fisheries.html")

    # 2. Extract full PreprocessingView from standalone.html
    start_p = standalone.find('const PreprocessingView = {')
    end_p = standalone.find('\nconst QCView = {', start_p)
    full_view_code = standalone[start_p:end_p]

    # Ensure full_view_code has TabBar rendering and case 'overview'
    if 'preprocessing-tab-bar-container' not in full_view_code:
        full_view_code = full_view_code.replace(
            "container.innerHTML = `<div id=\"preproc-subpage-content\" class=\"w-full\"></div>`;",
            "container.innerHTML = `\n      <div id=\"preprocessing-tab-bar-container\"></div>\n      <div id=\"preproc-subpage-content\" class=\"w-full\"></div>\n    `;\n    if (typeof TabBar !== 'undefined' && typeof TabBar.render === 'function') {\n      TabBar.render('preprocessing-tab-bar-container', activeHash);\n    }"
        )
    if "case 'overview':" not in full_view_code:
        full_view_code = full_view_code.replace(
            "switch (subPage) {\n      // 1. Dashboard\n      case 'floor-overview':",
            "switch (subPage) {\n      // 1. Dashboard\n      case 'overview':\n      case 'floor-overview':"
        )

    # 3. Molecules definition for miledeep-devi-fisheries.html
    molecules_code = """
const Molecules = {
  StatTile({
    label = '',
    value = '',
    unit = '',
    badgeText = '',
    badgeTone = 'teal',
    icon = 'activity',
    footerLabel = '',
    footerValue = '',
    footerValueColor = 'text-[#0F172A]',
    valueColor = 'text-[#0F172A]'
  } = {}) {
    const toneStyles = {
      teal: {
        iconBox: 'bg-[#F0FAFC] border-[#B2ECF3] text-[#006C7A]',
        pill: 'text-[#056A38] bg-[#EAFAF1] border-[#A8E7C3]'
      },
      emerald: {
        iconBox: 'bg-[#EAFAF1] border-[#A8E7C3] text-[#056A38]',
        pill: 'text-[#056A38] bg-[#EAFAF1] border-[#A8E7C3]'
      },
      ruby: {
        iconBox: 'bg-[#FEEFF1] border-[#F9B0BE] text-[#B5152B]',
        pill: 'text-[#B5152B] bg-[#FEEFF1] border-[#F9B0BE]'
      },
      amber: {
        iconBox: 'bg-[#FFF9E6] border-[#F7DA94] text-[#824D00]',
        pill: 'text-[#824D00] bg-[#FFF9E6] border-[#F7DA94]'
      },
      sky: {
        iconBox: 'bg-[#E0F2FE] border-[#7DD3FC] text-[#0369A1]',
        pill: 'text-[#0369A1] bg-[#E0F2FE] border-[#7DD3FC]'
      }
    }[badgeTone] || {
      iconBox: 'bg-[#F0FAFC] border-[#B2ECF3] text-[#006C7A]',
      pill: 'text-[#006C7A] bg-[#F0FAFC] border-[#B2ECF3]'
    };

    const iconHtml = icon.trim().startsWith('<')
      ? icon
      : `<i data-lucide="${icon}" class="w-4 h-4"></i>`;

    return `
      <div class="mcard bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs hover:shadow-md transition-all">
        <div class="flex items-center justify-between gap-2.5">
          <span class="w-8 h-8 rounded-lg border flex items-center justify-center ${toneStyles.iconBox}">
            ${iconHtml}
          </span>
          ${badgeText ? `<span class="inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-full text-[10.5px] border ${toneStyles.pill}">${badgeText}</span>` : ''}
        </div>
        <div class="mt-3">
          <div class="text-2xl font-extrabold ${valueColor} tracking-tight tabular-nums">
            ${value} ${unit ? `<span class="text-xs font-medium text-[#64748B]">${unit}</span>` : ''}
          </div>
          <div class="text-xs font-semibold text-[#64748B] uppercase tracking-wider mt-0.5">${label}</div>
        </div>
        ${(footerLabel || footerValue) ? `
          <div class="mt-3 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-[11px] text-[#64748B]">
            <span>${footerLabel}</span>
            <b class="${footerValueColor} font-semibold">${footerValue}</b>
          </div>
        ` : ''}
      </div>
    `;
  }
};
"""

    if 'const Molecules =' not in miledeep:
        # Insert before Toast or PreprocessingView
        insert_mol = miledeep.find('const Toast = {')
        assert insert_mol != -1, "Toast definition not found for Molecules insertion"
        miledeep = miledeep[:insert_mol] + molecules_code + "\n\n" + miledeep[insert_mol:]
        print("Molecules helper inserted into miledeep-devi-fisheries.html")

    # 4. Replace placeholder PreprocessingView in miledeep-devi-fisheries.html
    m_view_start = miledeep.find('const PreprocessingView = {')
    m_view_end = miledeep.find('\nconst QCView = {', m_view_start)
    assert m_view_start != -1 and m_view_end != -1, "PreprocessingView placeholder not found in miledeep-devi-fisheries.html"

    miledeep = miledeep[:m_view_start] + full_view_code + miledeep[m_view_end:]
    print("Full PreprocessingView replaced in miledeep-devi-fisheries.html")

    with open('miledeep-devi-fisheries.html', 'w', encoding='utf-8') as f:
        f.write(miledeep)
    print("Saved miledeep-devi-fisheries.html successfully")

if __name__ == '__main__':
    main()
