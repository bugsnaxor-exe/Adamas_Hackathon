import React from 'react';
import { CallIcon, SmsIcon } from './Icons';

/**
 * Image 3 Component: Split Pill Control for "Call Rider" & "SMS Rider"
 * Features a capsule shape container with vertical center divider.
 */
export default function ContactRiderBar({ 
  riderName = 'Rider', 
  phoneNumber = '', 
  onCall, 
  onSms,
  callLabel = 'Call Rider',
  smsLabel = 'SMS Rider',
  className = ''
}) {
  const handleCall = () => {
    if (onCall) {
      onCall();
    } else {
      alert(`📞 Dialing ${riderName} (${phoneNumber || '+91 98765 43210'})...`);
    }
  };

  const handleSms = () => {
    if (onSms) {
      onSms();
    } else {
      alert(`💬 Opening SMS chat with ${riderName}...`);
    }
  };

  return (
    <div className={`contact-rider-pill-container ${className}`}>
      {/* Left Action: Call Rider */}
      <button 
        type="button" 
        className="contact-pill-action call-action" 
        onClick={handleCall}
        title={`Call ${riderName}`}
      >
        <CallIcon size={19} color="#222222" />
        <span>{callLabel}</span>
      </button>

      {/* Center Vertical Divider Line */}
      <div className="contact-pill-divider" />

      {/* Right Action: SMS Rider */}
      <button 
        type="button" 
        className="contact-pill-action sms-action" 
        onClick={handleSms}
        title={`SMS ${riderName}`}
      >
        <SmsIcon size={19} color="#222222" />
        <span>{smsLabel}</span>
      </button>
    </div>
  );
}
