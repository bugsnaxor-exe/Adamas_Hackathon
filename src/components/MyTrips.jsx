import React from 'react';

export default function MyTrips() {
  return (
    <div className="map-canvas-container" style={{ height: '100%', minHeight: '620px' }}>
      <div className="map-control-widgets">
        <div className="map-control-btn">🎯</div>
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
        <text x="612" y="131" fill="#fff" fontSize="12" fontWeight="800">HQ - Building A</text>
      </svg>

      {/* Bottom Drawer Overlay */}
      <div style={{ position: 'absolute', bottom: '24px', left: '24px', background: '#ffffff', borderRadius: '16px', padding: '18px 24px', width: '320px', boxShadow: 'var(--shadow-dropdown)', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>Sarah Jenkins</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ background: '#eeebfe', border: 'none', width: '32px', height: '32px', borderRadius: '50%', color: '#4f46e5', cursor: 'pointer' }} onClick={() => alert('Opening Chat...')}>💬</button>
            <button style={{ background: '#4f46e5', border: 'none', width: '32px', height: '32px', borderRadius: '50%', color: '#fff', cursor: 'pointer' }} onClick={() => alert('Calling Driver...')}>📞</button>
          </div>
        </div>

        <div style={{ fontSize: '0.82rem', color: '#64748b' }}>🚗 Toyota Camry, White XYZ-1234</div>
      </div>

      {/* Safety / SOS Button */}
      <button className="btn-sos-danger" onClick={() => alert('Emergency SOS Alert Sent to Company Security!')}>
        <span>📍</span> <span>Safety / SOS</span>
      </button>
    </div>
  );
}
