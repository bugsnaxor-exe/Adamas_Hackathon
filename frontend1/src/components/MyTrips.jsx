import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export default function MyTrips() {
  const [activeTrip, setActiveTrip] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the user's active trip on component mount
  useEffect(() => {
    const fetchActiveTrip = async () => {
      try {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');
        
        if (!userStr || !token) {
          setIsLoading(false);
          return;
        }

        const user = JSON.parse(userStr);

        // Fetch all trips for this passenger
        const response = await axios.get(`${API_BASE_URL}/travel/user/${user._id}?role=passenger`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const allTrips = response.data.trips || [];
        
        // Find the trip that is currently active (Ongoing or Scheduled)
        const current = allTrips.find(
          trip => trip.tripStatus === 'Ongoing' || trip.tripStatus === 'Scheduled'
        );

        setActiveTrip(current || null);
      } catch (error) {
        console.error('Error fetching active trip:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActiveTrip();

    // Note: If you want to integrate the Socket.io live location here later:
    // import { io } from 'socket.io-client';
    // const socket = io('http://localhost:5000');
    // socket.emit('joinTripRoom', current._id);
    // socket.on('receiveLocation', (coords) => { update map car position... })

  }, []);

  const handleCallDriver = () => {
    const phone = activeTrip?.driverId?.phone;
    if (phone) {
      window.location.href = `tel:${phone.replace(/\s+/g, '')}`;
    } else {
      alert('Driver phone number is not available.');
    }
  };

  const handleSmsDriver = () => {
    const phone = activeTrip?.driverId?.phone;
    if (phone) {
      window.location.href = `sms:${phone.replace(/\s+/g, '')}`;
    } else {
      alert('Driver phone number is not available.');
    }
  };

  const handleEmergencySOS = () => {
    // In a real app, this would send an urgent POST request to your backend to alert admins
    alert('🚨 Emergency SOS Alert Sent to Company Security with your live location!');
  };

  return (
    <div className="map-canvas-container" style={{ height: '100%', minHeight: '620px', position: 'relative' }}>
      <div className="map-control-widgets">
        <div className="map-control-btn" title="Recenter">🎯</div>
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
        <text x="612" y="131" fill="#fff" fontSize="12" fontWeight="800">
          {activeTrip ? 'Destination' : 'HQ - Building A'}
        </text>
      </svg>

      {/* Bottom Drawer Overlay */}
      <div style={{ position: 'absolute', bottom: '24px', left: '24px', background: '#ffffff', borderRadius: '16px', padding: '18px 24px', width: '320px', boxShadow: 'var(--shadow-dropdown)', border: '1px solid #e2e8f0' }}>
        
        {isLoading ? (
          <div style={{ textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>Locating your active ride...</div>
        ) : !activeTrip ? (
          <div style={{ textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>🚖</div>
            No active trips right now.<br/> Book a ride to track it here!
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a' }}>
                {activeTrip.driverId?.name || 'Your Driver'}
                <span style={{ display: 'block', fontSize: '0.75rem', color: '#10b981', fontWeight: 700, marginTop: '2px' }}>
                  • {activeTrip.tripStatus}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  style={{ background: '#eeebfe', border: 'none', width: '32px', height: '32px', borderRadius: '50%', color: '#4f46e5', cursor: 'pointer' }} 
                  onClick={handleSmsDriver}
                  title="SMS Driver"
                >
                  💬
                </button>
                <button 
                  style={{ background: '#4f46e5', border: 'none', width: '32px', height: '32px', borderRadius: '50%', color: '#fff', cursor: 'pointer' }} 
                  onClick={handleCallDriver}
                  title="Call Driver"
                >
                  📞
                </button>
              </div>
            </div>

            <div style={{ fontSize: '0.82rem', color: '#64748b', borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
              <div>📍 <strong>To:</strong> {activeTrip.rideId?.destination?.address || 'Destination'}</div>
              <div style={{ marginTop: '4px' }}>🚘 Vehicle Details Confirmed</div>
            </div>
          </>
        )}
      </div>

      {/* Safety / SOS Button */}
      <button 
        className="btn-sos-danger" 
        onClick={handleEmergencySOS}
        style={{ position: 'absolute', top: '24px', right: '24px' }}
      >
        <span>📍</span> <span>Safety / SOS</span>
      </button>
    </div>
  );
}