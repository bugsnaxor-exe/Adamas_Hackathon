import React, { useState } from 'react';
import RideCard from './RideCard';
import ContactRiderBar from './ContactRiderBar';
import { UserIcon, WalletIcon } from './Icons';

export default function ProfileDrawer({ userName, onClose, onSignOut }) {
  const [profileTab, setProfileTab] = useState('history'); // 'history' | 'vehicles' | 'wallet'
  
  // Wallet Recharge State
  const [walletBalance, setWalletBalance] = useState(1250);
  const [rechargeAmount, setRechargeAmount] = useState('500');
  const [rechargeMethod, setRechargeMethod] = useState('upi'); // 'upi' | 'card'

  const handleRecharge = (e) => {
    e.preventDefault();
    const val = parseFloat(rechargeAmount);
    if (isNaN(val) || val <= 0) return;
    setWalletBalance(prev => prev + val);
    alert(`🎉 Wallet successfully recharged with ₹ ${val}!`);
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(12, 50, 89, 0.4)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'flex-end', zIndex: 100 }}>
      <div style={{ width: '100%', maxWidth: '440px', background: '#fdfcf7', height: '100%', display: 'flex', flexDirection: 'column', padding: '24px', boxShadow: 'var(--shadow-floating)', overflowY: 'auto' }}>
        
        {/* Profile Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #dcd7c9' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div className="profile-avatar-btn" style={{ cursor: 'default' }}>👤</div>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0c3259' }}>{userName}</div>
              <div style={{ fontSize: '0.8rem', color: '#475569' }}>Verified Commuter</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#0c3259' }}>✕</button>
        </div>

        {/* Profile Navigation Sub-Tabs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '20px' }}>
          <button onClick={() => setProfileTab('history')} style={{ padding: '10px', borderRadius: '10px', border: '1px solid #d2cdbe', background: profileTab === 'history' ? '#0c3259' : '#e2ded2', color: profileTab === 'history' ? '#fff' : '#475569', fontWeight: 800, fontSize: '0.78rem' }}>
            📜 Ride History
          </button>
          <button onClick={() => setProfileTab('vehicles')} style={{ padding: '10px', borderRadius: '10px', border: '1px solid #d2cdbe', background: profileTab === 'vehicles' ? '#0c3259' : '#e2ded2', color: profileTab === 'vehicles' ? '#fff' : '#475569', fontWeight: 800, fontSize: '0.78rem' }}>
            🚘 My Vehicle
          </button>
          <button onClick={() => setProfileTab('wallet')} style={{ padding: '10px', borderRadius: '10px', border: '1px solid #d2cdbe', background: profileTab === 'wallet' ? '#0c3259' : '#e2ded2', color: profileTab === 'wallet' ? '#fff' : '#475569', fontWeight: 800, fontSize: '0.78rem' }}>
            👛 Wallet
          </button>
        </div>

        {/* 1. RIDE HISTORY TAB (Using Image 1 Card Shape) */}
        {profileTab === 'history' && (
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0c3259', marginBottom: '14px' }}>Booked Ride History</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10b981', marginBottom: '4px' }}>COMPLETED • YESTERDAY</div>
                <RideCard 
                  name="Raju Paul"
                  route="B16 - AIIMS"
                  price={80}
                  rating="4.9"
                  vehicle="Maruti WagonR"
                  buttonText="Receipt"
                  onAction={() => alert('Viewing receipt for trip #CP-9041')}
                />
                <div style={{ marginTop: '8px' }}>
                  <ContactRiderBar riderName="Raju Paul" />
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10b981', marginBottom: '4px' }}>COMPLETED • AUG 05, 2026</div>
                <RideCard 
                  name="Amit Roy"
                  route="Sector V - AIIMS"
                  price={75}
                  rating="4.8"
                  vehicle="Hyundai i10"
                  buttonText="Receipt"
                  onAction={() => alert('Viewing receipt for trip #CP-8842')}
                />
              </div>
            </div>
          </div>
        )}

        {/* 2. MY VEHICLE TAB */}
        {profileTab === 'vehicles' && (
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0c3259', marginBottom: '14px' }}>Registered Vehicles</h3>

            <div className="beige-card" style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '1.05rem', fontWeight: 800 }}>🚘 Tesla Model 3 • White</div>
              <div style={{ fontSize: '0.85rem', color: '#475569', marginTop: '4px' }}>Plate: WB02AB1234 • DL: DL-9048123</div>
              <span style={{ display: 'inline-block', marginTop: '8px', background: '#0c3259', color: '#fff', fontSize: '0.72rem', fontWeight: 800, padding: '4px 10px', borderRadius: '6px' }}>Primary Vehicle</span>
            </div>
          </div>
        )}

        {/* 3. WALLET RECHARGE TAB */}
        {profileTab === 'wallet' && (
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0c3259', marginBottom: '12px' }}>Wallet Balance</h3>
            
            <div style={{ background: '#0c3259', color: '#ffffff', padding: '20px', borderRadius: '16px', marginBottom: '20px' }}>
              <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>Available Credits</div>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#a7f3d0', margin: '4px 0' }}>₹ {walletBalance}.00</div>
            </div>

            <form onSubmit={handleRecharge}>
              <label style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0c3259', display: 'block', marginBottom: '6px' }}>Enter Amount to Recharge (₹)</label>
              <div className="input-pill-field">
                <span>₹</span>
                <input type="number" min="10" placeholder="Enter amount..." value={rechargeAmount} onChange={(e) => setRechargeAmount(e.target.value)} required />
              </div>

              <label style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0c3259', display: 'block', marginBottom: '6px', marginTop: '12px' }}>Payment Method Options</label>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                <button type="button" onClick={() => setRechargeMethod('upi')} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid #d2cdbe', background: rechargeMethod === 'upi' ? '#0c3259' : '#e2ded2', color: rechargeMethod === 'upi' ? '#fff' : '#475569', fontWeight: 800, fontSize: '0.82rem' }}>
                  📲 UPI Apps
                </button>
                <button type="button" onClick={() => setRechargeMethod('card')} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid #d2cdbe', background: rechargeMethod === 'card' ? '#0c3259' : '#e2ded2', color: rechargeMethod === 'card' ? '#fff' : '#475569', fontWeight: 800, fontSize: '0.82rem' }}>
                  💳 Cards
                </button>
              </div>

              <button type="submit" className="btn-navy-primary" style={{ width: '100%', padding: '14px' }}>
                Recharge Wallet
              </button>
            </form>
          </div>
        )}

        {/* Sign Out Button */}
        <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #dcd7c9' }}>
          <button onClick={onSignOut} style={{ width: '100%', padding: '12px', background: '#ffe4e6', color: '#ef4444', border: '1px solid #fecdd3', borderRadius: '12px', fontWeight: 800, cursor: 'pointer' }}>
            🚪 Sign Out of Account
          </button>
        </div>

      </div>
    </div>
  );
}
