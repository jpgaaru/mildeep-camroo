#!/usr/bin/env python3
import re

def update_standalone_home():
    with open('standalone.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update NAV_HIERARCHY in standalone.html (add home before purchase)
    old_nav_marker = """export const NAV_HIERARCHY = [
  {
    id: "purchase\","""
    if old_nav_marker not in content:
        old_nav_marker = """const NAV_HIERARCHY = [
  {
    id: "purchase\","""

    home_nav_item = """const NAV_HIERARCHY = [
  {
    id: "home",
    title: "Home",
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>`,
    submenus: [
      {
        id: "welcome",
        title: "Welcome",
        defaultTab: "command-center",
        tabs: [
          { id: "command-center", label: "Command Center", hash: "#/home/welcome/command-center" },
          { id: "quick-actions", label: "Quick Launchpad", hash: "#/home/welcome/quick-actions" }
        ]
      },
      {
        id: "access-roles",
        title: "My Access & Roles",
        defaultTab: "my-permissions",
        tabs: [
          { id: "my-permissions", label: "My Permissible Access", hash: "#/home/access-roles/my-permissions" },
          { id: "role-matrix", label: "RBAC Role Matrix", hash: "#/home/access-roles/role-matrix" }
        ]
      },
      {
        id: "role-dashboards",
        title: "Role Dashboards",
        defaultTab: "executive",
        tabs: [
          { id: "executive", label: "Executive C-Suite", hash: "#/home/role-dashboards/executive" },
          { id: "plant-manager", label: "Plant Operations Head", hash: "#/home/role-dashboards/plant-manager" },
          { id: "procurement-head", label: "Procurement Lead", hash: "#/home/role-dashboards/procurement-head" },
          { id: "qc-director", label: "QC & Lab Director", hash: "#/home/role-dashboards/qc-director" }
        ]
      },
      {
        id: "admin-controls",
        title: "Admin & Roles",
        defaultTab: "user-allocation",
        tabs: [
          { id: "user-allocation", label: "Allocate Roles", hash: "#/home/admin-controls/user-allocation" },
          { id: "delegation", label: "Shift Delegations", hash: "#/home/admin-controls/delegation" }
        ]
      }
    ]
  },
  {
    id: "purchase\","""

    if old_nav_marker in content:
        content = content.replace(old_nav_marker, home_nav_item)
        print("Updated NAV_HIERARCHY with Home in standalone.html")
    else:
        print("Warning: NAV_HIERARCHY purchase marker not found in standalone.html")

    # 2. Update SECTION_METADATA_REGISTRY in standalone.html
    old_meta_marker = """const SECTION_METADATA_REGISTRY = {
  purchase: {"""
    new_meta_marker = """const SECTION_METADATA_REGISTRY = {
  home: {
    welcome: {
      title: 'Welcome & Command Center',
      subtitle: 'Executive cockpit, active plant status, cross-module shortcuts, and shift telemetry'
    },
    'access-roles': {
      title: 'My Access & Permissible Roles',
      subtitle: 'Active RBAC permissions matrix, session credentials, and module privilege breakdown'
    },
    'role-dashboards': {
      title: 'Role-Based Executive Dashboards',
      subtitle: 'Tailored persona lenses for C-Suite, Plant Operations, Procurement, and Quality Control'
    },
    'admin-controls': {
      title: 'Admin Controls & Role Allocation',
      subtitle: 'Allocate permissible roles, manage department permissions, and configure shift delegations'
    }
  },
  purchase: {"""

    if old_meta_marker in content:
        content = content.replace(old_meta_marker, new_meta_marker)
        print("Updated SECTION_METADATA_REGISTRY with Home in standalone.html")
    else:
        print("Warning: SECTION_METADATA_REGISTRY purchase marker not found in standalone.html")

    # 3. Read homeData.js and homeView.js
    with open('js/data/homeData.js', 'r', encoding='utf-8') as f:
        home_data_src = f.read().replace('export const HOME_DATA =', 'const HOME_DATA =')

    with open('js/views/homeView.js', 'r', encoding='utf-8') as f:
        home_view_src = f.read()

    home_view_clean = re.sub(r'import\s+.*?;\s*\n', '', home_view_src)
    home_view_clean = re.sub(r'export\s+const\s+HomeView\s*=', 'const HomeView =', home_view_clean)

    inlined_home = f"""
// ============================================================================
// HOME & ENTERPRISE COMMAND CENTER (AQUAOPS INTEGRATED)
// ============================================================================

{home_data_src}

{home_view_clean}
"""

    # Insert before PurchaseView
    purchase_view_marker = "const PurchaseView = {"
    if purchase_view_marker in content:
        content = content.replace(purchase_view_marker, inlined_home + "\n" + purchase_view_marker, 1)
        print("Inserted HomeView before PurchaseView in standalone.html")
    else:
        print("Warning: PurchaseView marker not found in standalone.html")

    # 4. In app switch, add case 'home'
    old_switch_marker = """switch (modObj.id) {
      case 'purchase':"""
    new_switch_marker = """switch (modObj.id) {
      case 'home':
        HomeView.render(mainContainer, tabName || 'command-center', resolvedHash);
        break;
      case 'purchase':"""

    if old_switch_marker in content:
        content = content.replace(old_switch_marker, new_switch_marker, 1)
        print("Added case 'home' to route switch in standalone.html")
    else:
        print("Warning: switch modObj.id marker not found in standalone.html")

    # 5. Update default empty route to #/home/welcome/command-center
    content = content.replace(
        "window.location.hash = '#/purchase/dashboard/rm-dashboard';",
        "window.location.hash = '#/home/welcome/command-center';"
    )
    print("Updated default route in standalone.html")

    # 6. Default moduleName in Router.resolve
    content = content.replace(
        "const moduleName = parts[0] || 'purchase';",
        "const moduleName = parts[0] || 'home';"
    )

    with open('standalone.html', 'w', encoding='utf-8') as f:
        f.write(content)

    print("Successfully synchronized Home module into standalone.html!")

if __name__ == '__main__':
    update_standalone_home()
