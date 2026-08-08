import React from 'react';
import { StarIcon } from './Icons';

/**
 * Image 1 Component: Ride Card Shape
 * Used across the app wherever ride listings, search results, or offer details are displayed.
 * Layout: Left square avatar box | Middle details (Name, Route, Price) | Right action button
 */
export default function RideCard({
  avatarUrl,
  name = 'Driver',
  route = 'Pickup - Dropoff',
  price = 0,
  rating = '4.9',
  vehicle = 'Standard Vehicle',
  buttonText = 'Book Now',
  onAction,
  showContact = false, // You can use this flag later if you want to embed the contact bar inside the card
  onCall,
  onSms,
  tag = '',
  className = ''
}) {
  
  // If no avatar is provided by the backend, dynamically generate a beautiful initial-based avatar
  const displayAvatarUrl = avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=e2e8f0&color=0c3259&bold=true`;

  return (
    <div className={`custom-ride-card ${className}`}>
      {/* 1. Left Thumbnail Box */}
      <div className="ride-card-avatar-box">
        <img src={displayAvatarUrl} alt={name} className="avatar-img" style={{ width: '100%', height: '100%', borderRadius: '8px', objectFit: 'cover' }} />
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