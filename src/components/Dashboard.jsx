import React from 'react';

export default function Dashboard({ setActiveTab }) {
  return (
    <>
      <div className="dash-welcome-row">
        <div>
          <h1 className="dash-title">Good morning, Alex.</h1>
          <p className="dash-sub">Here is your commute overview for this week.</p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-outline">⚡ Filter</button>
          <button className="btn-primary-indigo" onClick={() => setActiveTab('find_ride')}>+ New Route</button>
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
              <div className="quick-act-btn" onClick={() => setActiveTab('find_ride')}>
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
  );
}
