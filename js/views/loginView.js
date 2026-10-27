// Enterprise Login View matching user design specification
// Backdrop: artwork-mildeep.png with centered crisp white rounded card and camaroo-logoo.png

import { ERP_DATA } from '../data/mockData.js';
import { Toast } from '../components/toast.js';
import { Environment, ENV_SITEMAP_01, ENV_SITEMAP_02 } from '../framework/Environment.js';

export const LoginView = {
  render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 relative select-none overflow-x-hidden" style="background: #17183B url('artwork-mildeep.png') no-repeat center center / cover; min-height: 100vh;">
        
        <!-- Subtle dark overlay to guarantee card pop and optimal readability -->
        <div class="absolute inset-0 bg-[#0A0D25]/20 backdrop-blur-[1px] pointer-events-none"></div>

        <!-- Center Login Card -->
        <div class="w-full max-w-[440px] bg-white rounded-[28px] shadow-[0_25px_60px_-15px_rgba(0,10,35,0.45)] p-7 sm:p-10 border border-white/40 relative z-10 transition-all duration-300">
          
          <!-- Camaroo Logo -->
          <div class="flex justify-center items-center mb-4">
            <img 
              src="camaroo-logoo.png" 
              alt="Camaroo ERP" 
              class="h-10 sm:h-11 w-auto max-w-[240px] object-contain"
              onerror="this.onerror=null;this.src='DEVI-FISHERIES-LOGO.png';"
            />
          </div>

          <!-- Sign In Title -->
          <h1 class="text-2xl sm:text-[25px] font-extrabold text-[#0F172A] text-center tracking-tight mb-6">Sign In</h1>

          <!-- Form -->
          <form id="login-form" class="space-y-4">
            <!-- EMAIL OR USERNAME -->
            <div>
              <label for="login-email" class="block text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-1.5">EMAIL OR USERNAME</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <input 
                  type="text" 
                  id="login-email" 
                  required 
                  value="manikanta@devifisheries.com" 
                  placeholder="name@example.com"
                  class="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-sm text-[#0F172A] focus:outline-none focus:border-[#3B5AF6] focus:bg-white focus:ring-4 focus:ring-[#3B5AF6]/15 font-medium transition-all"
                />
              </div>
            </div>

            <!-- PASSWORD -->
            <div>
              <label for="login-password" class="block text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-1.5">PASSWORD</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </div>
                <input 
                  type="password" 
                  id="login-password" 
                  required 
                  value="Devi@2026" 
                  placeholder="••••••••"
                  class="w-full pl-10 pr-11 py-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-sm text-[#0F172A] focus:outline-none focus:border-[#3B5AF6] focus:bg-white focus:ring-4 focus:ring-[#3B5AF6]/15 font-medium transition-all"
                />
                <button 
                  type="button" 
                  id="toggle-pwd-btn" 
                  class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#94A3B8] hover:text-[#0F172A] transition-colors cursor-pointer"
                  title="Toggle password visibility"
                >
                  <svg id="eye-open-icon" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  <svg id="eye-closed-icon" class="w-4 h-4 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Submit Button (Direct Login -> Sitemap 01) -->
            <div class="pt-1">
              <button 
                type="submit" 
                id="submit-login-btn" 
                class="w-full py-3 px-4 bg-[#3B5AF6] hover:bg-[#2B47EE] active:scale-[0.99] text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span id="login-btn-text">Sign In →</span>
              </button>
            </div>
          </form>

          <!-- Environment Navigation & Segregation Divider -->
          <div class="relative my-5">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-[#E2E8F0]"></div>
            </div>
            <div class="relative flex justify-center text-xs uppercase">
              <span class="bg-white px-3 text-[#94A3B8] font-bold tracking-wider text-[10px]">Select Environment</span>
            </div>
          </div>

          <!-- Distinct Action Buttons: Miledeep Devi Fisheries & CDS -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <!-- Miledeep Devi Fisheries Button -->
            <button
              type="button"
              id="btn-env-miledeep"
              class="flex flex-col items-center justify-center p-2.5 rounded-xl border border-[#00A4B7]/30 hover:border-[#00A4B7] bg-[#00A4B7]/5 hover:bg-[#00A4B7]/12 transition-all group cursor-pointer text-center"
              title="Launch Miledeep (Devi Fisheries) Standalone ERP"
            >
              <div class="w-7 h-7 rounded-lg bg-[#00A4B7] text-white flex items-center justify-center mb-1 shadow-sm group-hover:scale-105 transition-transform">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
              </div>
              <span class="text-xs font-bold text-[#0F172A] leading-tight">Miledeep</span>
              <span class="text-[9.5px] font-medium text-[#00A4B7] mt-0.5 leading-tight">Devi Fisheries</span>
            </button>

            <!-- CDS Button -->
            <button
              type="button"
              id="btn-env-cds"
              class="flex flex-col items-center justify-center p-2.5 rounded-xl border border-[#8B5CF6]/30 hover:border-[#8B5CF6] bg-[#8B5CF6]/5 hover:bg-[#8B5CF6]/12 transition-all group cursor-pointer text-center"
              title="Camaroo Design System (CDS Interface)"
            >
              <div class="w-7 h-7 rounded-lg bg-[#8B5CF6] text-white flex items-center justify-center mb-1 shadow-sm group-hover:scale-105 transition-transform">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>
              </div>
              <span class="text-xs font-bold text-[#0F172A] leading-tight">CDS</span>
              <span class="text-[9.5px] font-medium text-[#8B5CF6] mt-0.5 leading-tight">Design System</span>
            </button>
          </div>

        </div>

        <!-- Footer Copyright on backdrop -->
        <div class="text-center mt-5 text-xs text-white/75 font-medium tracking-wide relative z-10">
          © 2026 Devi Fisheries Limited · Powered by Camaroo. All rights reserved.
        </div>

      </div>
    `;

    this.bindEvents();
  },

  bindEvents() {
    const form = document.getElementById('login-form');
    const pwdInput = document.getElementById('login-password');
    const togglePwdBtn = document.getElementById('toggle-pwd-btn');
    const submitBtn = document.getElementById('submit-login-btn');
    const btnText = document.getElementById('login-btn-text');

    const btnMiledeep = document.getElementById('btn-env-miledeep');
    const btnCDS = document.getElementById('btn-env-cds');

    // Toggle password visibility
    if (togglePwdBtn && pwdInput) {
      togglePwdBtn.addEventListener('click', () => {
        const isPwd = pwdInput.type === 'password';
        pwdInput.type = isPwd ? 'text' : 'password';
        const eyeOpen = togglePwdBtn.querySelector('#eye-open-icon');
        const eyeClosed = togglePwdBtn.querySelector('#eye-closed-icon');
        if (eyeOpen && eyeClosed) {
          if (isPwd) {
            eyeOpen.classList.add('hidden');
            eyeClosed.classList.remove('hidden');
          } else {
            eyeOpen.classList.remove('hidden');
            eyeClosed.classList.add('hidden');
          }
        }
      });
    }

    const performLogin = (envTarget, toastMessage, title) => {
      if (typeof Environment !== 'undefined' && Environment.setActiveEnv) {
        Environment.setActiveEnv(envTarget);
      }
      sessionStorage.setItem('dfl_authenticated', 'true');
      const existing = document.getElementById('erp-app-shell');
      if (existing) existing.remove();

      Toast.show(toastMessage, 'success', title);
      window.location.hash = '#/home';
      if (window.App && typeof window.App.route === 'function') {
        window.App.route();
      }
    };

    // Miledeep Devi Fisheries Button Click -> Direct Enterprise Login
    if (btnMiledeep) {
      btnMiledeep.addEventListener('click', () => {
        performLogin(
          ENV_SITEMAP_01,
          `Welcome to Miledeep Devi Fisheries ERP, ${ERP_DATA.currentUser.name}!`,
          'Devi Fisheries ERP'
        );
      });
    }

    // CDS Button Click -> Design System Interface
    if (btnCDS) {
      btnCDS.addEventListener('click', () => {
        Toast.show('Opening Camaroo Design System...', 'info', 'CDS');
        window.location.href = 'designsystem.html';
      });
    }

    // Form Submit (Direct Login -> Defaults to Devi Fisheries Enterprise)
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (btnText) {
          btnText.innerHTML = `
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Signing In...
          `;
        }
        submitBtn.classList.add('opacity-85', 'cursor-wait');

        setTimeout(() => {
          performLogin(
            ENV_SITEMAP_01,
            `Welcome to Devi Fisheries ERP, ${ERP_DATA.currentUser.name}!`,
            'Signed In'
          );
        }, 400);
      });
    }
  }
};
