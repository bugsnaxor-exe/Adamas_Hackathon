import React from 'react';
import { StarIcon } from './Icons';

/**
 * Image 1 Component: Ride Card Shape
 * Used across the app wherever ride listings, search results, or offer details are displayed.
 * Layout: Left square avatar box | Middle details (Name, Route, Price) | Right action button
 */
export default function RideCard({
  avatarUrl,
  name = 'Raju Paul',
  route = 'B16 - AIIMS',
  price = 80,
  rating = '4.9',
  vehicle = 'Maruti WagonR',
  buttonText = 'Book Now',
  onAction,
  showContact = false,
  onCall,
  onSms,
  tag = '',
  className = ''
}) {
  // Generate avatar initials or placeholder color
  const initials = name ? name.split(' ').map(n => n[0]).join('').substring(0, 2) : 'RP';

  return (
    <div className={`custom-ride-card ${className}`}>
      {/* 1. Left Thumbnail Box */}
      <div className="ride-card-avatar-box">
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} className="avatar-img" />
        ) : (
          <div className="avatar-placeholder-inner">
            {/* Soft Gray Square Avatar with User/Car graphic */}
            <span className="avatar-emoji">👤</span>
          </div>
        )}
      </div>

      {/* 2. Middle Content Stack */}
      <div className="ride-card-info-stack">
        <div className="ride-card-title-row">
          <span className="ride-card-driver-name">{name}</span>
          {rating && (
            <span className="ride-card-rating">
              <StarIcon size={13} color="#f59e0b" />
              <span>{rating}</span>
            </span>
          )}
        </div>

        <div className="ride-card-route">{route}</div>

        <div className="ride-card-price">
          ₹ {price}<span className="price-unit">/seat</span>
        </div>
      </div>

      {/* 3. Right Action Button */}
      <div className="ride-card-action-side">
        {tag && <span className="ride-card-badge">{tag}</span>}
        <button 
          type="button" 
          className="btn-card-book-now" 
          onClick={onAction}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
