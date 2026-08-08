import React, { useState } from 'react';
import HeaderBar from './components/HeaderBar';
import BottomNav from './components/BottomNav';
import BookRide from './components/BookRide';
import OfferRide from './components/OfferRide';
import ProfileDrawer from './components/ProfileDrawer';
import AuthModal from './components/AuthModal';

export default function App() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('Alex');

  // Bottom Navigation State: 'book' | 'offer'
  const [activeTab, setActiveTab] = useState('book');

  // Profile Drawer State
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLoginSuccess = (name) => {
    setUserName(name);
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setIsProfileOpen(false);
  };

  // IF NOT AUTHENTICATED: RENDER REQUIREMENT 4 LOGIN / CREATE ACCOUNT SCREEN
  if (!isAuthenticated) {
    return <AuthModal onLoginSuccess={handleLoginSuccess} />;
  }

  // AUTHENTICATED WORKSPACE
  return (
    <div className="app-container">
      {/* Desktop Navigation Sidebar (Web Layout) */}
      <aside className="desktop-sidebar">
        <div>
          <div className="brand-title">
            <div className="brand-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
            </div>
            <span>Commute<strong>Pool</strong></span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button className={`btn-navy-primary ${activeTab === 'book' ? '' : 'btn-outline'}`} style={{ width: '100%', padding: '14px', background: activeTab === 'book' ? '#0c3259' : '#e2ded2', color: activeTab === 'book' ? '#fff' : '#475569' }} onClick={() => setActiveTab('book')}>
              📍 Book Ride
            </button>
            <button className={`btn-navy-primary ${activeTab === 'offer' ? '' : 'btn-outline'}`} style={{ width: '100%', padding: '14px', background: activeTab === 'offer' ? '#0c3259' : '#e2ded2', color: activeTab === 'offer' ? '#fff' : '#475569' }} onClick={() => setActiveTab('offer')}>
              🚗 Offer Ride
            </button>
          </div>
        </div>

        <div style={{ padding: '18px', background: 'var(--bg-beige-card)', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Wallet Balance</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--primary-navy)' }}>₹ 1,250.00</div>
          <button style={{ border: 'none', background: 'none', color: '#0c3259', fontWeight: 800, fontSize: '0.82rem', marginTop: '8px', cursor: 'pointer' }} onClick={() => setIsProfileOpen(true)}>
            Open Profile & Wallet ➔
          </button>
        </div>
      </aside>

      {/* Main Workspace Frame */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', background: 'var(--bg-cream)' }}>
        
        {/* Top Header Bar (User Name Top Left, Profile Top Right) */}
        <HeaderBar userName={userName} onOpenProfile={() => setIsProfileOpen(true)} />

        {/* Workspace Body: Requirement 1 Book Ride or Requirement 3 Offer Ride */}
        {activeTab === 'book' && <BookRide />}
        {activeTab === 'offer' && <OfferRide />}

        {/* Bottom 2-Option Navigation Bar */}
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Profile Drawer Overlay (Requirement 2) */}
      {isProfileOpen && (
        <ProfileDrawer
          userName={userName}
          onClose={() => setIsProfileOpen(false)}
          onSignOut={handleSignOut}
        />
      )}
    </div>
  );
}