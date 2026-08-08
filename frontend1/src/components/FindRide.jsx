import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export default function FindRide() {
  const [pickup, setPickup] = useState('Downtown HQ');
  const [destination, setDestination] = useState('Tech Park North, Bldg C');
  // Note: For best results with HTML inputs and JS Dates, use YYYY-MM-DD format
  const [searchDate, setSearchDate] = useState('2026-08-09'); 
  const [searchTime, setSearchTime] = useState('17:30');
  const [seatsNeeded, setSeatsNeeded] = useState(1);

  // Backend connection states
  const [availableRides, setAvailableRides] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // 1. Search for Rides
  const handleSearch = async () => {
    setIsLoading(true);
    setHasSearched(true);
    
    try {
      const token = localStorage.getItem('token');
      
      // Note: In production, you'd use a geocoding service (like Google Maps) 
      // to convert `pickup` text into actual longitude/latitude. 
      // Using mock coordinates here to trigger the MongoDB $near query.
      const lng = 77.2090; 
      const lat = 28.6139;

      const response = await axios.get(`${API_BASE_URL}/rides/search`, {
        params: { lng, lat, date: searchDate, radiusInKm: 15 },
        headers: { Authorization: `Bearer ${token}` }
      });

      setAvailableRides(response.data.rides || []);
    } catch (error) {
      alert(error.response?.data?.message || 'Error searching for rides.');
      setAvailableRides([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Book a Ride
  const handleBook = async (ride) => {
    try {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      
      if (!userStr || !token) {
        alert('Please login first to book a ride.');
        return;
      }

      const user = JSON.parse(userStr);

      await axios.post(`${API_BASE_URL}/trips/book`, {
        rideId: ride._id,
        passengerId: user._id,
        paymentMethod: 'UPI' // Setting a default, you can add a modal later if needed
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert(`🎉 Booking Confirmed with ${ride.driverId?.name || 'the driver'}!`);
      
      // Optionally, refresh search results to update available seats
      handleSearch(); 
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to book the ride. Please try again.');
    }
  };

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
            <input type="date" value={searchDate} onChange={(e) => setSearchDate(e.target.value)} />
          </div>
          <div className="cp-input-box">
            <span>⏰</span>
            <input type="time" value={searchTime} onChange={(e) => setSearchTime(e.target.value)} />
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

        <button 
          className="btn-primary-indigo" 
          style={{ width: '100%', padding: '12px', marginTop: '4px', opacity: isLoading ? 0.7 : 1 }} 
          onClick={handleSearch}
          disabled={isLoading}
        >
          {isLoading ? 'Searching...' : '🔍 Search Rides'}
        </button>

        {/* Recommended Stream */}
        <div style={{ marginTop: '8px' }}>
          <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
            {hasSearched ? `Available Rides (${availableRides.length})` : 'Recommended for you'}
          </div>

          {availableRides.length === 0 && hasSearched && !isLoading ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>
              No rides found for this date and location.
            </div>
          ) : (
            availableRides.map((ride) => {
              // Parse backend date for display
              const rideDate = new Date(ride.travelDateTime);
              const timeString = rideDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

              return (
                <div className="driver-rec-card" key={ride._id}>
                  <div className="driver-head-row">
                    <img 
                      className="driver-photo" 
                      src={`https://ui-avatars.com/api/?name=${ride.driverId?.name}&background=random`} 
                      alt={ride.driverId?.name} 
                    />
                    <div>
                      <div className="driver-title-name">{ride.driverId?.name || 'Driver'}</div>
                      <div className="driver-title-sub">
                        ⭐ 4.9 • {ride.vehicleId?.vehicleModel || 'Vehicle'} • {ride.vehicleId?.registrationNumber || 'Reg'}
                      </div>
                    </div>
                    <div className="driver-price-right">
                      <div className="driver-price-amount">₹{ride.farePerSeat}</div>
                      <div className="driver-price-time">Per Seat</div>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.8rem', color: '#475569', marginBottom: '8px' }}>
                    <div>• <strong>{timeString} Pickup:</strong> {ride.pickupLocation?.address}</div>
                    <div>• <strong>Drop-off:</strong> {ride.destination?.address}</div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <span style={{ background: '#f1f5f9', fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>
                        {ride.availableSeats} seats left
                      </span>
                    </div>
                    <button 
                      className="btn-primary-indigo" 
                      style={{ padding: '6px 14px', fontSize: '0.78rem' }} 
                      onClick={() => handleBook(ride)}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              );
            })
          )}
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

        {availableRides.length > 0 && (
          <div className="map-bottom-selected-overlay">
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ fontSize: '1.4rem' }}>🚗</span>
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>Available Routes Found</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Check the list for driver details</div>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a' }}>
                {availableRides.length} Options
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10b981' }}>Ready to Book</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}