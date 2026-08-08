import React from 'react';

// Image 2: Book Ride Vector Icon (Filled Arrowhead / Navigation Arrow pointing top-right)
export function BookRideIcon({ size = 24, color = 'currentColor', className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill={color} 
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      <path d="M21 3L3 10.53v.98l6.84 2.65L12.49 21h.98L21 3z" />
    </svg>
  );
}

// Image 2: Offer Ride Vector Icon (Front View Sedan Car Outline)
export function OfferRideIcon({ size = 24, color = 'currentColor', className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      {/* Front Windshield & Roof Outline */}
      <path d="M6 11L8.2 5.5C8.4 5.0 8.9 4.7 9.5 4.7H14.5C15.1 4.7 15.6 5.0 15.8 5.5L18 11" />
      {/* Main Car Body Box */}
      <path d="M4 11H20C20.6 11 21 11.4 21 12V16C21 16.6 20.6 17 20 17H4C3.4 17 3 16.6 3 16V12C3 11.4 3.4 11 4 11Z" />
      {/* Front Headlights */}
      <circle cx="6.5" cy="14" r="1.2" fill={color} />
      <circle cx="17.5" cy="14" r="1.2" fill={color} />
      {/* Front Grille Line */}
      <line x1="10" y1="14" x2="14" y2="14" strokeWidth="1.5" />
      {/* Front Tires */}
      <path d="M5.5 17V19.5" strokeWidth="2.5" />
      <path d="M18.5 17V19.5" strokeWidth="2.5" />
    </svg>
  );
}

// Image 3: Call Vector Icon (Telephone Handset Outline)
export function CallIcon({ size = 20, color = 'currentColor', className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

// Image 3: SMS Vector Icon (Speech Bubble with Three Dots Outline)
export function SmsIcon({ size = 20, color = 'currentColor', className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      {/* Oval Speech Bubble with Tail */}
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      {/* 3 Dots inside speech bubble */}
      <circle cx="8.5" cy="11.5" r="1" fill={color} stroke="none" />
      <circle cx="12" cy="11.5" r="1" fill={color} stroke="none" />
      <circle cx="15.5" cy="11.5" r="1" fill={color} stroke="none" />
    </svg>
  );
}

// Additional Vector Icons for High-Quality UI
export function LocationIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function CalendarIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

export function UserIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export function WalletIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  );
}

export function StarIcon({ size = 16, color = '#f59e0b' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="1">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export function CheckIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
