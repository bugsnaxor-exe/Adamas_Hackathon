import React, { useState } from 'react';

export default function OfferRide({ setActiveTab }) {
  const [pickup, setPickup] = useState('123 Willow Creek Dr.');
  const [destination, setDestination] = useState('Tech Campus, Bldg B');
  const [date, setDate] = useState('2024-05-20');
  const [time, setTime] = useState('08:00');
  const [seats, setSeats] = useState('3');
  const [fare, setFare] = useState('12.50');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Ride Published Successfully!');
    setActiveTab('trips');
  };

  return (
    <div className="cp-card-box" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 className="card-box-title" style={{ fontSize: '1.2rem', marginBottom: '16px' }}>🚗 Publish a Ride Offer</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>Select Registered Vehicle</label>
          <select style={{ width: '100%', padding: '12px', borderRadius: '10px', background: '#f8fafc', border: '1px solid #cbd5e1' }}>
            <option>Tesla Model 3 • White (XYZ-1234)</option>
            <option>Toyota Prius • Silver (ABC-9876)</option>
          </select>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>Pickup Location</label>
          <div className="cp-input-box">
            <span>📍</span>
            <input type="text" value={pickup} onChange={(e) => setPickup(e.target.value)} required />
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>Destination</label>
          <div className="cp-input-box">
            <span>🏁</span>
            <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} required />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>Date</label>
            <input className="cp-input-box" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>

          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>Time</label>
            <input className="cp-input-box" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>Seats Available</label>
            <input className="cp-input-box" type="number" min="1" max="6" value={seats} onChange={(e) => setSeats(e.target.value)} required />
          </div>

          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>Fare Per Seat ($)</label>
            <input className="cp-input-box" type="number" min="1" value={fare} onChange={(e) => setFare(e.target.value)} required />
          </div>
        </div>

        <button type="submit" className="btn-primary-indigo" style={{ width: '100%', padding: '14px', borderRadius: '12px' }}>
          Publish Ride
        </button>
      </form>
    </div>
  );
}
