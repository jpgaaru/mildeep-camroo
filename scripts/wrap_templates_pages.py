import html

html_path = "designsystem.html"

with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Stage 4: Templates
wires_start = content.find('<div class="wires">')
wires_end = content.find('</section>', wires_start)
wires_inner_end = content.rfind('</div>', wires_start, wires_end) + len('</div>')

if wires_start != -1 and 'data-comp-name="Templates Architecture"' not in content[wires_start - 300:wires_start]:
    wires_html = content[wires_start:wires_inner_end]
    templates_react_code = html.escape("""import React from 'react';
import { LayoutDashboard, ShoppingCart, Activity, ShieldCheck } from 'lucide-react';

export const DashboardLayoutTemplate: React.FC<{
  sidebar: React.ReactNode;
  header: React.ReactNode;
  metrics: React.ReactNode;
  children: React.ReactNode;
}> = ({ sidebar, header, metrics, children }) => (
  <div className="flex h-screen bg-[#F8FAFC] text-slate-900 overflow-hidden">
    {/* Floating Left Rail / Dark Sidebar */}
    <div className="p-4 flex shrink-0">
      {sidebar}
    </div>

    {/* Main Scrollable Canvas */}
    <div className="flex-1 flex flex-col min-w-0 overflow-y-auto p-6 space-y-6">
      {header}
      {metrics && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">{metrics}</div>}
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  </div>
);""")

    wrapped_wires = f"""
    <div class="ds-comp-box" data-comp-name="Templates Architecture">
      <div class="ds-comp-header">
        <div class="ds-comp-tabs">
          <button type="button" class="ds-tab-btn active" data-tab="preview">
            <i data-lucide="eye" style="width:13px;height:13px"></i>
            <span>Preview</span>
          </button>
          <button type="button" class="ds-tab-btn" data-tab="react">
            <i data-lucide="code-2" style="width:13px;height:13px"></i>
            <span>React (TSX)</span>
          </button>
        </div>
        <div class="ds-comp-actions">
          <button type="button" class="ds-copy-btn" title="Copy Templates React Code">
            <i data-lucide="copy" style="width:13px;height:13px"></i>
            <span>Copy React</span>
          </button>
        </div>
      </div>

      <div class="ds-comp-preview">
        {wires_html}
      </div>

      <div class="ds-comp-code">
        <pre class="ds-code-pre"><code>{templates_react_code}</code></pre>
      </div>
    </div>"""

    content = content[:wires_start] + wrapped_wires + content[wires_inner_end:]
    print("Wrapped Stage 4: Templates!")

# 2. Stage 5: Pages
shell_start = content.find('<div class="shell">')
shell_end = content.find('</section>', shell_start)
shell_inner_end = content.rfind('</div>', shell_start, shell_end) + len('</div>')

if shell_start != -1 and 'data-comp-name="Operations Page Shell"' not in content[shell_start - 300:shell_start]:
    shell_html = content[shell_start:shell_inner_end]
    pages_react_code = html.escape("""import React, { useState } from 'react';
import { DarkSidebar } from './DarkSidebar';
import { MetricCard } from './MetricCard';
import { SearchBar } from './SearchBar';
import { NavTabs } from './NavTabs';
import { Plus, Download, Bell, Settings } from 'lucide-react';

export const OperationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      <DarkSidebar activeRoute="/dashboard" />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between gap-4">
          <SearchBar placeholder="Search ponds, lots, metrics..." />
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-black">
              <Bell className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span className="text-xs font-bold text-slate-800">Admin</span>
            </div>
          </div>
        </div>

        {/* Action Title Bar */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Active Aquaculture Dashboard</h1>
            <p className="text-xs text-slate-500 mt-1">Optical DO probes, automated aerator schedule, and biomass growth curves.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 rounded-full bg-white border border-slate-200 text-xs font-bold text-[#006C7A] hover:bg-slate-50 flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5" /> Export CSV
            </button>
            <button className="px-4 py-2 rounded-full bg-[#006C7A] hover:bg-[#005662] text-xs font-bold text-white shadow-sm flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" /> Log Sample
            </button>
          </div>
        </div>

        {/* Tabs & Content */}
        <NavTabs
          tabs={[
            { id: 'overview', label: 'Overview' },
            { id: 'matrix', label: 'Pond Matrix', count: 8 },
            { id: 'chemistry', label: 'Water Chemistry' },
            { id: 'aerator', label: 'Aerator Log' },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </div>
    </div>
  );
};""")

    wrapped_shell = f"""
    <div class="ds-comp-box" data-comp-name="Operations Page Shell">
      <div class="ds-comp-header">
        <div class="ds-comp-tabs">
          <button type="button" class="ds-tab-btn active" data-tab="preview">
            <i data-lucide="eye" style="width:13px;height:13px"></i>
            <span>Preview</span>
          </button>
          <button type="button" class="ds-tab-btn" data-tab="react">
            <i data-lucide="code-2" style="width:13px;height:13px"></i>
            <span>React (TSX)</span>
          </button>
        </div>
        <div class="ds-comp-actions">
          <button type="button" class="ds-copy-btn" title="Copy Operations Page React Code">
            <i data-lucide="copy" style="width:13px;height:13px"></i>
            <span>Copy React</span>
          </button>
        </div>
      </div>

      <div class="ds-comp-preview">
        {shell_html}
      </div>

      <div class="ds-comp-code">
        <pre class="ds-code-pre"><code>{pages_react_code}</code></pre>
      </div>
    </div>"""

    content = content[:shell_start] + wrapped_shell + content[shell_inner_end:]
    print("Wrapped Stage 5: Pages!")

with open(html_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Done wrapping templates and pages!")
