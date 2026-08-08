import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export default function Dashboard({ setActiveTab }) {
  // State for backend data
  const [userName, setUserName] = useState('User');
  const [userId, setUserId] = useState(null);
  const [metrics, setMetrics] = useState({
    totalTrips: 0,
    co2Saved: 0,
    savings: 0,
  });
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');
        
        if (!userStr || !token) {
          setIsLoading(false);
          return;
        }

        const user = JSON.parse(userStr);
        setUserName(user.name.split(' ')[0] || 'User'); // Get first name
        setUserId(user._id);

        const headers = { Authorization: `Bearer ${token}` };

        // Fetch Trips and Wallet data concurrently
        const [tripsResponse, walletResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/travel/user/${user._id}`, { headers }),
          axios.get(`${API_BASE_URL}/wallet/${user._id}`, { headers })
        ]);

        const trips = tripsResponse.data.trips || [];
        const wallet = walletResponse.data;

        // Process Metrics
        const currentMonthTrips = trips.length; 
        const calculatedCo2 = (currentMonthTrips * 5.5).toFixed(1); // Mock calculation: 5.5kg saved per trip

        setMetrics({
          totalTrips: currentMonthTrips,
          co2Saved: calculatedCo2,
          savings: wallet.balance || 0
        });

        // Process Upcoming Trips (Filter for Scheduled status)
        const scheduled = trips.filter(t => t.tripStatus === 'Scheduled').slice(0, 2); // Get top 2
        setUpcomingTrips(scheduled);

        // Process Recent Activity (From Wallet Transactions)
        const activities = wallet.transactions ? wallet.transactions.slice(0, 3) : [];
        setRecentActivities(activities);

      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <>
      <div className="dash-welcome-row">
        <div>
          <h1 className="dash-title">Good morning, {userName}.</h1>
          <p className="dash-sub">Here is your commute overview for this week.</p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-outline">⚡ Filter</button>
          <button className="btn-primary-indigo" onClick={() => setActiveTab('offer_ride')}>+ New Route</button>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="dash-metrics-grid">
        <div className="metric-card">
          <div className="metric-card-top">
            <div className="metric-icon-box">🚗</div>
            <span className="trend-badge">↗ Active</span>
          </div>
          <div>
            <div className="metric-label">Total Trips (History)</div>
            <div className="metric-val">{isLoading ? '-' : metrics.totalTrips}</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-top">
            <div className="metric-icon-box" style={{ color: '#10b981' }}>🌱</div>
            <span className="trend-badge">↗ 8%</span>
          </div>
          <div>
            <div className="metric-label">CO2 Saved (kg)</div>
            <div className="metric-val">{isLoading ? '-' : metrics.co2Saved}</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-top">
            <div className="metric-icon-box" style={{ color: '#3b82f6' }}>👛</div>
          </div>
          <div>
            <div className="metric-label">Wallet Balance</div>
            <div className="metric-val">₹ {isLoading ? '-' : metrics.savings}</div>
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

          {isLoading ? (
            <div style={{ padding: '20px', color: '#64748b' }}>Loading trips...</div>
          ) : upcomingTrips.length === 0 ? (
            <div style={{ padding: '20px', color: '#64748b' }}>No upcoming trips scheduled.</div>
          ) : (
            upcomingTrips.map((trip, index) => {
              const isDriver = trip.driverId?._id === userId;
              const dateObj = new Date(trip.rideId?.travelDateTime);
              const timeString = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

              return (
                <div className="timeline-item" key={trip._id || index}>
                  <div className="timeline-dots">
                    <div className="dot-blue"></div>
                    <div className="dot-line"></div>
                    <div className="dot-green"></div>
                  </div>
                  <div className="timeline-details">
                    <div className="timeline-row" style={{ marginBottom: '4px' }}>
                      <span className="timeline-time">{timeString} • Pickup</span>
                      
                      {isDriver ? (
                        <span style={{ fontSize: '0.78rem', color: '#4f46e5', fontWeight: 700 }}>🚗 You are driving</span>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                            Driven by {trip.driverId?.name || 'Driver'}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="timeline-place">{trip.rideId?.pickupLocation?.address || 'Pickup Location'}</div>

                    <div className="timeline-row">
                      <span className="timeline-time">Drop-off</span>
                      <span className="status-badge-purple">{trip.tripStatus.toUpperCase()}</span>
                    </div>
                    <div className="timeline-place" style={{ marginBottom: 0 }}>
                      {trip.rideId?.destination?.address || 'Destination'}
                    </div>
                  </div>
                </div>
              );
            })
          )}
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
              {isLoading ? (
                <div>Loading activity...</div>
              ) : recentActivities.length === 0 ? (
                <div>No recent activity.</div>
              ) : (
                recentActivities.map((tx, idx) => (
                  <div key={tx._id || idx} style={{ padding: '8px 0', borderBottom: idx !== recentActivities.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                    <strong style={{ color: tx.transactionType === 'Credit' ? '#10b981' : '#ef4444' }}>
                      {tx.transactionType === 'Credit' ? '✓ Received' : '💸 Paid'} ₹{tx.amount}
                    </strong> • {new Date(tx.createdAt).toLocaleDateString()}
                    <div style={{ marginTop: '2px', fontSize: '0.75rem' }}>{tx.description}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}