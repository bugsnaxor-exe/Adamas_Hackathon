// Tab switching between Sign In & Create Account
function switchAuthTab(tab) {
  const loginTabBtn = document.getElementById('tab-login');
  const registerTabBtn = document.getElementById('tab-register');
  const loginPanel = document.getElementById('panel-login');
  const registerPanel = document.getElementById('panel-register');
  const footerLogin = document.getElementById('footer-login-prompt');
  const footerRegister = document.getElementById('footer-register-prompt');

  hideToast();

  if (tab === 'login') {
    loginTabBtn.classList.add('active');
    loginTabBtn.setAttribute('aria-selected', 'true');
    registerTabBtn.classList.remove('active');
    registerTabBtn.setAttribute('aria-selected', 'false');

    loginPanel.classList.remove('hidden');
    registerPanel.classList.add('hidden');

    footerLogin.classList.remove('hidden');
    footerRegister.classList.add('hidden');
  } else {
    registerTabBtn.classList.add('active');
    registerTabBtn.setAttribute('aria-selected', 'true');
    loginTabBtn.classList.remove('active');
    loginTabBtn.setAttribute('aria-selected', 'false');

    registerPanel.classList.remove('hidden');
    loginPanel.classList.add('hidden');

    footerRegister.classList.remove('hidden');
    footerLogin.classList.add('hidden');
  }
}

// Sub-tab switching between Email Login & Phone Login
function switchLoginMethod(method) {
  const emailBtn = document.getElementById('login-type-email');
  const phoneBtn = document.getElementById('login-type-phone');
  const emailForm = document.getElementById('form-email-login');
  const phoneForm = document.getElementById('form-phone-login');

  hideToast();

  if (method === 'email') {
    emailBtn.classList.add('active');
    phoneBtn.classList.remove('active');
    emailForm.classList.remove('hidden');
    phoneForm.classList.add('hidden');
  } else {
    phoneBtn.classList.add('active');
    emailBtn.classList.remove('active');
    phoneForm.classList.remove('hidden');
    emailForm.classList.add('hidden');
  }
}

// Password visibility toggle
function togglePasswordVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = '🙈';
  } else {
    input.type = 'password';
    btn.textContent = '👁️';
  }
}

// Role Selection Toggle (Rider vs Driver)
function updateRoleSelection(radio) {
  const cards = document.querySelectorAll('.role-card');
  cards.forEach(card => card.classList.remove('active'));
  radio.closest('.role-card').classList.add('active');
}

// Toast notification helper
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast ${type}`;
  toast.classList.remove('hidden');
}

function hideToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('hidden');
}

// Request OTP action for Phone Login
function requestOTP(event) {
  event.preventDefault();
  const phoneInput = document.getElementById('login-phone');
  const code = document.getElementById('login-country-code').value;

  if (!phoneInput.value) {
    showToast('Please enter a valid phone number first.', 'info');
    phoneInput.focus();
    return;
  }

  showToast(`OTP sent to ${code} ${phoneInput.value}. (Mock: 123456)`, 'success');
}

// Forgot Password action
function handleForgotPassword(event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value;
  if (email) {
    showToast(`Password reset link sent to ${email}`, 'success');
  } else {
    showToast('Please enter your email address to reset password.', 'info');
    document.getElementById('login-email').focus();
  }
}

// Login form submit handler
function handleLoginSubmit(event, method) {
  event.preventDefault();
  if (method === 'email') {
    const email = document.getElementById('login-email').value;
    showToast(`Welcome back! Logged in as ${email}`, 'success');
  } else {
    const code = document.getElementById('login-country-code').value;
    const phone = document.getElementById('login-phone').value;
    showToast(`Verified! Logged in with ${code} ${phone}`, 'success');
  }
}

// Registration form submit handler
function handleRegisterSubmit(event) {
  event.preventDefault();
  const pass = document.getElementById('reg-pass').value;
  const confirmPass = document.getElementById('reg-confirm-pass').value;

  if (pass !== confirmPass) {
    showToast('Passwords do not match. Please try again.', 'info');
    return;
  }

  const name = document.getElementById('reg-name').value;
  const role = document.querySelector('input[name="user-role"]:checked').value;
  const roleLabel = role === 'driver' ? 'Driver' : 'Passenger';

  showToast(`Account created for ${name} (${roleLabel})! Redirecting...`, 'success');
}
