import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export default function Reports() {
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    fuelEfficiency: '4.2',
    costPerKm: '0.18',
    orgParticipation: '64',
    emissionsSaved: 0,
    totalTrips: 0,
    totalSpent: 0
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');
        
        if (!userStr || !token) {
          setIsLoading(false);
          return;
        }

        const user = JSON.parse(userStr);
        
        // Fetch user's trip history to generate real analytics
        const response = await axios.get(`${API_BASE_URL}/travel/user/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const allTrips = response.data.trips || [];
        const completedTrips = allTrips.filter(t => t.tripStatus === 'Completed');
        
        // Dynamic Calculations based on real database data
        // Assuming ~5.5kg of CO2 saved per shared commute
        const calculatedEmissions = (completedTrips.length * 5.5).toFixed(1);
        
        // Calculate total spend across all trips
        const totalFare = completedTrips.reduce((acc, trip) => {
          return acc + (trip.rideId?.farePerSeat || 0);
        }, 0);

        setMetrics(prev => ({
          ...prev,
          emissionsSaved: calculatedEmissions,
          totalTrips: completedTrips.length,
          totalSpent: totalFare
        }));

      } catch (error) {
        console.error("Failed to load analytics data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <>
      <div className="dash-welcome-row">
        <div>
          <h1 className="dash-title">Analytics Overview</h1>
          <p className="dash-sub">Enterprise mobility performance and sustainability metrics.</p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-outline">Last 30 Days ▾</button>
          <button className="btn-outline" onClick={() => alert('Downloading CSV Report...')}>📥 Export</button>
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
          <div className="metric-val">{metrics.fuelEfficiency} L/100km</div>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '4px' }}>Fleet average vs last month</div>
        </div>

        <div className="metric-card">
          <div className="metric-card-top">
            <div className="metric-icon-box">💵</div>
            <span className="trend-badge">↘ 5%</span>
          </div>
          <div className="metric-label">Total Spend</div>
          <div className="metric-val">₹ {isLoading ? '...' : metrics.totalSpent}</div>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '4px' }}>Across {metrics.totalTrips} completed trips</div>
        </div>

        <div className="metric-card">
          <div className="metric-card-top">
            <div className="metric-icon-box">👥</div>
            <span className="trend-badge">↗ 8%</span>
          </div>
          <div className="metric-label">Org Participation</div>
          <div className="metric-val">{metrics.orgParticipation}%</div>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '4px' }}>Active employees this month</div>
        </div>

        <div className="metric-card">
          <div className="metric-card-top">
            <div className="metric-icon-box">☁️</div>
            <span className="trend-badge">↘ 15%</span>
          </div>
          <div className="metric-label">Emissions Saved</div>
          <div className="metric-val">{isLoading ? '...' : metrics.emissionsSaved} kg</div>
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
  );
}