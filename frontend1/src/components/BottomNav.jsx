import React from 'react';
import { BookRideIcon, OfferRideIcon } from './Icons';

export default function BottomNav({ activeTab, setActiveTab }) {
  return (
    <footer className="bottom-nav-2bar">
      {/* Image 2: Book Ride Tab with Navigation Arrowhead Icon */}
      <button 
        className={`nav-tab-btn ${activeTab === 'book' ? 'active' : ''}`} 
        onClick={() => setActiveTab('book')}
      >
        <div className="tab-icon-wrapper">
          <BookRideIcon 
            size={22} 
            color={activeTab === 'book' ? '#0c3259' : '#64748b'} 
          />
        </div>
        <span>Book Ride</span>
      </button>

      {/* Image 2: Offer Ride Tab with Front View Sedan Car Outline Icon */}
      <button 
        className={`nav-tab-btn ${activeTab === 'offer' ? 'active' : ''}`} 
        onClick={() => setActiveTab('offer')}
      >
        <div className="tab-icon-wrapper">
          <OfferRideIcon 
            size={24} 
            color={activeTab === 'offer' ? '#0c3259' : '#64748b'} 
          />
        </div>
        <span>Offer Ride</span>
      </button>
    </footer>
  );
}
