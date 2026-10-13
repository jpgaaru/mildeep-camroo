// Enterprise Login View matching user design specification
// Backdrop: artwork-mildeep.png with centered crisp white rounded card and camaroo-logoo.png

import { ERP_DATA } from '../data/mockData.js';
import { Toast } from '../components/toast.js';

export const LoginView = {
  render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 relative select-none overflow-x-hidden" style="background: #17183B url('artwork-mildeep.png') no-repeat center center / cover; min-height: 100vh;">
        
        <!-- Subtle dark overlay to guarantee card pop and optimal readability -->
        <div class="absolute inset-0 bg-[#0A0D25]/20 backdrop-blur-[1px] pointer-events-none"></div>

        <!-- Center Login Card -->
        <div class="w-full max-w-[430px] bg-white rounded-[28px] shadow-[0_25px_60px_-15px_rgba(0,10,35,0.45)] p-8 sm:p-11 border border-white/40 relative z-10 transition-all duration-300">
          
          <!-- Camaroo Logo -->
          <div class="flex justify-center items-center mb-5">
            <img 
              src="camaroo-logoo.png" 
              alt="Camaroo ERP" 
              class="h-10 sm:h-11 w-auto max-w-[240px] object-contain"
              onerror="this.onerror=null;this.src='DEVI-FISHERIES-LOGO.png';"
            />
          </div>

          <!-- Sign In Title -->
          <h1 class="text-2xl sm:text-[26px] font-extrabold text-[#0F172A] text-center tracking-tight mb-7">Sign In</h1>

          <!-- Form -->
          <form id="login-form" class="space-y-4 sm:space-y-5">
            <!-- EMAIL OR USERNAME -->
            <div>
              <label for="login-email" class="block text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-2">EMAIL OR USERNAME</label>
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
                  class="w-full pl-10 pr-4 py-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-sm text-[#0F172A] focus:outline-none focus:border-[#3B5AF6] focus:bg-white focus:ring-4 focus:ring-[#3B5AF6]/15 font-medium transition-all"
                />
              </div>
            </div>

            <!-- PASSWORD -->
            <div>
              <label for="login-password" class="block text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-2">PASSWORD</label>
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
                  class="w-full pl-10 pr-11 py-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-sm text-[#0F172A] focus:outline-none focus:border-[#3B5AF6] focus:bg-white focus:ring-4 focus:ring-[#3B5AF6]/15 font-medium transition-all"
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

            <!-- Submit Button -->
            <div class="pt-2">
              <button 
                type="submit" 
                id="submit-login-btn" 
                class="w-full py-3.5 px-4 bg-[#3B5AF6] hover:bg-[#2B47EE] active:scale-[0.99] text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span id="login-btn-text">Sign In →</span>
              </button>
            </div>
          </form>

        </div>

        <!-- Footer Copyright on backdrop -->
        <div class="text-center mt-6 text-xs text-white/70 font-medium tracking-wide relative z-10">
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

    // Form Submit
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
          sessionStorage.setItem('dfl_authenticated', 'true');
          sessionStorage.setItem('trigger_tour_on_login', 'true');
          const existing = document.getElementById('erp-app-shell');
          if (existing) existing.remove();

          Toast.show(`Welcome to Devi Fisheries ERP, ${ERP_DATA.currentUser.name}!`, 'success', 'Signed In');
          window.location.hash = '#/purchase/dashboard/rm-dashboard';
          if (window.App && typeof window.App.route === 'function') {
            window.App.route();
          }
        }, 500);
      });
    }
  }
};
