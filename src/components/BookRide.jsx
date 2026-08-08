import React, { useState } from 'react';
import axios from 'axios';
import RideCard from './RideCard';
import ContactRiderBar from './ContactRiderBar';
import { LocationIcon, CalendarIcon, UserIcon, WalletIcon, BookRideIcon } from './Icons';

const API_BASE_URL = 'http://localhost:5000/api';

export default function BookRide() {
  // Map Expand / Rapido Sheet Toggle
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  // Search & Booking Workflow States: 'search' | 'riders_list' | 'active_eta' | 'payment_page'
  const [flowStep, setFlowStep] = useState('search');

  // Form Inputs
  const [whereTo, setWhereTo] = useState('AIIMS Hospital');
  const [selectDate, setSelectDate] = useState('2026-08-09');
  const [selectSeats, setSelectSeats] = useState(1);
  
  const [selectedRider, setSelectedRider] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'wallet' | 'cash'
  
  // Backend Data States
  const [availableRides, setAvailableRides] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Endpoint Handler: Search Rides
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      // Note: In a real app, you would use Google Maps API to turn `whereTo` into lng/lat.
      // For this hackathon, we pass dummy coordinates to trigger the $near search.
      const lng = 77.2090; 
      const lat = 28.6139;

      const response = await axios.get(`${API_BASE_URL}/rides/search`, {
        params: { lng, lat, date: selectDate, radiusInKm: 10 },
        headers: { Authorization: `Bearer ${token}` }
      });

      // Map backend data to match frontend component props
      const mappedRides = response.data.rides.map(ride => ({
        id: ride._id, // MongoDB ID
        name: ride.driverId?.name || 'Driver',
        phone: ride.driverId?.phone || 'N/A',
        vehicle: ride.vehicleId?.vehicleModel || 'Standard Vehicle',
        route: `${ride.pickupLocation?.address || 'Pickup'} - ${ride.destination?.address || 'Drop'}`,
        price: ride.farePerSeat,
        rating: '4.8', // Mock rating
        eta: '5 mins', // Mock ETA 
      }));

      setAvailableRides(mappedRides);
      setFlowStep('riders_list');
    } catch (error) {
      alert(error.response?.data?.message || 'Error searching for rides.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectRider = (rider) => {
    setSelectedRider(rider);
    setFlowStep('active_eta');
  };

  // Endpoint Handler: Book Trip & Pay
  const handlePaySuccess = async () => {
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      
      if (!user) {
        alert("Please login first!");
        return;
      }

      // Format payment string to match backend Enum
      const backendPaymentMethod = paymentMethod === 'upi' ? 'UPI' : 
                                   paymentMethod === 'card' ? 'Card' : 
                                   paymentMethod === 'wallet' ? 'Wallet' : 'Cash';

      await axios.post(`${API_BASE_URL}/trips/book`, {
        rideId: selectedRider.id,
        passengerId: user._id,
        paymentMethod: backendPaymentMethod
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert(`🎉 Payment of ₹ ${selectedRider.price} Successful via ${paymentMethod.toUpperCase()}! Your seat is confirmed.`);
      setFlowStep('active_eta');
    } catch (error) {
      alert(error.response?.data?.message || 'Error processing booking. Please try again.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, position: 'relative', overflow: 'hidden' }}>
      
      {/* 1. TOP INTERACTIVE MAP VIEWPORT */}
      <div className={`map-viewport-container ${isMapExpanded ? 'expanded' : ''}`}>
        {/* Rapido Slide Toggle Button */}
        <button className="slide-map-toggle-btn" onClick={() => setIsMapExpanded(!isMapExpanded)}>
          {isMapExpanded ? '▼ Slide Down Sheet' : '▲ Full Interactive Map'}
        </button>

        <svg className="svg-map" viewBox="0 0 400 300">
          <line x1="40" y1="0" x2="40" y2="300" className="map-grid-line" />
          <line x1="120" y1="0" x2="120" y2="300" className="map-grid-line" />
          <line x1="200" y1="0" x2="200" y2="300" className="map-grid-line" />
          <line x1="280" y1="0" x2="280" y2="300" className="map-grid-line" />
          <line x1="360" y1="0" x2="360" y2="300" className="map-grid-line" />
          <line x1="0" y1="60" x2="400" y2="60" className="map-grid-line" />
          <line x1="0" y1="140" x2="400" y2="140" className="map-grid-line" />
          <line x1="0" y1="220" x2="400" y2="220" className="map-grid-line" />

          <line x1="50" y1="280" x2="350" y2="30" className="map-main-road" />
          <circle cx="230" cy="120" r="18" fill="none" stroke="#8eaa8a" strokeWidth="4" />

          {(flowStep === 'riders_list' || flowStep === 'active_eta' || flowStep === 'payment_page') && (
            <polyline points="120,240 230,120 280,60" fill="none" className="route-polyline" />
          )}

          <circle cx="120" cy="240" r="6" fill="#ef4444" />
          <circle cx="280" cy="60" r="6" fill="#0c3259" />
          <text x="285" y="55" fontSize="13">📍</text>
          <text x="180" y="160" fontSize="13">🚘</text>
          <text x="250" y="200" fontSize="13">🚘</text>
        </svg>
      </div>

      {/* 2. RAPIDO-STYLE SLIDING SHEET (OVERLAYED ON MAP) */}
      {!isMapExpanded && (
        <div className="rapido-sliding-sheet">

          {/* STEP A: SEARCH FORM */}
          {flowStep === 'search' && (
            <form onSubmit={handleSearchSubmit}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <BookRideIcon size={20} color="#0c3259" />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0c3259' }}>Where are you travelling?</h3>
              </div>

              <div className="input-pill-field">
                <LocationIcon size={18} color="#0c3259" />
                <input type="text" value={whereTo} onChange={(e) => setWhereTo(e.target.value)} placeholder="Enter destination..." required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '10px', marginBottom: '12px' }}>
                <div className="input-pill-field" style={{ marginBottom: 0 }}>
                  <CalendarIcon size={18} color="#0c3259" />
                  <input type="date" value={selectDate} onChange={(e) => setSelectDate(e.target.value)} required />
                </div>

                <div className="input-pill-field" style={{ marginBottom: 0, justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <UserIcon size={18} color="#0c3259" />
                    <span>{selectSeats} {selectSeats === 1 ? 'Seat' : 'Seats'}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button type="button" onClick={() => setSelectSeats(Math.max(1, selectSeats - 1))} style={{ border: '1px solid #d2cdbe', borderRadius: '4px', width: '22px', height: '22px', cursor: 'pointer', background: '#fff', fontWeight: 800 }}>-</button>
                    <button type="button" onClick={() => setSelectSeats(selectSeats + 1)} style={{ border: '1px solid #d2cdbe', borderRadius: '4px', width: '22px', height: '22px', cursor: 'pointer', background: '#fff', fontWeight: 800 }}>+</button>
                  </div>
                </div>
              </div>

              <button type="submit" disabled={isLoading} className="btn-navy-primary" style={{ width: '100%', padding: '16px', borderRadius: '28px', marginTop: '8px', opacity: isLoading ? 0.7 : 1 }}>
                <BookRideIcon size={18} color="#fff" />
                <span>{isLoading ? 'Searching...' : 'Find Available Rides'}</span>
              </button>
            </form>
          )}

          {/* STEP B: LIST OF RIDERS AVAILABLE */}
          {flowStep === 'riders_list' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0c3259' }}>📍 Available Rides Nearby</h3>
                <button onClick={() => setFlowStep('search')} style={{ background: 'none', border: 'none', color: '#0c3259', fontWeight: 800, cursor: 'pointer', fontSize: '0.85rem' }}>
                  ✏️ Edit Search
                </button>
              </div>

              {availableRides.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '20px', color: '#475569' }}>
                  No active rides found for this date.
                </div>
              ) : (
                availableRides.map(rider => (
                  <RideCard
                    key={rider.id}
                    name={rider.name}
                    route={rider.route}
                    price={rider.price}
                    rating={rider.rating}
                    vehicle={rider.vehicle}
                    buttonText="Book Now"
                    onAction={() => handleSelectRider(rider)}
                  />
                ))
              )}
            </div>
          )}

          {/* STEP C: ACTIVE RIDE ETA & CONTACT INFO */}
          {(flowStep === 'active_eta' || flowStep === 'payment_page') && selectedRider && (
            <div>
              <div className="eta-communication-bar">
                <div className="eta-title-text">⏰ Arriving in {selectedRider.eta}</div>
                
                <div style={{ marginTop: '12px', marginBottom: '4px' }}>
                  <ContactRiderBar 
                    riderName={selectedRider.name}
                    phoneNumber={selectedRider.phone}
                    callLabel="Call Rider"
                    smsLabel="SMS Rider"
                  />
                </div>
              </div>

              <div style={{ marginTop: '14px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#475569', marginBottom: '6px' }}>CONFIRMED RIDE CARD</div>
                <RideCard 
                  name={selectedRider.name}
                  route={selectedRider.route}
                  price={selectedRider.price}
                  rating={selectedRider.rating}
                  vehicle={selectedRider.vehicle}
                  buttonText={`Pay Fee ₹ ${selectedRider.price}`}
                  onAction={() => setFlowStep('payment_page')}
                />
              </div>

              <div className="beige-card" style={{ marginTop: '12px', background: '#fdfcf7' }}>
                <div style={{ fontSize: '0.78rem', color: '#475569', fontWeight: 800 }}>RIDE DIRECTION & VEHICLE</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0c3259', margin: '4px 0' }}>{selectedRider.route}</div>
                <div style={{ fontSize: '0.85rem', color: '#475569' }}>🚘 Vehicle: {selectedRider.vehicle} • Seats Reserved: {selectSeats}</div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', paddingTop: '12px', borderTop: '1px solid #dcd7c9' }}>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: '#475569' }}>Total Fee Amount</div>
                    <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0c3259' }}>₹ {selectedRider.price}.00</div>
                  </div>

                  <button className="btn-navy-primary" onClick={() => setFlowStep('payment_page')}>
                    💳 Proceed to Pay
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* 3. PAYMENT PAGE MODAL */}
      {flowStep === 'payment_page' && selectedRider && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(12, 50, 89, 0.4)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', zIndex: 100 }}>
          <div className="beige-card" style={{ width: '100%', maxWidth: '440px', background: '#fdfcf7', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <WalletIcon size={22} color="#0c3259" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0c3259' }}>Payment Page</h3>
              </div>
              <button onClick={() => setFlowStep('active_eta')} style={{ background: 'none', border: 'none', fontSize: '1.3rem', cursor: 'pointer', color: '#0c3259' }}>✕</button>
            </div>

            <div style={{ padding: '14px 18px', background: '#eae7dc', borderRadius: '14px', marginBottom: '18px' }}>
              <div style={{ fontSize: '0.82rem', color: '#475569' }}>Direction: <strong>{selectedRider.route}</strong></div>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0c3259', margin: '4px 0' }}>Amount: ₹ {selectedRider.price}.00</div>
              <div style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 800 }}>✓ Driver: {selectedRider.name}</div>
            </div>

            <h4 style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0c3259', marginBottom: '10px' }}>Select Payment Option</h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
              <button onClick={() => setPaymentMethod('upi')} style={{ padding: '12px', borderRadius: '12px', border: '1px solid #d2cdbe', background: paymentMethod === 'upi' ? '#0c3259' : '#e2ded2', color: paymentMethod === 'upi' ? '#fff' : '#475569', fontWeight: 800, fontSize: '0.85rem' }}>
                📲 UPI Apps
              </button>
              <button onClick={() => setPaymentMethod('card')} style={{ padding: '12px', borderRadius: '12px', border: '1px solid #d2cdbe', background: paymentMethod === 'card' ? '#0c3259' : '#e2ded2', color: paymentMethod === 'card' ? '#fff' : '#475569', fontWeight: 800, fontSize: '0.85rem' }}>
                💳 Cards
              </button>
              <button onClick={() => setPaymentMethod('wallet')} style={{ padding: '12px', borderRadius: '12px', border: '1px solid #d2cdbe', background: paymentMethod === 'wallet' ? '#0c3259' : '#e2ded2', color: paymentMethod === 'wallet' ? '#fff' : '#475569', fontWeight: 800, fontSize: '0.85rem' }}>
                👛 Wallet
              </button>
              <button onClick={() => setPaymentMethod('cash')} style={{ padding: '12px', borderRadius: '12px', border: '1px solid #d2cdbe', background: paymentMethod === 'cash' ? '#0c3259' : '#e2ded2', color: paymentMethod === 'cash' ? '#fff' : '#475569', fontWeight: 800, fontSize: '0.85rem' }}>
                💵 Cash
              </button>
            </div>

            <button className="btn-navy-primary" style={{ width: '100%', padding: '16px', borderRadius: '28px' }} onClick={handlePaySuccess}>
              Pay Now (₹ {selectedRider.price}.00)
            </button>
          </div>
        </div>
      )}

    </div>
  );
}