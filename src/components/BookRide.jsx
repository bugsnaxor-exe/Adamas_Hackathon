import React, { useState } from 'react';
import RideCard from './RideCard';
import ContactRiderBar from './ContactRiderBar';
import { LocationIcon, CalendarIcon, UserIcon, WalletIcon, BookRideIcon } from './Icons';

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

  // Mock Available Riders List (Using Image 1 details like Raju Paul, B16 - AIIMS, ₹ 80/seat)
  const mockRiders = [
    { 
      id: 1, 
      name: 'Raju Paul', 
      rating: '4.9', 
      vehicle: 'Maruti WagonR', 
      route: 'B16 - AIIMS', 
      price: 80, 
      eta: '2 mins',
      phone: '+91 98310 12345'
    },
    { 
      id: 2, 
      name: 'Amit Roy', 
      rating: '4.8', 
      vehicle: 'Hyundai i10', 
      route: 'B16 - AIIMS', 
      price: 75, 
      eta: '4 mins',
      phone: '+91 98311 67890'
    },
    { 
      id: 3, 
      name: 'Priya Sharma', 
      rating: '5.0', 
      vehicle: 'Honda City', 
      route: 'Sector V - AIIMS', 
      price: 90, 
      eta: '6 mins',
      phone: '+91 98312 34567'
    }
  ];

  const handleSelectRider = (rider) => {
    setSelectedRider(rider);
    setFlowStep('active_eta');
  };

  const handlePaySuccess = () => {
    alert(`🎉 Payment of ₹ ${selectedRider ? selectedRider.price : 80} Successful via ${paymentMethod.toUpperCase()}! Your seat is confirmed.`);
    setFlowStep('active_eta');
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
            <form onSubmit={(e) => { e.preventDefault(); setFlowStep('riders_list'); }}>
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

              <button type="submit" className="btn-navy-primary" style={{ width: '100%', padding: '16px', borderRadius: '28px', marginTop: '8px' }}>
                <BookRideIcon size={18} color="#fff" />
                <span>Find Available Rides</span>
              </button>
            </form>
          )}

          {/* STEP B: LIST OF RIDERS AVAILABLE (Image 1 Card Layout) */}
          {flowStep === 'riders_list' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0c3259' }}>📍 Available Rides Nearby</h3>
                <button onClick={() => setFlowStep('search')} style={{ background: 'none', border: 'none', color: '#0c3259', fontWeight: 800, cursor: 'pointer', fontSize: '0.85rem' }}>
                  ✏️ Edit Search
                </button>
              </div>

              {/* Renders RideCard matching Image 1 layout exactly */}
              {mockRiders.map(rider => (
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
              ))}
            </div>
          )}

          {/* STEP C: ACTIVE RIDE ETA & IMAGE 3 CALL/SMS PILL BAR */}
          {(flowStep === 'active_eta' || flowStep === 'payment_page') && selectedRider && (
            <div>
              {/* ETA Bar & Image 3 Contact Pill Control */}
              <div className="eta-communication-bar">
                <div className="eta-title-text">⏰ Arriving in {selectedRider.eta}</div>
                
                {/* Image 3 Split Pill Bar Component */}
                <div style={{ marginTop: '12px', marginBottom: '4px' }}>
                  <ContactRiderBar 
                    riderName={selectedRider.name}
                    phoneNumber={selectedRider.phone}
                    callLabel="Call Rider"
                    smsLabel="SMS Rider"
                  />
                </div>
              </div>

              {/* Ride Details Card matching Image 1 shape */}
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

              {/* Detailed Breakdown Card */}
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
