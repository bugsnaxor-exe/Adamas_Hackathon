import React, { useState } from 'react';
import HeaderBar from './components/HeaderBar';
import BottomNav from './components/BottomNav';
import BookRide from './components/BookRide';
import OfferRide from './components/OfferRide';
import ProfileDrawer from './components/ProfileDrawer';
import AuthModal from './components/AuthModal';
import { BookRideIcon, OfferRideIcon } from './components/Icons';

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
              <BookRideIcon size={24} color="#ffffff" />
            </div>
            <span>Commute<strong>Pool</strong></span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button 
              className={`btn-navy-primary ${activeTab === 'book' ? '' : 'btn-outline'}`} 
              style={{ 
                width: '100%', 
                padding: '14px', 
                background: activeTab === 'book' ? '#0c3259' : '#e2ded2', 
                color: activeTab === 'book' ? '#fff' : '#475569',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                justifyContent: 'flex-start'
              }} 
              onClick={() => setActiveTab('book')}
            >
              <BookRideIcon size={20} color={activeTab === 'book' ? '#ffffff' : '#475569'} />
              <span>Book Ride</span>
            </button>

            <button 
              className={`btn-navy-primary ${activeTab === 'offer' ? '' : 'btn-outline'}`} 
              style={{ 
                width: '100%', 
                padding: '14px', 
                background: activeTab === 'offer' ? '#0c3259' : '#e2ded2', 
                color: activeTab === 'offer' ? '#fff' : '#475569',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                justifyContent: 'flex-start'
              }} 
              onClick={() => setActiveTab('offer')}
            >
              <OfferRideIcon size={22} color={activeTab === 'offer' ? '#ffffff' : '#475569'} />
              <span>Offer Ride</span>
            </button>
          </div>
        </div>

        <div style={{ padding: '18px', background: 'var(--bg-beige-card)', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>👛 Wallet Balance</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--primary-navy)' }}>₹ 1,250.00</div>
          <button style={{ border: 'none', background: 'none', color: '#0c3259', fontWeight: 800, fontSize: '0.82rem', marginTop: '8px', cursor: 'pointer' }} onClick={() => setIsProfileOpen(true)}>
            Open Profile & Wallet ➔
          </button>
        </div>
      </aside>

      {/* Main Workspace Frame */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', background: 'var(--bg-cream)' }}>
        
        {/* Top Header Bar */}
        <HeaderBar userName={userName} onOpenProfile={() => setIsProfileOpen(true)} />

        {/* Workspace Body: Book Ride or Offer Ride */}
        {activeTab === 'book' && <BookRide />}
        {activeTab === 'offer' && <OfferRide />}

        {/* Bottom 2-Option Navigation Bar */}
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Profile Drawer Overlay */}
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