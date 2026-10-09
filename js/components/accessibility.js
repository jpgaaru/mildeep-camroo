// Enterprise Accessibility & Display Settings Manager (WCAG 2.1 AA/AAA Compliant)
import { Modal } from './modal.js';
import { Toast } from './toast.js';

const STORAGE_KEY = 'dfl_accessibility_settings';

const DEFAULT_SETTINGS = {
  highContrast: false,
  fontSize: 'normal', // 'normal' (standard 16px), 'large' (+2px: 18px), 'xlarge' (+4px: 20px)
  enhancedFocus: false,
  reducedMotion: false,
  readingSpacing: false,
  underlineLinks: false
};

export const Accessibility = {
  settings: { ...DEFAULT_SETTINGS },

  init() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        this.settings = { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch (_) {
      this.settings = { ...DEFAULT_SETTINGS };
    }
    this.applyClasses();
  },

  applyClasses() {
    const root = document.documentElement;

    // Font Size
    root.classList.remove('a11y-font-normal', 'a11y-font-large', 'a11y-font-xlarge');
    root.classList.add(`a11y-font-${this.settings.fontSize || 'normal'}`);

    // Toggles
    root.classList.toggle('a11y-high-contrast', !!this.settings.highContrast);
    root.classList.toggle('a11y-enhanced-focus', !!this.settings.enhancedFocus);
    root.classList.toggle('a11y-reduced-motion', !!this.settings.reducedMotion);
    root.classList.toggle('a11y-reading-spacing', !!this.settings.readingSpacing);
    root.classList.toggle('a11y-underline-links', !!this.settings.underlineLinks);
  },

  saveSettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings));
    } catch (_) {}
    this.applyClasses();
  },

  resetDefaults() {
    this.saveSettings(DEFAULT_SETTINGS);
    Toast.show('Accessibility settings reset to default', 'info');
  },

  openModal() {
    const s = this.settings;

    Modal.open({
      title: 'Accessibility & Display Settings (WCAG 2.1)',
      size: 'lg',
      content: `
        <div class="space-y-5 text-xs text-[#334155]">


          <!-- 1. Text & Font Size Scale -->
          <div class="p-4 border border-[#E2E8F0] rounded-xl bg-[#FAFBFC]">
            <div class="flex items-center justify-between mb-3">
              <div>
                <div class="font-bold text-sm text-[#0F172A] flex items-center gap-1.5">
                  <svg class="w-4 h-4 text-[#0284C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16"/></svg>
                  Text & Typography Scale
                </div>
                <div class="text-[11px] text-[#64748B] mt-0.5">Controls root REM scaling across all views, tables, and inputs.</div>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-2.5">
              <label class="flex flex-col items-center justify-center p-3 border rounded-xl cursor-pointer transition-all ${s.fontSize === 'normal' ? 'bg-[#F0F9FF] border-[#0284C7] font-bold text-[#0284C7]' : 'bg-white border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#334155]'}">
                <input type="radio" name="a11y-font-size" value="normal" ${s.fontSize === 'normal' ? 'checked' : ''} class="sr-only">
                <span class="text-xs">Standard (16px)</span>
                <span class="text-[10px] text-[#64748B] font-normal mt-0.5">Compact Layout</span>
              </label>

              <label class="flex flex-col items-center justify-center p-3 border rounded-xl cursor-pointer transition-all ${s.fontSize === 'large' ? 'bg-[#F0F9FF] border-[#0284C7] font-bold text-[#0284C7]' : 'bg-white border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#334155]'}">
                <input type="radio" name="a11y-font-size" value="large" ${s.fontSize === 'large' ? 'checked' : ''} class="sr-only">
                <span class="text-sm font-semibold">Large (18px)</span>
                <span class="text-[10px] text-[#64748B] font-normal mt-0.5">Recommended</span>
              </label>

              <label class="flex flex-col items-center justify-center p-3 border rounded-xl cursor-pointer transition-all ${s.fontSize === 'xlarge' ? 'bg-[#F0F9FF] border-[#0284C7] font-bold text-[#0284C7]' : 'bg-white border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#334155]'}">
                <input type="radio" name="a11y-font-size" value="xlarge" ${s.fontSize === 'xlarge' ? 'checked' : ''} class="sr-only">
                <span class="text-base font-bold">Extra Large (20px)</span>
                <span class="text-[10px] text-[#64748B] font-normal mt-0.5">Maximum Legibility</span>
              </label>
            </div>
          </div>

          <!-- 2. Visual & Contrast Preferences -->
          <div class="border border-[#E2E8F0] rounded-xl divide-y divide-[#F1F5F9] bg-white overflow-hidden">
            <!-- High Contrast -->
            <label class="flex items-center justify-between p-3.5 hover:bg-[#F8FAFC] cursor-pointer">
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-lg bg-[#0F172A] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="2"/><path d="M12 2a10 10 0 0110 10 10 10 0 01-10 10V2z" fill="currentColor"/></svg>
                </div>
                <div>
                  <div class="font-bold text-[#0F172A]">High Contrast Mode (WCAG AAA)</div>
                  <div class="text-[11px] text-[#64748B]">Enhances element separation with pure black backgrounds and high-contrast borders.</div>
                </div>
              </div>
              <input type="checkbox" id="a11y-opt-contrast" ${s.highContrast ? 'checked' : ''} class="w-4 h-4 rounded text-[#0284C7] focus:ring-[#0284C7] cursor-pointer">
            </label>

            <!-- Enhanced Focus -->
            <label class="flex items-center justify-between p-3.5 hover:bg-[#F8FAFC] cursor-pointer">
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-lg bg-[#F0F9FF] text-[#0284C7] flex items-center justify-center shrink-0 mt-0.5">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"/></svg>
                </div>
                <div>
                  <div class="font-bold text-[#0F172A]">High-Visibility Keyboard Focus</div>
                  <div class="text-[11px] text-[#64748B]">Displays prominent 3px focus rings around currently active buttons, tabs, and fields.</div>
                </div>
              </div>
              <input type="checkbox" id="a11y-opt-focus" ${s.enhancedFocus ? 'checked' : ''} class="w-4 h-4 rounded text-[#0284C7] focus:ring-[#0284C7] cursor-pointer">
            </label>

            <!-- Reduce Motion -->
            <label class="flex items-center justify-between p-3.5 hover:bg-[#F8FAFC] cursor-pointer">
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-lg bg-[#FEF3C7] text-[#B45309] flex items-center justify-center shrink-0 mt-0.5">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <div>
                  <div class="font-bold text-[#0F172A]">Reduce Animations & Motion</div>
                  <div class="text-[11px] text-[#64748B]">Suppresses page transitions, drawer slides, and hover animations for vestibular safety.</div>
                </div>
              </div>
              <input type="checkbox" id="a11y-opt-motion" ${s.reducedMotion ? 'checked' : ''} class="w-4 h-4 rounded text-[#0284C7] focus:ring-[#0284C7] cursor-pointer">
            </label>

            <!-- Reading Spacing -->
            <label class="flex items-center justify-between p-3.5 hover:bg-[#F8FAFC] cursor-pointer">
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-lg bg-[#F5F3FF] text-[#6D28D9] flex items-center justify-center shrink-0 mt-0.5">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                </div>
                <div>
                  <div class="font-bold text-[#0F172A]">Enhanced Reading Spacing (Dyslexia Friendly)</div>
                  <div class="text-[11px] text-[#64748B]">Broadens letter tracking and row spacing for rapid, effortless table reading.</div>
                </div>
              </div>
              <input type="checkbox" id="a11y-opt-spacing" ${s.readingSpacing ? 'checked' : ''} class="w-4 h-4 rounded text-[#0284C7] focus:ring-[#0284C7] cursor-pointer">
            </label>

            <!-- Underline Links -->
            <label class="flex items-center justify-between p-3.5 hover:bg-[#F8FAFC] cursor-pointer">
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-lg bg-[#F0FDF4] text-[#15803D] flex items-center justify-center shrink-0 mt-0.5">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
                </div>
                <div>
                  <div class="font-bold text-[#0F172A]">Underline Interactive Links</div>
                  <div class="text-[11px] text-[#64748B]">Explicitly underlines navigation tabs, table action links, and buttons.</div>
                </div>
              </div>
              <input type="checkbox" id="a11y-opt-underline" ${s.underlineLinks ? 'checked' : ''} class="w-4 h-4 rounded text-[#0284C7] focus:ring-[#0284C7] cursor-pointer">
            </label>
          </div>
        </div>
      `,
      footerButtons: [
        {
          label: 'Reset to Defaults',
          type: 'secondary',
          onClick: (m) => {
            this.resetDefaults();
            m.close();
          }
        },
        {
          label: 'Apply Settings',
          type: 'primary',
          onClick: (m) => {
            const fontSizeEl = document.querySelector('input[name="a11y-font-size"]:checked');
            const newSettings = {
              fontSize: fontSizeEl ? fontSizeEl.value : 'large',
              highContrast: document.getElementById('a11y-opt-contrast')?.checked || false,
              enhancedFocus: document.getElementById('a11y-opt-focus')?.checked || false,
              reducedMotion: document.getElementById('a11y-opt-motion')?.checked || false,
              readingSpacing: document.getElementById('a11y-opt-spacing')?.checked || false,
              underlineLinks: document.getElementById('a11y-opt-underline')?.checked || false
            };
            this.saveSettings(newSettings);
            Toast.show('Accessibility settings updated successfully', 'success');
            m.close();
          }
        }
      ]
    });

    // Live preview when changing font size radio
    setTimeout(() => {
      document.querySelectorAll('input[name="a11y-font-size"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
          this.saveSettings({ fontSize: e.target.value });
        });
      });
      document.getElementById('a11y-opt-contrast')?.addEventListener('change', (e) => {
        this.saveSettings({ highContrast: e.target.checked });
      });
      document.getElementById('a11y-opt-focus')?.addEventListener('change', (e) => {
        this.saveSettings({ enhancedFocus: e.target.checked });
      });
      document.getElementById('a11y-opt-motion')?.addEventListener('change', (e) => {
        this.saveSettings({ reducedMotion: e.target.checked });
      });
      document.getElementById('a11y-opt-spacing')?.addEventListener('change', (e) => {
        this.saveSettings({ readingSpacing: e.target.checked });
      });
      document.getElementById('a11y-opt-underline')?.addEventListener('change', (e) => {
        this.saveSettings({ underlineLinks: e.target.checked });
      });
    }, 50);
  }
};
