import React, { useState, useEffect } from 'react';

export default function Header({ activeTab, setActiveTab }) {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch logged-in user profile from localStorage on component mount
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (err) {
        console.error('Failed to parse user data from localStorage', err);
      }
    }
  }, []);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload(); // Refreshes page to reset application state
  };

  // Generate dynamic avatar URL based on user's name
  const avatarUrl = user?.name 
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0c3259&color=ffffff&bold=true`
    : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80';

  return (
    <header className="cp-header" style={{ position: 'relative' }}>
      {activeTab === 'trips' ? (
        <button 
          className="btn-outline" 
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }} 
          onClick={() => setActiveTab('dashboard')}
        >
          ← Back to Dashboard
        </button>
      ) : (
        <div className="header-search-bar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.2">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input 
            type="text" 
            placeholder="Search routes, colleagues..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      <div className="header-actions-right">
        <div className="icon-btn-circle" title="Notifications">
          <span className="notification-dot"></span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        </div>

        <div className="icon-btn-circle" title="Settings">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </div>

        {/* User Profile Avatar with Clickable Dropdown Menu */}
        <div style={{ position: 'relative' }}>
          <img 
            className="user-avatar-sm" 
            src={avatarUrl} 
            alt={user?.name || 'User Avatar'} 
            onClick={() => setShowDropdown(!showDropdown)}
            style={{ cursor: 'pointer', borderRadius: '50%' }}
            title={user?.name || 'User Profile'}
          />

          {/* Profile Dropdown Menu */}
          {showDropdown && (
            <div 
              style={{
                position: 'absolute',
                top: '48px',
                right: '0',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                padding: '12px 16px',
                minWidth: '180px',
                zIndex: 1000
              }}
            >
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0c3259', marginBottom: '2px' }}>
                {user?.name || 'Logged User'}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '12px', wordBreak: 'break-all' }}>
                {user?.email || ''}
              </div>
              <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '8px 0' }} />
              <button 
                onClick={handleLogout}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  color: '#ef4444',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  padding: '4px 0'
                }}
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}