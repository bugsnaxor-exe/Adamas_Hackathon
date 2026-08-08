import React, { useState } from 'react';

export default function App() {
  // Navigation & Form Tabs State
  const [authTab, setAuthTab] = useState('login'); // 'login' | 'register'
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' | 'phone'

  // Eye Button Password Visibility Toggles
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);

  // Toast Notification State
  const [toast, setToast] = useState({ message: '', type: 'info', visible: false });

  // Form Fields State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const [countryCode, setCountryCode] = useState('+91');
  const [loginPhone, setLoginPhone] = useState('');
  const [loginOtp, setLoginOtp] = useState('');

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regRole, setRegRole] = useState('rider'); // 'rider' | 'driver'
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Helper: Trigger Toast Notification
  const showToastMessage = (message, type = 'info') => {
    setToast({ message, type, visible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, visible: false }));
  };

  // Endpoint Handler: Request Phone OTP
  const handleRequestOTP = (e) => {
    e.preventDefault();
    if (!loginPhone) {
      showToastMessage('Please enter a valid phone number first.', 'info');
      return;
    }
    showToastMessage(`OTP sent to ${countryCode} ${loginPhone}. (Mock OTP: 123456)`, 'success');
  };

  // Endpoint Handler: Forgot Password Link
  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (loginEmail) {
      showToastMessage(`Password reset link sent to ${loginEmail}`, 'success');
    } else {
      showToastMessage('Please enter your email address to reset password.', 'info');
    }
  };

  // Endpoint Handler: Email Sign In
  const handleEmailLoginSubmit = (e) => {
    e.preventDefault();
    showToastMessage(`Welcome back! Logged in as ${loginEmail}`, 'success');
  };

  // Endpoint Handler: Phone Sign In
  const handlePhoneLoginSubmit = (e) => {
    e.preventDefault();
    showToastMessage(`Verified! Logged in with ${countryCode} ${loginPhone}`, 'success');
  };

  // Endpoint Handler: Create Account Registration
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (regPassword !== regConfirmPassword) {
      showToastMessage('Passwords do not match. Please verify both password fields.', 'info');
      return;
    }

    const roleTitle = regRole === 'driver' ? 'Driver' : 'Passenger';
    showToastMessage(`Account created for ${regName} (${roleTitle})! Redirecting...`, 'success');
  };

  return (
    <div className="container">
      {/* Background Animated Gradient Globes */}
      <div className="background-globes">
        <div className="globe globe-1"></div>
        <div className="globe globe-2"></div>
      </div>

      {/* Brand Header */}
      <header className="brand-header">
        <div className="logo">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
            <circle cx="7" cy="17" r="2"/>
            <path d="M9 17h6"/>
            <circle cx="17" cy="17" r="2"/>
          </svg>
          <span>Commute<strong>Pool</strong></span>
        </div>
        <p className="tagline">Share your ride, save costs & reduce carbon footprint.</p>
      </header>

      {/* Auth Card Container */}
      <main className="auth-card">
        {/* Main Auth Tabs */}
        <nav className="auth-tabs" role="tablist">
          <button
            className={`tab-btn ${authTab === 'login' ? 'active' : ''}`}
            role="tab"
            aria-selected={authTab === 'login'}
            onClick={() => { setAuthTab('login'); hideToast(); }}
          >
            Sign In
          </button>
          <button
            className={`tab-btn ${authTab === 'register' ? 'active' : ''}`}
            role="tab"
            aria-selected={authTab === 'register'}
            onClick={() => { setAuthTab('register'); hideToast(); }}
          >
            Create Account
          </button>
        </nav>

        {/* Toast Notification */}
        {toast.visible && (
          <div className={`toast ${toast.type}`}>
            {toast.message}
          </div>
        )}

        {/* PANEL 1: SIGN IN */}
        {authTab === 'login' && (
          <section className="auth-panel">
            {/* Sub-tabs: Email / Phone */}
            <div className="sub-tabs">
              <button
                className={`sub-tab-btn ${loginMethod === 'email' ? 'active' : ''}`}
                onClick={() => { setLoginMethod('email'); hideToast(); }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                Email
              </button>
              <button
                className={`sub-tab-btn ${loginMethod === 'phone' ? 'active' : ''}`}
                onClick={() => { setLoginMethod('phone'); hideToast(); }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                Phone Number
              </button>
            </div>

            {/* Email Login Form */}
            {loginMethod === 'email' ? (
              <form onSubmit={handleEmailLoginSubmit}>
                <div className="form-group">
                  <label htmlFor="login-email">Email Address</label>
                  <div className="input-wrapper">
                    <input
                      type="email"
                      id="login-email"
                      placeholder="name@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="label-row">
                    <label htmlFor="login-password">Password</label>
                    <button type="button" className="forgot-link" onClick={handleForgotPassword}>
                      Forgot?
                    </button>
                  </div>
                  <div className="input-wrapper">
                    <input
                      type={showLoginPassword ? 'text' : 'password'}
                      id="login-password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="toggle-pass"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      aria-label="Toggle login password visibility"
                    >
                      {showLoginPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                <div className="form-options">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span>Remember me</span>
                  </label>
                </div>

                <button type="submit" className="btn-primary">Sign In</button>
              </form>
            ) : (
              /* Phone Login Form */
              <form onSubmit={handlePhoneLoginSubmit}>
                <div className="form-group">
                  <label htmlFor="login-phone">Phone Number</label>
                  <div className="input-wrapper phone-wrapper">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      aria-label="Country Code"
                    >
                      <option value="+1">+1 (US/CA)</option>
                      <option value="+91">+91 (IN)</option>
                      <option value="+44">+44 (UK)</option>
                      <option value="+61">+61 (AU)</option>
                    </select>
                    <input
                      type="tel"
                      id="login-phone"
                      placeholder="98765 43210"
                      pattern="[0-9]{8,12}"
                      value={loginPhone}
                      onChange={(e) => setLoginPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="label-row">
                    <label htmlFor="login-otp">OTP / Passcode</label>
                    <button type="button" className="otp-link" onClick={handleRequestOTP}>
                      Get OTP
                    </button>
                  </div>
                  <div className="input-wrapper">
                    <input
                      type="password"
                      id="login-otp"
                      placeholder="6-digit code"
                      pattern="[0-9]{6}"
                      value={loginOtp}
                      onChange={(e) => setLoginOtp(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary">Sign In with Phone</button>
              </form>
            )}
          </section>
        )}

        {/* PANEL 2: CREATE ACCOUNT */}
        {authTab === 'register' && (
          <section className="auth-panel">
            <form onSubmit={handleRegisterSubmit}>
              <div className="form-group">
                <label htmlFor="reg-name">Full Name</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="reg-name"
                    placeholder="Alex Morgan"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="reg-email">Email Address</label>
                  <div className="input-wrapper">
                    <input
                      type="email"
                      id="reg-email"
                      placeholder="name@example.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="reg-phone">Phone Number</label>
                  <div className="input-wrapper">
                    <input
                      type="tel"
                      id="reg-phone"
                      placeholder="9876543210"
                      pattern="[0-9]{8,12}"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="role-selector">
                  <label className={`role-card ${regRole === 'rider' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="user-role"
                      value="rider"
                      checked={regRole === 'rider'}
                      onChange={() => setRegRole('rider')}
                    />
                    <span className="role-icon">🚗</span>
                    <span className="role-title">Find Rides</span>
                    <span className="role-desc">Passenger</span>
                  </label>

                  <label className={`role-card ${regRole === 'driver' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="user-role"
                      value="driver"
                      checked={regRole === 'driver'}
                      onChange={() => setRegRole('driver')}
                    />
                    <span className="role-icon">🚘</span>
                    <span className="role-title">Offer Rides</span>
                    <span className="role-desc">Driver</span>
                  </label>
                </div>
              </div>

              <div className="form-row">
                {/* Password with Eye Toggle */}
                <div className="form-group">
                  <label htmlFor="reg-pass">Password</label>
                  <div className="input-wrapper">
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      id="reg-pass"
                      placeholder="Min. 8 chars"
                      minLength={8}
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="toggle-pass"
                      onClick={() => setShowRegPassword(!showRegPassword)}
                      aria-label="Toggle password visibility"
                    >
                      {showRegPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                {/* Confirm Password with Eye Toggle */}
                <div className="form-group">
                  <label htmlFor="reg-confirm-pass">Confirm Password</label>
                  <div className="input-wrapper">
                    <input
                      type={showRegConfirmPassword ? 'text' : 'password'}
                      id="reg-confirm-pass"
                      placeholder="Re-enter password"
                      minLength={8}
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="toggle-pass"
                      onClick={() => setShowRegConfirmPassword(!showRegConfirmPassword)}
                      aria-label="Toggle confirm password visibility"
                    >
                      {showRegConfirmPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    required
                  />
                  <span>I agree to the <a href="#" className="terms-link">Terms of Service</a> & <a href="#" className="terms-link">Privacy Policy</a></span>
                </label>
              </div>

              <button type="submit" className="btn-primary">Create Account</button>
            </form>
          </section>
        )}

        {/* Footer Prompt */}
        <footer className="auth-footer">
          {authTab === 'login' ? (
            <p>
              Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); setAuthTab('register'); hideToast(); }}>Create one now</a>
            </p>
          ) : (
            <p>
              Already registered? <a href="#" onClick={(e) => { e.preventDefault(); setAuthTab('login'); hideToast(); }}>Sign in here</a>
            </p>
          )}
        </footer>
      </main>
    </div>
  );
}
