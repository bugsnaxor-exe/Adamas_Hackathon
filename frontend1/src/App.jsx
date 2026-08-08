import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderBar from './components/HeaderBar';
import BottomNav from './components/BottomNav';
import BookRide from './components/BookRide';
import OfferRide from './components/OfferRide';
import ProfileDrawer from './components/ProfileDrawer';
import AuthModal from './components/AuthModal';
import { BookRideIcon, OfferRideIcon } from './components/Icons';

const API_BASE_URL = 'http://localhost:5000/api';

export default function App() {
  // Authentication State - Check localStorage on initial load
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [userName, setUserName] = useState(user?.name || 'Alex');

  // Bottom Navigation State: 'book' | 'offer'
  const [activeTab, setActiveTab] = useState('book');

  // Profile Drawer State
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Wallet State (for the Desktop Sidebar)
  const [walletBalance, setWalletBalance] = useState(0);

  // Fetch wallet balance when authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      const fetchWallet = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`${API_BASE_URL}/wallet/${user._id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setWalletBalance(response.data.balance || 0);
        } catch (error) {
          console.error('Error fetching wallet for sidebar:', error);
        }
      };
      fetchWallet();
    }
  }, [isAuthenticated, user, isProfileOpen]); // Re-fetch if they close the profile drawer (might have recharged)

  const handleLoginSuccess = (name) => {
    // AuthModal already saved token and user to localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
    setUserName(storedUser?.name || name);
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    setIsProfileOpen(false);
  };

  // IF NOT AUTHENTICATED: RENDER LOGIN / CREATE ACCOUNT SCREEN
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
          <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--primary-navy)' }}>
            ₹ {walletBalance.toFixed(2)}
          </div>
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