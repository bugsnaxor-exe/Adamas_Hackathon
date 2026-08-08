import React, { useState } from 'react';

export default function Wallet() {
  const [balance, setBalance] = useState(128.00);

  const handleTopup = () => {
    setBalance(prev => prev + 50.00);
    alert('$50.00 added to Enterprise Wallet!');
  };

  return (
    <div className="cp-card-box" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 className="card-box-title" style={{ fontSize: '1.2rem', marginBottom: '16px' }}>💳 Enterprise Mobility Wallet</h2>

      <div style={{ background: 'linear-gradient(135deg, #4f46e5, #3730a3)', color: '#ffffff', padding: '28px', borderRadius: '16px', marginBottom: '20px' }}>
        <div style={{ fontSize: '0.88rem', color: '#c7d2fe' }}>Available Balance</div>
        <div style={{ fontSize: '2.5rem', fontWeight: 900, margin: '8px 0' }}>${balance.toFixed(2)}</div>
        <div style={{ fontSize: '0.8rem', color: '#a5b4fc' }}>Corporate Commute Subsidy Enabled</div>
      </div>

      <button className="btn-primary-indigo" style={{ width: '100%', padding: '14px', borderRadius: '12px' }} onClick={handleTopup}>
        + Top-up Wallet $50.00 (Razorpay Sandbox)
      </button>
    </div>
  );
}
