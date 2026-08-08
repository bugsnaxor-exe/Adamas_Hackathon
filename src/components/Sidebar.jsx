import React from 'react';

export default function Sidebar({ activeTab, setActiveTab, onBookNewTrip }) {
  return (
    <aside className="cp-sidebar">
      <div>
        <div className="brand-section">
          <div className="brand-name">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
              <circle cx="7" cy="17" r="2"/>
              <path d="M9 17h6"/>
              <circle cx="17" cy="17" r="2"/>
            </svg>
            <span>CommutePlus</span>
          </div>
          <div className="brand-subtitle">ENTERPRISE MOBILITY</div>
        </div>

        <ul className="nav-menu">
          <li className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            <span>Dashboard</span>
          </li>
          <li className={`nav-item ${activeTab === 'find_ride' ? 'active' : ''}`} onClick={() => setActiveTab('find_ride')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <span>Find Ride</span>
          </li>
          <li className={`nav-item ${activeTab === 'offer_ride' ? 'active' : ''}`} onClick={() => setActiveTab('offer_ride')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
            <span>Offer Ride</span>
          </li>
          <li className={`nav-item ${activeTab === 'trips' ? 'active' : ''}`} onClick={() => setActiveTab('trips')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>My Trips</span>
          </li>
          <li className={`nav-item ${activeTab === 'wallet' ? 'active' : ''}`} onClick={() => setActiveTab('wallet')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
            <span>Wallet</span>
          </li>
          <li className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`} onClick={() => setActiveTab('reports')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
            <span>Reports</span>
          </li>
          <li className={`nav-item ${activeTab === 'vehicles' ? 'active' : ''}`} onClick={() => setActiveTab('vehicles')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 17h14M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2M5 17l-1 3m15-3l1 3"/></svg>
            <span>Vehicles</span>
          </li>
        </ul>
      </div>

      <div className="sidebar-bottom">
        <button className="btn-sidebar-cta" onClick={onBookNewTrip}>
          <span>+</span> <span>Book New Trip</span>
        </button>

        <div className="user-sidebar-profile">
          <img className="user-avatar-sm" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Alex Rivera" />
          <div className="user-info-text">
            <div className="user-name-title">Alex Rivera</div>
            <div className="user-dept-subtitle">Engineering Dept</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
