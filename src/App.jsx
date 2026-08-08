import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import FindRide from './components/FindRide';
import OfferRide from './components/OfferRide';
import MyTrips from './components/MyTrips';
import Wallet from './components/Wallet';
import Reports from './components/Reports';
import Vehicles from './components/Vehicles';

export default function App() {
  // Navigation State: 'dashboard' | 'find_ride' | 'offer_ride' | 'trips' | 'wallet' | 'reports' | 'vehicles'
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleBookNewTrip = () => {
    setActiveTab('find_ride');
  };

  return (
    <div className="app-viewport-frame">
      {/* Left Navigation Sidebar Component */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onBookNewTrip={handleBookNewTrip}
      />

      {/* Main Workspace Frame */}
      <div className="cp-main-workspace">
        {/* Top Header Bar Component */}
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Scrollable Content Views */}
        <div className="cp-content-scroll">
          {activeTab === 'dashboard' && <Dashboard setActiveTab={setActiveTab} />}
          {activeTab === 'find_ride' && <FindRide />}
          {activeTab === 'offer_ride' && <OfferRide setActiveTab={setActiveTab} />}
          {activeTab === 'trips' && <MyTrips />}
          {activeTab === 'wallet' && <Wallet />}
          {activeTab === 'reports' && <Reports />}
          {activeTab === 'vehicles' && <Vehicles />}
        </div>
      </div>
    </div>
  );
}