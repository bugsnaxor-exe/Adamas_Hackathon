import React, { useState } from 'react';

export default function Vehicles() {
  const [vehiclesList, setVehiclesList] = useState([
    { id: 1, model: 'Tesla Model 3', plate: 'XYZ-1234', color: 'White', capacity: '4 Seats', primary: true },
    { id: 2, model: 'Toyota Prius', plate: 'ABC-9876', color: 'Silver', capacity: '4 Seats', primary: false }
  ]);

  const [model, setModel] = useState('');
  const [plate, setPlate] = useState('');

  const handleAddVehicle = (e) => {
    e.preventDefault();
    if (!model || !plate) return;
    setVehiclesList([...vehiclesList, {
      id: Date.now(),
      model: model,
      plate: plate,
      color: 'Black',
      capacity: '4 Seats',
      primary: false
    }]);
    setModel('');
    setPlate('');
    alert('Vehicle registered successfully!');
  };

  return (
    <div className="cp-card-box" style={{ maxWidth: '650px', margin: '0 auto' }}>
      <h2 className="card-box-title" style={{ fontSize: '1.2rem', marginBottom: '16px' }}>🚘 Vehicle Fleet Management</h2>

      {vehiclesList.map(v => (
        <div key={v.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '12px' }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.98rem', color: '#0f172a' }}>{v.model} ({v.color})</div>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Plate: {v.plate} • {v.capacity}</div>
          </div>
          {v.primary && <span className="status-badge-purple">Primary</span>}
        </div>
      ))}

      <form onSubmit={handleAddVehicle} style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '12px' }}>Register New Vehicle</h4>
        <div className="cp-input-box" style={{ marginBottom: '12px' }}>
          <span>🚗</span>
          <input type="text" placeholder="Vehicle Model..." value={model} onChange={(e) => setModel(e.target.value)} required />
        </div>
        <div className="cp-input-box" style={{ marginBottom: '16px' }}>
          <span>🔢</span>
          <input type="text" placeholder="License Plate Number..." value={plate} onChange={(e) => setPlate(e.target.value)} required />
        </div>
        <button type="submit" className="btn-primary-indigo" style={{ width: '100%', padding: '12px' }}>
          Register Vehicle
        </button>
      </form>
    </div>
  );
}
