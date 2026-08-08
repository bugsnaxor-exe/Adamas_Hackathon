import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RideCard from './RideCard';
import ContactRiderBar from './ContactRiderBar';
import { OfferRideIcon, LocationIcon, CalendarIcon, UserIcon, CheckIcon } from './Icons';

const API_BASE_URL = 'http://localhost:5000/api';

export default function OfferRide() {
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [isListed, setIsListed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // User & Vehicle State from Backend
  const [user, setUser] = useState(null);
  const [vehicleId, setVehicleId] = useState(null);

  // Form Fields
  const [whereTo, setWhereTo] = useState('B16 - AIIMS');
  // Use today's date as default
  const [offerDate, setOfferDate] = useState(new Date().toISOString().split('T')[0]);
  const [offerSeats, setOfferSeats] = useState(3);
  const [seatPrice, setSeatPrice] = useState('80');

  // Auto-Fetched Vehicle Registration Data State
  const [vehRegNo, setVehRegNo] = useState('WB02AB1234');
  const [ownerDetails, setOwnerDetails] = useState('Loading...');
  const [vehicleName, setVehicleName] = useState('Loading...');
  const [licenseNo, setLicenseNo] = useState('DL-90481239084');

  // Popups State (For Demo Flow)
  const [showCommuterPopup, setShowCommuterPopup] = useState(false);
  const [showPaymentReceivedPopup, setShowPaymentReceivedPopup] = useState(false);

  // Fetch the user's registered vehicle from the backend when the page loads
  useEffect(() => {
    const fetchUserData = async () => {
      const userStr = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      
      if (userStr && token) {
        const userData = JSON.parse(userStr);
        setUser(userData);
        setOwnerDetails(`${userData.name}`);

        try {
          // Fetch driver's vehicles
          const res = await axios.get(`${API_BASE_URL}/vehicles/user/${userData._id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          if (res.data.vehicles && res.data.vehicles.length > 0) {
            const myVehicle = res.data.vehicles[0]; // Use their first registered vehicle
            setVehicleId(myVehicle._id);
            setVehRegNo(myVehicle.registrationNumber);
            setVehicleName(`${myVehicle.vehicleModel}`);
          } else {
            setVehicleName('No vehicle found. Please register one.');
          }
        } catch (error) {
          console.error("Error fetching vehicle:", error);
        }
      }
    };
    fetchUserData();
  }, []);

  // Post the ride to the backend
  const handleListNow = async (e) => {
    e.preventDefault();
    
    if (!user || !vehicleId) {
      alert("You need to be logged in and have a registered vehicle to offer a ride.");
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      
      // Sending data to your ride.controller.js
      await axios.post(`${API_BASE_URL}/rides`, {
        driverId: user._id,
        vehicleId: vehicleId,
        pickupCoords: [77.2090, 28.6139], // Mock coordinates for HQ
        pickupAddress: 'Company HQ - Main Gate',
        destCoords: [77.2500, 28.6500], // Mock coordinates for destination
        destAddress: whereTo,
        travelDateTime: offerDate, 
        totalSeats: offerSeats,
        farePerSeat: Number(seatPrice)
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setIsListed(true);
      
      // Simulate commuter popup appearing (Great for hackathon pitch!)
      // In a real app, this would be triggered by a Socket.io event.
      setTimeout(() => {
        setShowCommuterPopup(true);
      }, 3500);

    } catch (error) {
      alert(error.response?.data?.message || 'Error publishing ride.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptCommuter = () => {
    setShowCommuterPopup(false);
    // Simulate payment received popup
    setTimeout(() => {
      setShowPaymentReceivedPopup(true);
    }, 1500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, position: 'relative', overflow: 'hidden' }}>
      
      {/* 1. TOP INTERACTIVE MAP VIEWPORT */}
      <div className={`map-viewport-container ${isMapExpanded ? 'expanded' : ''}`}>
        <button className="slide-map-toggle-btn" onClick={() => setIsMapExpanded(!isMapExpanded)}>
          {isMapExpanded ? '▼ Slide Down Sheet' : '▲ Full Interactive Map'}
        </button>

        <svg className="svg-map" viewBox="0 0 400 300">
          <line x1="40" y1="0" x2="40" y2="300" className="map-grid-line" />
          <line x1="120" y1="0" x2="120" y2="300" className="map-grid-line" />
          <line x1="200" y1="0" x2="200" y2="300" className="map-grid-line" />
          <line x1="280" y1="0" x2="280" y2="300" className="map-grid-line" />

          <line x1="50" y1="280" x2="350" y2="30" className="map-main-road" />

          {/* Highlighted Listed Route */}
          {isListed && (
            <polyline points="80,260 200,140 320,50" fill="none" stroke="#0c3259" strokeWidth="6" strokeLinecap="round" />
          )}

          <circle cx="80" cy="260" r="6" fill="#10b981" />
          <circle cx="320" cy="50" r="6" fill="#ef4444" />
          <text x="325" y="45" fontSize="13">🚘</text>
        </svg>
      </div>

      {/* 2. RAPIDO-STYLE SLIDING SHEET FOR OFFER RIDE */}
      {!isMapExpanded && (
        <div className="rapido-sliding-sheet">
          {!isListed ? (
            <form onSubmit={handleListNow}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <OfferRideIcon size={22} color="#0c3259" />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0c3259' }}>Offer a Commute Ride</h3>
              </div>

              <div className="input-pill-field">
                <LocationIcon size={18} color="#0c3259" />
                <input type="text" value={whereTo} onChange={(e) => setWhereTo(e.target.value)} placeholder="Where are you heading..." required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                <div className="input-pill-field" style={{ marginBottom: 0 }}>
                  <CalendarIcon size={18} color="#0c3259" />
                  <input type="date" value={offerDate} onChange={(e) => setOfferDate(e.target.value)} required />
                </div>

                <div className="input-pill-field" style={{ marginBottom: 0, justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <UserIcon size={18} color="#0c3259" />
                    <span>{offerSeats} Seats</span>
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button type="button" onClick={() => setOfferSeats(Math.max(1, offerSeats - 1))} style={{ border: '1px solid #d2cdbe', borderRadius: '4px', width: '22px', height: '22px', cursor: 'pointer', background: '#fff', fontWeight: 800 }}>-</button>
                    <button type="button" onClick={() => setOfferSeats(offerSeats + 1)} style={{ border: '1px solid #d2cdbe', borderRadius: '4px', width: '22px', height: '22px', cursor: 'pointer', background: '#fff', fontWeight: 800 }}>+</button>
                  </div>
                </div>
              </div>

              <div className="input-pill-field">
                <span>🏷️ Price per seat (₹):</span>
                <input type="number" value={seatPrice} onChange={(e) => setSeatPrice(e.target.value)} placeholder="Set price for one seat..." required />
              </div>

              {/* READ-ONLY AUTO-FETCHED VEHICLE DETAILS */}
              <div className="beige-card" style={{ padding: '14px 18px', margin: '10px 0 16px 0', background: '#fdfcf7' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10b981', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CheckIcon size={14} color="#10b981" />
                  <span>YOUR REGISTERED VEHICLE</span>
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 800 }}>🚘 {vehicleName}</div>
                <div style={{ fontSize: '0.82rem', color: '#475569' }}>📍 Reg No: {vehRegNo}</div>
                <div style={{ fontSize: '0.82rem', color: '#475569' }}>👤 Driver: {ownerDetails}</div>
              </div>

              <button type="submit" disabled={isLoading} className="btn-navy-primary" style={{ width: '100%', padding: '16px', borderRadius: '28px', opacity: isLoading ? 0.7 : 1 }}>
                <OfferRideIcon size={20} color="#fff" />
                <span>{isLoading ? 'Publishing...' : 'List Ride Now'}</span>
              </button>
            </form>
          ) : (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0c3259' }}>🚗 Your Offered Ride is Live</div>
                <button onClick={() => setIsListed(false)} style={{ background: 'none', border: 'none', color: '#ef4444', fontWeight: 800, cursor: 'pointer', fontSize: '0.85rem' }}>Cancel Listing</button>
              </div>

              {/* Image 1 Card Shape for Active Offered Ride */}
              <RideCard 
                name={`${user?.name} (You)`}
                route={whereTo}
                price={seatPrice}
                rating="5.0"
                vehicle={vehicleName}
                buttonText="Live Listing"
                tag={`${offerSeats} Seats Available`}
                onAction={() => alert('Your offered ride is active and visible to others!')}
              />
            </div>
          )}

          {/* LIVE POPUP 1: A COMMUTER NEARBY (Simulated for Demo) */}
          {showCommuterPopup && (
            <div className="live-commuter-popup">
              <h4 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0c3259', marginBottom: '4px' }}>🙋‍♂️ Commuter Requested Ride</h4>
              <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '12px' }}>Sarah Jenkins requested 1 seat for <strong>{whereTo}</strong>.</p>
              
              {/* Image 3 Split Call & SMS Pill Control */}
              <div style={{ marginBottom: '14px' }}>
                <ContactRiderBar 
                  riderName="Sarah Jenkins"
                  phoneNumber="+91 98765 11223"
                  callLabel="Call Commuter"
                  smsLabel="SMS Commuter"
                />
              </div>

              <button className="btn-navy-primary" style={{ width: '100%', padding: '14px', borderRadius: '24px' }} onClick={handleAcceptCommuter}>
                Accept Request (₹ {seatPrice})
              </button>
            </div>
          )}

          {/* LIVE POPUP 2: MONEY RECEIVED (Simulated for Demo) */}
          {showPaymentReceivedPopup && (
            <div className="live-commuter-popup" style={{ borderColor: '#10b981', background: '#f0fdf4' }}>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#10b981', marginBottom: '6px' }}>💰 Money Received ₹ {seatPrice}.00</h4>
              <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '14px' }}>Fare payment credited directly to your wallet balance.</p>
              
              <button className="btn-navy-primary" style={{ width: '100%', padding: '12px', background: '#10b981' }} onClick={() => setShowPaymentReceivedPopup(false)}>
                ✓ Done
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
}