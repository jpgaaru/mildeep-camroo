/**
 * AquaOps Design System — Code Viewer & React Copy Controller
 * Coordinates live interactive preview tabs, syntax code rendering, and 1-click clipboard copy
 */

import { AquaToast } from './aqua-toast.js';

export class CodeViewer {
  static init() {
    // 1. Tab Switcher (Preview vs React TSX)
    document.querySelectorAll('.ds-tab-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const box = btn.closest('.ds-comp-box');
        if (!box) return;

        const targetTab = btn.dataset.tab; // 'preview' or 'react'
        const tabs = box.querySelectorAll('.ds-tab-btn');
        tabs.forEach(t => t.classList.remove('active'));
        btn.classList.add('active');

        if (targetTab === 'react') {
          box.classList.add('show-code');
          box.classList.add('code-only');
        } else {
          box.classList.remove('show-code');
          box.classList.remove('code-only');
        }
      });
    });

    // 2. One-Click Copy React Code Button
    document.querySelectorAll('.ds-copy-btn').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const box = btn.closest('.ds-comp-box');
        if (!box) return;

        const codeEl = box.querySelector('.ds-code-pre code') || box.querySelector('.ds-code-pre');
        if (!codeEl) return;

        const compName = box.dataset.compName || 'Component';
        const rawCode = codeEl.innerText || codeEl.textContent;

        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(rawCode);
          } else {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = rawCode;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            textarea.remove();
          }

          // Visual Button Feedback
          const origHtml = btn.innerHTML;
          btn.classList.add('copied');
          btn.innerHTML = `
            <svg class="w-3.5 h-3.5 text-[#16A34A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
            </svg>
            <span>Copied!</span>
          `;

          AquaToast.show(`Copied ${compName} React (TSX) code!`, 'teal');

          setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = origHtml;
            if (window.lucide) window.lucide.createIcons();
          }, 2400);

        } catch (err) {
          console.error('Failed to copy code: ', err);
          AquaToast.show(`Failed to copy to clipboard`, 'ruby');
        }
      });
    });

    // 3. Global Display Mode Switcher (Preview Only | Split View | Code Only)
    document.querySelectorAll('.ds-mode-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const mode = btn.dataset.mode; // 'preview', 'split', 'code'
        document.querySelectorAll('.ds-mode-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const allBoxes = document.querySelectorAll('.ds-comp-box');
        allBoxes.forEach(box => {
          box.classList.remove('split-view', 'code-only', 'show-code');
          const previewTabBtn = box.querySelector('.ds-tab-btn[data-tab="preview"]');
          const reactTabBtn = box.querySelector('.ds-tab-btn[data-tab="react"]');

          if (mode === 'split') {
            box.classList.add('split-view');
            if (previewTabBtn) previewTabBtn.classList.remove('active');
            if (reactTabBtn) reactTabBtn.classList.remove('active');
          } else if (mode === 'code') {
            box.classList.add('code-only');
            if (previewTabBtn) previewTabBtn.classList.remove('active');
            if (reactTabBtn) reactTabBtn.classList.add('active');
          } else {
            // Preview only
            if (previewTabBtn) previewTabBtn.classList.add('active');
            if (reactTabBtn) reactTabBtn.classList.remove('active');
          }
        });

        AquaToast.show(`Switched to ${mode.toUpperCase()} view mode`, 'teal');
      });
    });

    // 4. Component Search Filter
    const searchInput = document.getElementById('dsCompSearch');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = (e.target.value || '').toLowerCase().trim();
        const specGrids = document.querySelectorAll('.spec-grid');

        specGrids.forEach(grid => {
          const text = grid.textContent.toLowerCase();
          const title = grid.querySelector('.spec-title')?.textContent.toLowerCase() || '';
          if (!query || text.includes(query) || title.includes(query)) {
            grid.style.display = '';
          } else {
            grid.style.display = 'none';
          }
        });
      });
    }
  }
}
