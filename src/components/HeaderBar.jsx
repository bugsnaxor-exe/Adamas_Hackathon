import React from 'react';

export default function HeaderBar({ userName, onOpenProfile }) {
  return (
    <header className="top-header-bar">
      <div className="user-name-title">
        Hello, <strong>{userName || 'Alex'}</strong>
      </div>

      <button className="profile-avatar-btn" onClick={onOpenProfile} title="Profile & Wallet Settings" aria-label="Open Profile">
        <span>👤</span>
      </button>
    </header>
  );
}
