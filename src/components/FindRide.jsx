import React, { useState } from 'react';

export default function FindRide() {
  const [pickup, setPickup] = useState('Downtown HQ');
  const [destination, setDestination] = useState('Tech Park North, Bldg C');
  const [searchDate, setSearchDate] = useState('20-05-2024');
  const [searchTime, setSearchTime] = useState('17:30');
  const [seatsNeeded, setSeatsNeeded] = useState(1);

  return (
    <div className="find-ride-layout">
      {/* Left Search & Recommended Stream Panel */}
      <div className="find-search-card">
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Find a Ride</h3>

        <div className="cp-input-box">
          <span>📍</span>
          <input type="text" value={pickup} onChange={(e) => setPickup(e.target.value)} placeholder="Pickup Location..." />
        </div>

        <div className="cp-input-box">
          <span>🏁</span>
          <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Destination..." />
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

        <button className="btn-primary-indigo" style={{ width: '100%', padding: '12px', marginTop: '4px' }} onClick={() => alert('Searching Available Rides...')}>
          🔍 Search Rides
        </button>

        {/* Recommended Stream */}
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
              <button className="btn-primary-indigo" style={{ padding: '6px 14px', fontSize: '0.78rem' }} onClick={() => alert('Booking Confirmed with David Chen!')}>Book Now</button>
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

      {/* Right Map Canvas Panel */}
      <div className="map-canvas-container">
        <div className="map-control-widgets">
          <div className="map-control-btn" title="Center Location">🎯</div>
          <div className="map-control-btn">+</div>
          <div className="map-control-btn">-</div>
        </div>

        <svg width="100%" height="100%" viewBox="0 0 800 600" style={{ background: '#e5e7eb' }}>
          <line x1="100" y1="0" x2="100" y2="600" stroke="#d1d5db" strokeWidth="2" />
          <line x1="300" y1="0" x2="300" y2="600" stroke="#d1d5db" strokeWidth="2" />
          <line x1="500" y1="0" x2="500" y2="600" stroke="#d1d5db" strokeWidth="2" />
          <line x1="700" y1="0" x2="700" y2="600" stroke="#d1d5db" strokeWidth="2" />

          <polyline points="150,450 400,250 650,150" fill="none" stroke="#94a3b8" strokeWidth="4" strokeDasharray="6 4" />
          <polyline points="150,450 350,380 650,150" fill="none" stroke="#4f46e5" strokeWidth="6" strokeLinecap="round" />

          <circle cx="150" cy="450" r="10" fill="#4f46e5" stroke="#ffffff" strokeWidth="3" />
          <circle cx="650" cy="150" r="10" fill="#10b981" stroke="#ffffff" strokeWidth="3" />
          <circle cx="480" cy="270" r="8" fill="#0f172a" />
        </svg>

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
  );
}
