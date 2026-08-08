import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export default function Wallet() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [rechargeAmount, setRechargeAmount] = useState(500); // Default ₹500
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Fetch Wallet Data on mount
  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');

        if (!token || !userStr) {
          setIsLoading(false);
          return;
        }

        const userData = JSON.parse(userStr);
        setUser(userData);

        const response = await axios.get(`${API_BASE_URL}/wallet/${userData._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setBalance(response.data.balance || 0);
        setTransactions(response.data.transactions || []);
      } catch (error) {
        console.error('Error fetching wallet:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWallet();
  }, []);

  // Utility to load the Razorpay SDK script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Trigger Razorpay Checkout
  const handleTopup = async () => {
    if (rechargeAmount < 10) {
      alert('Minimum recharge amount is ₹10');
      return;
    }

    const res = await loadRazorpayScript();
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    // Razorpay Configuration Options
    const options = {
      key: 'rzp_test_YOUR_TEST_KEY', // Replace with your actual Razorpay Test Key if you have one, or leave as placeholder for UI demo
      amount: rechargeAmount * 100, // Razorpay works in paise (multiply by 100)
      currency: 'INR',
      name: 'CommutePlus Enterprise',
      description: 'Wallet Recharge',
      image: 'https://ui-avatars.com/api/?name=CP&background=0c3259&color=ffffff', // Placeholder logo
      handler: async function (response) {
        // This function runs when the payment is SUCCESSFUL
        try {
          const token = localStorage.getItem('token');
          
          // Send to your backend wallet.controller.js
          const backendRes = await axios.post(`${API_BASE_URL}/wallet/recharge`, {
            userId: user._id,
            amount: rechargeAmount,
            paymentMethod: 'Razorpay'
          }, {
            headers: { Authorization: `Bearer ${token}` }
          });

          // Instantly update UI with the new balance and the new transaction
          setBalance(backendRes.data.newBalance);
          setTransactions([backendRes.data.transaction, ...transactions]);
          
          alert(`🎉 Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        } catch (error) {
          alert('Payment succeeded in Razorpay, but failed to update backend. Please contact support.');
        }
      },
      prefill: {
        name: user?.name || 'Commuter',
        email: user?.email || 'commuter@enterprise.com',
      },
      theme: {
        color: '#4f46e5' // Match your brand Indigo
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="cp-card-box" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 className="card-box-title" style={{ fontSize: '1.2rem', marginBottom: '16px' }}>💳 Enterprise Mobility Wallet</h2>

      {/* Balance Card */}
      <div style={{ background: 'linear-gradient(135deg, #4f46e5, #3730a3)', color: '#ffffff', padding: '28px', borderRadius: '16px', marginBottom: '20px' }}>
        <div style={{ fontSize: '0.88rem', color: '#c7d2fe' }}>Available Balance</div>
        <div style={{ fontSize: '2.5rem', fontWeight: 900, margin: '8px 0' }}>
          ₹ {isLoading ? '...' : balance.toFixed(2)}
        </div>
        <div style={{ fontSize: '0.8rem', color: '#a5b4fc' }}>Corporate Commute Subsidy Enabled</div>
      </div>

      {/* Top-up Form */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <div className="cp-input-box" style={{ flex: 1, marginBottom: 0 }}>
          <span style={{ fontWeight: 800 }}>₹</span>
          <input 
            type="number" 
            min="10" 
            value={rechargeAmount} 
            onChange={(e) => setRechargeAmount(Number(e.target.value))} 
            placeholder="Amount to add"
          />
        </div>
        <button 
          className="btn-primary-indigo" 
          style={{ padding: '0 24px', borderRadius: '12px' }} 
          onClick={handleTopup}
          disabled={isLoading}
        >
          Add Funds
        </button>
      </div>

      {/* Recent Transactions Ledger */}
      <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>Recent Transactions</h3>
        
        {isLoading ? (
          <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Loading ledger...</div>
        ) : transactions.length === 0 ? (
          <div style={{ color: '#64748b', fontSize: '0.9rem' }}>No transactions found.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {transactions.map((tx) => {
              const isCredit = tx.transactionType === 'Credit';
              const dateObj = new Date(tx.createdAt);
              const dateStr = dateObj.toLocaleDateString([], { month: 'short', day: 'numeric' });
              
              return (
                <div key={tx._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#f8fafc', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: isCredit ? '#d1fae5' : '#fee2e2', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.1rem' }}>
                      {isCredit ? '↓' : '↑'}
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a' }}>{tx.description}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{dateStr} • {tx.paymentMethod}</div>
                    </div>
                  </div>
                  <div style={{ fontWeight: 800, color: isCredit ? '#059669' : '#ef4444' }}>
                    {isCredit ? '+' : '-'} ₹{tx.amount.toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}