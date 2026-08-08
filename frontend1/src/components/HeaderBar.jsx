import React, { useState, useEffect } from 'react';

export default function HeaderBar({ userName, onOpenProfile }) {
  const [storedName, setStoredName] = useState('');

  // Fetch the logged-in user's name from localStorage on component mount
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        // Extract the first name for a friendly greeting
        const firstName = user.name ? user.name.split(' ')[0] : '';
        setStoredName(firstName);
      } catch (err) {
        console.error('Failed to parse user data from localStorage', err);
      }
    }
  }, []);

  // Prioritize the passed prop, fallback to localStorage, then default to 'User'
  const displayName = userName || storedName || 'User';

  return (
    <header className="top-header-bar">
      <div className="user-name-title">
        Hello, <strong>{displayName}</strong>
      </div>

      <button 
        className="profile-avatar-btn" 
        onClick={onOpenProfile} 
        title="Profile & Wallet Settings" 
        aria-label="Open Profile"
      >
        <span>👤</span>
      </button>
    </header>
  );
}