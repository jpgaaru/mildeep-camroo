// Enterprise Login & Persona Switcher View

import { ERP_DATA } from '../data/mockData.js';
import { Toast } from '../components/toast.js';
import { LOGO_COLOR, LOGO_MILEDEEP, LOGO_CAMAROO, LOGIN_ILLUSTRATION } from '../data/logos.js';

export const LoginView = {
  render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="min-h-screen w-full h-screen flex flex-col lg:flex-row bg-white overflow-hidden">
        
        <!-- Left Section: Image in separate section (70% width, Full height) -->
        <div class="w-full lg:w-[70%] h-72 sm:h-96 lg:h-full min-h-[300px] lg:min-h-screen bg-[#F3F7FA] flex items-center justify-start p-0 overflow-hidden border-b lg:border-b-0 lg:border-r border-[#DFE1E6] select-none">
          <img src="${LOGIN_ILLUSTRATION}" alt="Seafood Logistics & Vessel Export" class="w-full h-full object-cover object-left" />
        </div>

        <!-- Right Section: Login Page in separate section (30% width, Full height) -->
        <div class="w-full lg:w-[30%] flex-1 lg:h-full bg-white flex flex-col items-center justify-center p-6 sm:p-8 lg:p-8 xl:p-10 overflow-y-auto">
          <div class="w-full max-w-[380px] flex flex-col justify-between my-auto">
            
            <!-- Top Brand Header -->
            <div>
              <div class="flex flex-col items-center text-center mb-6">
                <img src="${LOGO_CAMAROO}" alt="Camaroo ERP" class="h-12 w-auto max-w-[220px] object-contain mb-1" />
              </div>

              <!-- Sign In Heading -->
              <div class="mb-6 text-center">
                <h2 class="text-xl font-bold text-[#172B4D]">Sign In</h2>
                <p class="text-xs text-[#5E6C84] mt-1">Enter your credentials to access the plant control center</p>
              </div>

              <!-- Sign In Form -->
              <form id="login-form" class="space-y-4">
                <div>
                  <label class="block text-xs font-semibold text-[#172B4D] mb-1.5">Email</label>
                  <input 
                    type="text" 
                    id="login-email" 
                    required 
                    value="admin@devifisheries.com" 
                    class="w-full text-xs px-3.5 py-2.5 bg-[#FAFBFC] border border-[#DFE1E6] rounded-xl focus:bg-white focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] transition-all"
                  />
                </div>

                <div>
                  <label class="block text-xs font-semibold text-[#172B4D] mb-1.5">Password</label>
                  <div class="relative">
                    <input 
                      type="password" 
                      id="login-password" 
                      required 
                      value="Admin@devi2024" 
                      class="w-full text-xs px-3.5 py-2.5 pr-10 bg-[#FAFBFC] border border-[#DFE1E6] rounded-xl focus:bg-white focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] transition-all"
                    />
                    <button type="button" id="toggle-pwd-btn" class="absolute right-3 top-2.5 text-[#6B778C] hover:text-[#172B4D] transition-colors cursor-pointer" title="Toggle password visibility">
                      <svg id="eye-open-icon" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                      <svg id="eye-closed-icon" class="w-4 h-4 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"/></svg>
                    </button>
                  </div>
                </div>

                <!-- Remember Me & Forgot Password -->
                <div class="flex items-center justify-between text-xs pt-0.5">
                  <label class="flex items-center gap-2 cursor-pointer select-none text-[#172B4D]">
                    <input 
                      type="checkbox" 
                      id="login-remember-me" 
                      checked 
                      class="rounded border-[#DFE1E6] text-[#0284C7] focus:ring-0 cursor-pointer"
                    />
                    <span class="font-medium text-[#42526E]">Remember me</span>
                  </label>
                  <button type="button" id="forgot-password-btn" class="text-xs text-[#0284C7] hover:underline font-medium">Forgot password?</button>
                </div>

                <div class="pt-2">
                  <button 
                    type="submit" 
                    id="submit-login-btn" 
                    class="w-full btn-primary py-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span id="login-btn-text">Sign In</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>

      </div>
    `;

    this.bindEvents();
  },

  bindEvents() {
    const form = document.getElementById('login-form');
    const pwdInput = document.getElementById('login-password');
    const togglePwdBtn = document.getElementById('toggle-pwd-btn');
    const emailInput = document.getElementById('login-email');
    const submitBtn = document.getElementById('submit-login-btn');
    const btnText = document.getElementById('login-btn-text');

    // Toggle password visibility and switch eye icon
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

    // Forgot password
    const forgotBtn = document.getElementById('forgot-password-btn');
    if (forgotBtn) {
      forgotBtn.addEventListener('click', () => {
        Toast.show('A secure password reset link has been dispatched to your corporate email.', 'info', 'Password Reset Requested');
      });
    }

    // Form Submit (Defaults to Option 1: Classic Sidebar Navigation)
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        btnText.innerText = 'Authenticating Enterprise SSO...';
        submitBtn.classList.add('opacity-75', 'cursor-wait');

        setTimeout(() => {
          localStorage.setItem('erp_layout_mode', 'option1');
          sessionStorage.setItem('trigger_tour_on_login', 'true');
          const existing = document.getElementById('erp-app-shell');
          if (existing) existing.remove();
          Toast.show(`Welcome back, ${ERP_DATA.currentUser.name}`, 'success', 'Authentication Successful');
          window.location.hash = '#/purchase/dashboard/rm-dashboard';
        }, 400);
      });
    }
  }
};
