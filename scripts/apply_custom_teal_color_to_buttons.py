#!/usr/bin/env python3
"""
scripts/apply_custom_teal_color_to_buttons.py

Applies the user's requested color #02a8b5 with white text to all buttons
where teal or teal variants are used:
- Base color: #02a8b5 (bg-[#02a8b5])
- Hover color: #008f9a (hover:bg-[#008f9a])
- Text color: text-white (#FFFFFF)
- Updates css/app.css, index.html, js/views/, scripts/, standalone.html, and miledeep-devi-fisheries.html
"""

import re
import os

def update_button_classes_in_html_or_js(content):
    # Function to update button tag attributes
    def replace_button_tag(match):
        attrs = match.group(1)
        # Check if button uses teal
        if any(c in attrs for c in ['#006C7A', '#006c7a', '#005662', '#008DA6', '#008da6', '#00A4B7', '#00a4b7', '#00A8B5', '#00a8b5']):
            # Replace background colors
            attrs = re.sub(r'bg-\[#(?:006C7A|006c7a|008DA6|008da6|00A4B7|00a4b7|00A8B5|00a8b5)\]', 'bg-[#02a8b5]', attrs)
            # Replace hover background colors
            attrs = re.sub(r'hover:bg-\[#(?:005662|006C7A|006c7a|008DA6|008da6|008f9a|00A8B5)\]', 'hover:bg-[#008f9a]', attrs)
            # Replace borders
            attrs = re.sub(r'border-\[#(?:006C7A|006c7a|008DA6|008da6|00A4B7|00a4b7|00A8B5|00a8b5)\]', 'border-[#02a8b5]', attrs)
            # Replace text colors on button icons/text if teal
            attrs = re.sub(r'text-\[#(?:006C7A|006c7a|008DA6|008da6|00A4B7|00a4b7|00A8B5|00a8b5)\]', 'text-[#02a8b5]', attrs)
            attrs = re.sub(r'hover:text-\[#(?:005662|006C7A|006c7a|008DA6|008da6)\]', 'hover:text-[#008f9a]', attrs)
            # Ensure text-white is present if button has solid bg-[#02a8b5]
            if 'bg-[#02a8b5]' in attrs and 'text-white' not in attrs:
                attrs = re.sub(r'class="([^"]*)"', r'class="\1 text-white"', attrs)
        return f'<button{attrs}>'

    # Match all <button ...> tags
    content = re.sub(r'<button\b([^>]*)>', replace_button_tag, content)
    
    # Also update any SVG icons inside buttons that had text-[#006C7A] or text-[#008DA6]
    content = re.sub(r'<svg class="w-3\.5 h-3\.5 text-\[#(?:006C7A|008DA6)\]"', '<svg class="w-3.5 h-3.5 text-white"', content)
    
    return content

def update_css():
    file_path = 'css/app.css'
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Update .btn-primary in css/app.css
    content = re.sub(
        r'\.btn-primary \{[\s\S]*?\.btn-primary:active \{[\s\S]*?\}',
        """.btn-primary {
  background-color: #02a8b5 !important;
  color: #ffffff !important;
  font-weight: 700 !important;
  border: 1px solid #008f9a !important;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}
.btn-primary:hover {
  background-color: #008f9a !important;
  border-color: #007d87 !important;
  color: #ffffff !important;
}
.btn-primary:active {
  background-color: #007d87 !important;
  color: #ffffff !important;
}""",
        content
    )

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("  ✓ Updated css/app.css")

def update_index_html():
    file_path = 'index.html'
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Update .btn-primary in index.html
    content = re.sub(
        r'/\* Button Primary:[\s\S]*?\.btn-primary:active \{[\s\S]*?\}',
        """/* Button Primary: Custom Teal #02a8b5 with White Text */
    .btn-primary {
      background-color: #02a8b5 !important;
      color: #FFFFFF !important;
      border: 1px solid #008f9a !important;
      border-radius: 8px !important;
      font-weight: 600 !important;
      box-shadow: 0 1px 2px rgba(2, 168, 181, 0.25) !important;
      transition: all 0.15s ease !important;
    }
    .btn-primary:hover {
      background-color: #008f9a !important;
      border-color: #007d87 !important;
      color: #FFFFFF !important;
      box-shadow: 0 2px 6px rgba(2, 168, 181, 0.35) !important;
    }
    .btn-primary:active {
      background-color: #007d87 !important;
      border-color: #006c75 !important;
      transform: scale(0.98);
    }""",
        content
    )

    content = update_button_classes_in_html_or_js(content)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("  ✓ Updated index.html")

def process_file(filepath):
    print(f"Processing {filepath}...")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    updated = update_button_classes_in_html_or_js(content)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(updated)
    print(f"  ✓ Saved {filepath}")

def main():
    print("=================================================================")
    print("APPLYING CUSTOM TEAL #02a8b5 + WHITE TEXT TO ALL BUTTONS")
    print("=================================================================")

    update_css()
    update_index_html()

    target_files = [
        'js/views/salesView.js',
        'js/views/purchaseView.js',
        'js/views/preprocessingView.js',
        'scripts/sales_view_code.py',
        'scripts/preprocessing_view_code.py',
        'standalone.html',
        'miledeep-devi-fisheries.html'
    ]

    for f in target_files:
        if os.path.exists(f):
            process_file(f)

    print("\n✓ All buttons where teal was used have been updated to #02a8b5 with white text!")

if __name__ == '__main__':
    main()
