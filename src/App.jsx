import React, { useState } from 'react';

export default function App() {
  // Navigation & Screen View State: 'dashboard' | 'find_ride' | 'offer_ride' | 'trips' | 'wallet' | 'reports' | 'vehicles'
  const [activeTab, setActiveTab] = useState('dashboard');

  // Search & Booking State
  const [pickupLocation, setPickupLocation] = useState('Downtown HQ');
  const [destLocation, setDestLocation] = useState('Tech Park North, Bldg C');
  const [searchDate, setSearchDate] = useState('2024-05-20');
  const [searchTime, setSearchTime] = useState('17:30');
  const [seatsNeeded, setSeatsNeeded] = useState(1);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);

  // Quick Action Handler
  const handleQuickAction = (tab) => {
    setActiveTab(tab);
    if (tab === 'find_ride') setIsSearchActive(false);
  };

  return (
    <div className="app-viewport-frame">
      {/* LEFT SIDEBAR (Matching screenshots exactly) */}
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
            <li className={`nav-item ${activeTab === 'find_ride' ? 'active' : ''}`} onClick={() => handleQuickAction('find_ride')}>
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
            <li className={`nav-item ${activeTab === 'vehicles' ? 'active' : ''}`} onClick={() => setActiveModule('vehicles')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 17h14M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2M5 17l-1 3m15-3l1 3"/></svg>
              <span>Vehicles</span>
            </li>
          </ul>
        </div>

        <div className="sidebar-bottom">
          <button className="btn-sidebar-cta" onClick={() => handleQuickAction('find_ride')}>
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

      {/* MAIN WORKSPACE AREA */}
      <div className="cp-main-workspace">
        {/* Top Header Bar */}
        <header className="cp-header">
          {activeTab === 'trips' ? (
            <button className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => setActiveTab('dashboard')}>
              ← Back to Dashboard
            </button>
          ) : (
            <div className="header-search-bar">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" placeholder="Search routes, colleagues..." />
            </div>
          )}

          <div className="header-actions-right">
            <div className="icon-btn-circle">
              <span className="notification-dot"></span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            </div>

            <div className="icon-btn-circle">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            </div>

            <img className="user-avatar-sm" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Alex Rivera" />
          </div>
        </header>

        <div className="cp-content-scroll">
          {/* TAB 1: DASHBOARD VIEW (Screenshot 1 Exact Replica) */}
          {activeTab === 'dashboard' && (
            <>
              <div className="dash-welcome-row">
                <div>
                  <h1 className="dash-title">Good morning, Alex.</h1>
                  <p className="dash-sub">Here is your commute overview for this week.</p>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="btn-outline">⚡ Filter</button>
                  <button className="btn-primary-indigo" onClick={() => handleQuickAction('find_ride')}>+ New Route</button>
                </div>
              </div>

              {/* 3 Metric Cards */}
              <div className="dash-metrics-grid">
                <div className="metric-card">
                  <div className="metric-card-top">
                    <div className="metric-icon-box">🚗</div>
                    <span className="trend-badge">↗ 12%</span>
                  </div>
                  <div>
                    <div className="metric-label">Total Trips (Month)</div>
                    <div className="metric-val">24</div>
                  </div>
                </div>

                <div className="metric-card">
                  <div className="metric-card-top">
                    <div className="metric-icon-box" style={{ color: '#10b981' }}>🌱</div>
                    <span className="trend-badge">↗ 8%</span>
                  </div>
                  <div>
                    <div className="metric-label">CO2 Saved (kg)</div>
                    <div className="metric-val">142.5</div>
                  </div>
                </div>

                <div className="metric-card">
                  <div className="metric-card-top">
                    <div className="metric-icon-box" style={{ color: '#3b82f6' }}>🐷</div>
                  </div>
                  <div>
                    <div className="metric-label">Monthly Savings</div>
                    <div className="metric-val">$128.00</div>
                  </div>
                </div>
              </div>

              {/* Split Content: Upcoming Trips & Quick Actions */}
              <div className="dash-middle-grid">
                <div className="cp-card-box">
                  <div className="card-box-header">
                    <div className="card-box-title">Upcoming Trips</div>
                    <span className="link-view-all" onClick={() => setActiveTab('trips')}>View All</span>
                  </div>

                  {/* Timeline Trip 1 */}
                  <div className="timeline-item">
                    <div className="timeline-dots">
                      <div className="dot-blue"></div>
                      <div className="dot-line"></div>
                      <div className="dot-green"></div>
                    </div>
                    <div className="timeline-details">
                      <div className="timeline-row" style={{ marginBottom: '4px' }}>
                        <span className="timeline-time">08:00 AM • Home</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <img className="user-avatar-sm" style={{ width: '22px', height: '22px' }} src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Mark T." />
                          <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Driven by Mark T.</span>
                        </div>
                      </div>
                      <div className="timeline-place">123 Willow Creek Dr.</div>

                      <div className="timeline-row">
                        <span className="timeline-time">08:45 AM • HQ</span>
                        <span className="status-badge-purple">BOOKED</span>
                      </div>
                      <div className="timeline-place" style={{ marginBottom: 0 }}>Tech Campus, Bldg B</div>
                    </div>
                  </div>

                  {/* Timeline Trip 2 */}
                  <div className="timeline-item">
                    <div className="timeline-dots">
                      <div className="dot-blue"></div>
                      <div className="dot-line"></div>
                      <div className="dot-green"></div>
                    </div>
                    <div className="timeline-details">
                      <div className="timeline-row" style={{ marginBottom: '4px' }}>
                        <span className="timeline-time">05:30 PM • HQ</span>
                        <span style={{ fontSize: '0.78rem', color: '#4f46e5', fontWeight: 700 }}>🚗 You are driving</span>
                      </div>
                      <div className="timeline-place">Tech Campus, Bldg B</div>

                      <div className="timeline-row">
                        <span className="timeline-time">06:15 PM • Home</span>
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>+1 Passenger</span>
                      </div>
                      <div className="timeline-place" style={{ marginBottom: 0 }}>123 Willow Creek Dr.</div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Quick Actions & Recent Activity */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="cp-card-box">
                    <div className="card-box-title" style={{ marginBottom: '14px' }}>Quick Actions</div>
                    <div className="quick-actions-grid">
                      <div className="quick-act-btn" onClick={() => handleQuickAction('find_ride')}>
                        <span className="act-icon">🔍</span>
                        <span className="act-label">Find Ride</span>
                      </div>
                      <div className="quick-act-btn" onClick={() => setActiveTab('offer_ride')}>
                        <span className="act-icon">🚗</span>
                        <span className="act-label">Offer Ride</span>
                      </div>
                    </div>
                  </div>

                  <div className="cp-card-box">
                    <div className="card-box-title" style={{ marginBottom: '14px' }}>Recent Activity</div>
                    <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                      <div style={{ padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                        <strong style={{ color: '#10b981' }}>✓ Trip Completed</strong> • Yesterday 6:00 PM
                      </div>
                      <div style={{ padding: '8px 0' }}>
                        💬 Message from <strong>Sarah</strong> • Oct 24, 2:15 PM
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: FIND RIDE VIEW (Screenshot 3 Exact Replica) */}
          {activeTab === 'find_ride' && (
            <div className="find-ride-layout">
              {/* Left Search & Drivers Stream Panel */}
              <div className="find-search-card">
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Find a Ride</h3>

                <div className="cp-input-box">
                  <span>📍</span>
                  <input type="text" value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} placeholder="Pickup Location..." />
                </div>

                <div className="cp-input-box">
                  <span>🏁</span>
                  <input type="text" value={destLocation} onChange={(e) => setDestLocation(e.target.value)} placeholder="Destination..." />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="cp-input-box">
                    <span>📅</span>
                    <input type="text" value={searchDate} onChange={(e) => setSearchDate(e.target.value)} />
                  </div>
                  <div className="cp-input-box">
                    <span>⏰</span>
                    <input type="text" value={searchTime} onChange={(e) => setSearchTime(e.target.value)} />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>Seats Needed:</span>
                    <button style={{ border: '1px solid #cbd5e1', width: '24px', height: '24px', borderRadius: '4px', background: '#fff' }} onClick={() => setSeatsNeeded(Math.max(1, seatsNeeded - 1))}>-</button>
                    <span>{seatsNeeded}</span>
                    <button style={{ border: '1px solid #cbd5e1', width: '24px', height: '24px', borderRadius: '4px', background: '#fff' }} onClick={() => setSeatsNeeded(seatsNeeded + 1)}>+</button>
                  </div>
                  <span style={{ fontSize: '0.82rem', color: '#4f46e5', fontWeight: 700, cursor: 'pointer' }}>⚡ Filters</span>
                </div>

                <button className="btn-primary-indigo" style={{ width: '100%', padding: '12px', marginTop: '4px' }} onClick={() => setIsSearchActive(true)}>
                  🔍 Search Rides
                </button>

                {/* Recommended Drivers List */}
                <div style={{ marginTop: '8px' }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>Recommended for you</div>

                  {/* Driver Card 1 */}
                  <div className="driver-rec-card">
                    <div className="driver-head-row">
                      <img className="driver-photo" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" alt="David Chen" />
                      <div>
                        <div className="driver-title-name">David Chen</div>
                        <div className="driver-title-sub">⭐ 4.9 (120 trips) • Tesla Model 3 • White</div>
                      </div>
                      <div className="driver-price-right">
                        <div className="driver-price-amount">$12.50</div>
                        <div className="driver-price-time">Est. 45 min</div>
                      </div>
                    </div>

                    <div style={{ fontSize: '0.8rem', color: '#475569', marginBottom: '8px' }}>
                      <div>• <strong>17:35 Pickup:</strong> Downtown HQ, Main Entrance</div>
                      <div>• <strong>18:20 Drop-off:</strong> Tech Park North, Bldg C</div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <span style={{ background: '#f1f5f9', fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>EV</span>
                        <span style={{ background: '#f1f5f9', fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>2 seats left</span>
                      </div>
                      <button className="btn-primary-indigo" style={{ padding: '6px 14px', fontSize: '0.78rem' }} onClick={() => alert('Booking Confirmed!')}>Book Now</button>
                    </div>
                  </div>

                  {/* Driver Card 2 */}
                  <div className="driver-rec-card">
                    <div className="driver-head-row">
                      <img className="driver-photo" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Sarah Jenkins" />
                      <div>
                        <div className="driver-title-name">Sarah Jenkins</div>
                        <div className="driver-title-sub">⭐ 4.7 (85 trips) • Toyota Prius • Silver</div>
                      </div>
                      <div className="driver-price-right">
                        <div className="driver-price-amount">$10.00</div>
                        <div className="driver-price-time">Est. 55 min</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Map Canvas Panel (Screenshot 3) */}
              <div className="map-canvas-container">
                <div className="map-control-widgets">
                  <div className="map-control-btn" title="Center Location">🎯</div>
                  <div className="map-control-btn">+</div>
                  <div className="map-control-btn">-</div>
                </div>

                <svg width="100%" height="100%" viewBox="0 0 800 600" style={{ background: '#e5e7eb' }}>
                  {/* Street Map Layout Grid */}
                  <line x1="100" y1="0" x2="100" y2="600" stroke="#d1d5db" strokeWidth="2" />
                  <line x1="300" y1="0" x2="300" y2="600" stroke="#d1d5db" strokeWidth="2" />
                  <line x1="500" y1="0" x2="500" y2="600" stroke="#d1d5db" strokeWidth="2" />
                  <line x1="700" y1="0" x2="700" y2="600" stroke="#d1d5db" strokeWidth="2" />

                  <line x1="0" y1="150" x2="800" y2="150" stroke="#d1d5db" strokeWidth="2" />
                  <line x1="0" y1="350" x2="800" y2="350" stroke="#d1d5db" strokeWidth="2" />

                  {/* Route Lines */}
                  <polyline points="150,450 400,250 650,150" fill="none" stroke="#94a3b8" strokeWidth="4" strokeDasharray="6 4" />
                  <polyline points="150,450 350,380 650,150" fill="none" stroke="#4f46e5" strokeWidth="6" strokeLinecap="round" />

                  {/* Map Markers */}
                  <circle cx="150" cy="450" r="10" fill="#4f46e5" stroke="#ffffff" strokeWidth="3" />
                  <circle cx="650" cy="150" r="10" fill="#10b981" stroke="#ffffff" strokeWidth="3" />
                  <circle cx="480" cy="270" r="8" fill="#0f172a" />
                </svg>

                {/* Selected Route Overlay Card (Screenshot 3 Bottom) */}
                <div className="map-bottom-selected-overlay">
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.4rem' }}>🚗</span>
                    <div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>Selected Route</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Via I-95 N • Moderate Traffic</div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a' }}>45 min <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>- $22.00</span></div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10b981' }}>Fastest</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MY TRIPS & LIVE TRACKING FULL MAP (Screenshot 2 Exact Replica) */}
          {activeTab === 'trips' && (
            <div className="map-canvas-container" style={{ height: '100%', minHeight: '620px' }}>
              <div className="map-control-widgets">
                <div className="map-control-btn">🎯</div>
                <div className="map-control-btn">+</div>
                <div className="map-control-btn">-</div>
              </div>

              {/* San Francisco City Map Graphic */}
              <svg width="100%" height="100%" viewBox="0 0 900 650" style={{ background: '#93c5fd' }}>
                <rect x="150" y="50" width="600" height="550" rx="16" fill="#e5e7eb" />
                <path d="M 200,50 Q 400,200 700,100" fill="none" stroke="#60a5fa" strokeWidth="30" />

                {/* Dashed Purple Route */}
                <path d="M 250,450 Q 500,550 700,200" fill="none" stroke="#818cf8" strokeWidth="6" strokeDasharray="8 6" />

                {/* Moving Car Icon */}
                <circle cx="520" cy="280" r="22" fill="#4f46e5" />
                <text x="511" y="286" fill="#fff" fontSize="16">🚗</text>

                {/* Pins */}
                <rect x="600" y="110" width="130" height="32" rx="16" fill="#047857" />
                <text x="612" y="131" fill="#fff" fontSize="12" fontWeight="800">HQ - Building A</text>
              </svg>

              {/* Bottom Drawer Overlay */}
              <div style={{ position: 'absolute', bottom: '24px', left: '24px', background: '#ffffff', borderRadius: '16px', padding: '18px 24px', width: '320px', boxShadow: 'var(--shadow-dropdown)', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>Sarah Jenkins</div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ background: '#eeebfe', border: 'none', width: '32px', height: '32px', borderRadius: '50%', color: '#4f46e5' }}>💬</button>
                    <button style={{ background: '#4f46e5', border: 'none', width: '32px', height: '32px', borderRadius: '50%', color: '#fff' }}>📞</button>
                  </div>
                </div>

                <div style={{ fontSize: '0.82rem', color: '#64748b' }}>🚗 Toyota Camry, White XYZ-1234</div>
              </div>

              {/* Safety / SOS Button (Screenshot 2 Bottom Right) */}
              <button className="btn-sos-danger">
                <span>📍</span> <span>Safety / SOS</span>
              </button>
            </div>
          )}

          {/* TAB 4: REPORTS & ANALYTICS (Screenshot 4 Exact Replica) */}
          {activeTab === 'reports' && (
            <>
              <div className="dash-welcome-row">
                <div>
                  <h1 className="dash-title">Analytics Overview</h1>
                  <p className="dash-sub">Enterprise mobility performance and sustainability metrics.</p>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="btn-outline">Last 30 Days ▾</button>
                  <button className="btn-outline">📥 Export</button>
                </div>
              </div>

              {/* 4 Metric Cards */}
              <div className="analytics-grid-4col">
                <div className="metric-card">
                  <div className="metric-card-top">
                    <div className="metric-icon-box">🍃</div>
                    <span className="trend-badge">↗ 12%</span>
                  </div>
                  <div className="metric-label">Fuel Efficiency</div>
                  <div className="metric-val">4.2 L/100km</div>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '4px' }}>Fleet average vs last month</div>
                </div>

                <div className="metric-card">
                  <div className="metric-card-top">
                    <div className="metric-icon-box">💵</div>
                    <span className="trend-badge">↘ 5%</span>
                  </div>
                  <div className="metric-label">Cost per KM</div>
                  <div className="metric-val">$0.18</div>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '4px' }}>Operational cost average</div>
                </div>

                <div className="metric-card">
                  <div className="metric-card-top">
                    <div className="metric-icon-box">👥</div>
                    <span className="trend-badge">↗ 8%</span>
                  </div>
                  <div className="metric-label">Org Participation</div>
                  <div className="metric-val">64%</div>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '4px' }}>Active employees this month</div>
                </div>

                <div className="metric-card">
                  <div className="metric-card-top">
                    <div className="metric-icon-box">☁️</div>
                    <span className="trend-badge">↘ 15%</span>
                  </div>
                  <div className="metric-label">Emissions Saved</div>
                  <div className="metric-val">1,240 kg</div>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '4px' }}>CO2 equivalent reduced</div>
                </div>
              </div>

              {/* Charts Split View */}
              <div className="analytics-chart-split">
                <div className="cp-card-box">
                  <div className="card-box-header">
                    <div className="card-box-title">Commute Trends</div>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', fontWeight: 700 }}>
                      <span style={{ color: '#4f46e5' }}>● Carpool</span>
                      <span style={{ color: '#059669' }}>● Solo</span>
                    </div>
                  </div>

                  {/* SVG Chart Replica */}
                  <svg width="100%" height="220" viewBox="0 0 500 200">
                    <line x1="0" y1="40" x2="500" y2="40" stroke="#f1f5f9" strokeDasharray="4 4" />
                    <line x1="0" y1="120" x2="500" y2="120" stroke="#f1f5f9" strokeDasharray="4 4" />

                    <path d="M 0,180 Q 150,20 300,160 T 500,20" fill="none" stroke="#4f46e5" strokeWidth="5" />
                    <path d="M 0,100 Q 150,190 300,110 T 500,180" fill="none" stroke="#059669" strokeWidth="4" strokeDasharray="6 4" />
                  </svg>
                </div>

                {/* Donut Chart */}
                <div className="cp-card-box" style={{ textAlign: 'center' }}>
                  <div className="card-box-title" style={{ textAlign: 'left', marginBottom: '16px' }}>Mode Split</div>

                  <svg width="160" height="160" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#e2e8f0" strokeWidth="12" />
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#4f46e5" strokeWidth="12" strokeDasharray="160 80" />
                    <text x="50" y="52" textAnchor="middle" fontSize="14" fontWeight="800" fill="#0f172a">55%</text>
                    <text x="50" y="65" textAnchor="middle" fontSize="8" fill="#64748b">Carpool</text>
                  </svg>

                  <div style={{ marginTop: '16px', fontSize: '0.8rem', color: '#475569', textAlign: 'left' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '4px 0' }}><span>● Carpool</span><strong>55%</strong></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '4px 0' }}><span>● Public Transit</span><strong>25%</strong></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '4px 0' }}><span>● EV Fleet</span><strong>15%</strong></div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}