import re

html_path = "designsystem.html"

with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update Global View Bar to make Split View active by default
old_viewbar_pattern = re.compile(
    r'<div class="ds-mode-switcher">[\s\S]*?</div>',
    re.MULTILINE
)

new_mode_switcher = """<div class="ds-mode-switcher">
        <button type="button" class="ds-mode-btn active" data-mode="split">
          <i data-lucide="columns-2" style="width:13px;height:13px"></i>
          <span>Preview &amp; Code</span>
        </button>
        <button type="button" class="ds-mode-btn" data-mode="preview">
          <i data-lucide="eye" style="width:13px;height:13px"></i>
          <span>Preview Only</span>
        </button>
        <button type="button" class="ds-mode-btn" data-mode="code">
          <i data-lucide="terminal" style="width:13px;height:13px"></i>
          <span>Code Only</span>
        </button>
      </div>"""

content = old_viewbar_pattern.sub(new_mode_switcher, content, count=1)

# 2. Update each ds-comp-box: add 'split-view' class
content = content.replace('<div class="ds-comp-box"', '<div class="ds-comp-box split-view"')
# Clean up any accidental double split-view
content = content.replace('split-view split-view', 'split-view')

# 3. Update tabs inside each ds-comp-header
old_tabs_pattern = re.compile(
    r'<div class="ds-comp-tabs">[\s\S]*?</div>',
    re.MULTILINE
)

new_tabs = """<div class="ds-comp-tabs">
              <button type="button" class="ds-tab-btn active" data-tab="split">
                <i data-lucide="columns-2" style="width:13px;height:13px"></i>
                <span>Preview &amp; Code</span>
              </button>
              <button type="button" class="ds-tab-btn" data-tab="preview">
                <i data-lucide="eye" style="width:13px;height:13px"></i>
                <span>Preview Only</span>
              </button>
              <button type="button" class="ds-tab-btn" data-tab="react">
                <i data-lucide="terminal" style="width:13px;height:13px"></i>
                <span>Code Only</span>
              </button>
            </div>"""

content = old_tabs_pattern.sub(new_tabs, content)

# 4. Insert ds-code-bar above ds-code-pre if not present
def insert_code_bar(match):
    pre_tag = match.group(0)
    return f"""<div class="ds-code-bar">
            <span class="ds-code-badge"><i data-lucide="terminal" style="width:13px;height:13px"></i> React (TSX) Component Code</span>
            <span style="font-size:10px;color:#64748B">TypeScript · Tailwind CSS · Production Ready</span>
          </div>\n          {pre_tag}"""

if '<div class="ds-code-bar">' not in content:
    content = re.sub(r'<pre class="ds-code-pre">', insert_code_bar, content)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated designsystem.html to default Split View (Preview + Code both visible)!")
