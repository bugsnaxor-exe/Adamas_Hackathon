import React, { useState } from 'react';
import axios from 'axios'; 

const API_BASE_URL = 'http://localhost:5000/api/users'; 

export default function AuthModal({ onLoginSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  
  // Password Visibility Toggles
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [showRegPass, setShowRegPass] = useState(false);
  const [showRegConfirmPass, setShowRegConfirmPass] = useState(false);

  // Form Input States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  // Async Login Handler
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/login/email`, {
        email: loginEmail,
        password: loginPassword
      });

      // Securely store the JWT and user data for future API requests
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));

      // Pass the user's name back to the parent component
      onLoginSuccess(response.data.name);
    } catch (error) {
      // Capture error message from the backend or fallback to generic message
      const errorMsg = error.response?.data?.message || 'Login failed. Please check your credentials.';
      alert(errorMsg);
    }
  };

  // Async Register Handler
  const handleRegister = async (e) => {
    e.preventDefault();
    if (regPassword !== regConfirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/register`, {
        name: regName,
        email: regEmail,
        phone: regPhone,
        password: regPassword
      });

      // Securely store the JWT and user data for future API requests
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));

      // Pass the user's name back to the parent component
      onLoginSuccess(response.data.name);
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Registration failed. Please try again.';
      alert(errorMsg);
    }
  };

  return (
    <div className="app-container" style={{ justifyContent: 'center', alignItems: 'center', padding: '24px' }}>
      <div className="beige-card" style={{ width: '100%', maxWidth: '420px', flexDirection: 'column', padding: '32px', background: '#fdfcf7' }}>
        {/* Branding */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div className="brand-icon-box" style={{ margin: '0 auto 12px auto', width: '52px', height: '52px' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
              <polygon points="3 11 22 2 13 21 11 13 3 11" />
            </svg>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0c3259' }}>Commute<strong>Pool</strong></h2>
          <p style={{ fontSize: '0.85rem', color: '#475569', marginTop: '4px' }}>Enterprise Mobility Platform</p>
        </div>

        {/* LOGIN FORM */}
        {mode === 'login' && (
          <form onSubmit={handleLogin}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0c3259', marginBottom: '16px' }}>Sign In to Account</h3>
            
            <div className="input-pill-field">
              <span>✉️</span>
              <input type="email" placeholder="Enter your email..." value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
            </div>

            <div className="input-pill-field" style={{ position: 'relative' }}>
              <span>🔒</span>
              <input type={showLoginPass ? 'text' : 'password'} placeholder="Enter password..." value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
              <button type="button" onClick={() => setShowLoginPass(!showLoginPass)} style={{ position: 'absolute', right: '16px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>
                {showLoginPass ? '👁️' : '🙈'}
              </button>
            </div>

            <button type="submit" className="btn-navy-primary" style={{ width: '100%', padding: '16px', borderRadius: '14px', marginTop: '8px' }}>
              Login
            </button>

            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <span style={{ fontSize: '0.88rem', color: '#475569' }}>Don't have an account? </span>
              <button type="button" onClick={() => setMode('register')} style={{ background: 'none', border: 'none', color: '#0c3259', fontWeight: 800, fontSize: '0.88rem', cursor: 'pointer', textDecoration: 'underline' }}>
                Create new account
              </button>
            </div>
          </form>
        )}

        {/* CREATE ACCOUNT FORM */}
        {mode === 'register' && (
          <form onSubmit={handleRegister}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0c3259', marginBottom: '16px' }}>Create New Account</h3>

            <div className="input-pill-field">
              <span>👤</span>
              <input type="text" placeholder="Enter name..." value={regName} onChange={(e) => setRegName(e.target.value)} required />
            </div>

            <div className="input-pill-field">
              <span>📱</span>
              <input type="tel" placeholder="Enter phone number..." value={regPhone} onChange={(e) => setRegPhone(e.target.value)} required />
            </div>

            <div className="input-pill-field">
              <span>✉️</span>
              <input type="email" placeholder="Enter your email..." value={regEmail} onChange={(e) => setRegEmail(e.target.value)} required />
            </div>

            <div className="input-pill-field" style={{ position: 'relative' }}>
              <span>🔒</span>
              <input type={showRegPass ? 'text' : 'password'} placeholder="Create password..." value={regPassword} onChange={(e) => setRegPassword(e.target.value)} required />
              <button type="button" onClick={() => setShowRegPass(!showRegPass)} style={{ position: 'absolute', right: '16px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>
                {showRegPass ? '👁️' : '🙈'}
              </button>
            </div>

            <div className="input-pill-field" style={{ position: 'relative' }}>
              <span>🔒</span>
              <input type={showRegConfirmPass ? 'text' : 'password'} placeholder="Re-enter your password..." value={regConfirmPassword} onChange={(e) => setRegConfirmPassword(e.target.value)} required />
              <button type="button" onClick={() => setShowRegConfirmPass(!showRegConfirmPass)} style={{ position: 'absolute', right: '16px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>
                {showRegConfirmPass ? '👁️' : '🙈'}
              </button>
            </div>

            <button type="submit" className="btn-navy-primary" style={{ width: '100%', padding: '16px', borderRadius: '14px', marginTop: '8px' }}>
              Create Account
            </button>

            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <span style={{ fontSize: '0.88rem', color: '#475569' }}>Already have an account? </span>
              <button type="button" onClick={() => setMode('login')} style={{ background: 'none', border: 'none', color: '#0c3259', fontWeight: 800, fontSize: '0.88rem', cursor: 'pointer', textDecoration: 'underline' }}>
                Login option
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}