import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export default function Vehicles() {
  const [vehiclesList, setVehiclesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form States
  const [model, setModel] = useState('');
  const [plate, setPlate] = useState('');
  const [capacity, setCapacity] = useState(4); // Default to 4 seats

  // Fetch user's vehicles on component mount
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');

        if (!token || !userStr) {
          setIsLoading(false);
          return;
        }

        const user = JSON.parse(userStr);
        const response = await axios.get(`${API_BASE_URL}/vehicles/user/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setVehiclesList(response.data.vehicles || []);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  // Post new vehicle to backend
  const handleAddVehicle = async (e) => {
    e.preventDefault();
    if (!model || !plate || capacity < 1) return;

    try {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      
      if (!token || !userStr) {
        alert("Please login first!");
        return;
      }
      
      const user = JSON.parse(userStr);

      const response = await axios.post(`${API_BASE_URL}/vehicles`, {
        ownerId: user._id,
        vehicleModel: model,
        registrationNumber: plate,
        seatingCapacity: Number(capacity)
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Add the newly created vehicle from the database to our local state so the UI updates instantly
      setVehiclesList([response.data.vehicle, ...vehiclesList]);
      
      // Clear form
      setModel('');
      setPlate('');
      setCapacity(4);
      alert('🎉 Vehicle registered successfully!');

    } catch (error) {
      alert(error.response?.data?.message || 'Error registering vehicle. Please try again.');
    }
  };

  return (
    <div className="cp-card-box" style={{ maxWidth: '650px', margin: '0 auto' }}>
      <h2 className="card-box-title" style={{ fontSize: '1.2rem', marginBottom: '16px' }}>🚘 Vehicle Fleet Management</h2>

      {isLoading ? (
        <div style={{ textAlign: 'center', color: '#64748b', padding: '20px' }}>Loading vehicles...</div>
      ) : vehiclesList.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#64748b', padding: '20px', background: '#f8fafc', borderRadius: '12px' }}>
          No vehicles registered yet. Add your first vehicle below!
        </div>
      ) : (
        vehiclesList.map((v, index) => (
          <div key={v._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '12px' }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.98rem', color: '#0f172a' }}>{v.vehicleModel}</div>
              <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                Plate: {v.registrationNumber} • {v.seatingCapacity} Seats
              </div>
            </div>
            {/* The first registered vehicle gets the Primary badge */}
            {index === 0 && <span className="status-badge-purple">Primary</span>}
          </div>
        ))
      )}

      <form onSubmit={handleAddVehicle} style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '12px' }}>Register New Vehicle</h4>
        
        <div className="cp-input-box" style={{ marginBottom: '12px' }}>
          <span>🚗</span>
          <input type="text" placeholder="Vehicle Model (e.g., Hyundai i20)..." value={model} onChange={(e) => setModel(e.target.value)} required />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '10px', marginBottom: '16px' }}>
          <div className="cp-input-box">
            <span>🔢</span>
            <input type="text" placeholder="License Plate Number..." value={plate} onChange={(e) => setPlate(e.target.value)} required />
          </div>
          
          <div className="cp-input-box">
            <span>💺</span>
            <input type="number" min="1" placeholder="Seats..." value={capacity} onChange={(e) => setCapacity(e.target.value)} required title="Passenger Capacity" />
          </div>
        </div>

        <button type="submit" className="btn-primary-indigo" style={{ width: '100%', padding: '12px' }}>
          Register Vehicle
        </button>
      </form>
    </div>
  );
}