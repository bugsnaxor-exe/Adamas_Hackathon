import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Layout from "./components/layout/Layout";

import Login from "./pages/auth/Login";
import Registration from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import FindRide from "./pages/FindRide";
import AvailableRides from "./pages/AvailableRides";
import OfferRide from "./pages/OfferRide";
// import MyTrip from "./pages/auth/MyTrips";
import MyTrip from "./pages/MyTrips";
import TripDetail from "./pages/TripDetail";
import Vehicles from "./pages/Vehicles";
import Wallet from "./pages/Wallet";
import Analytics from "./pages/Analytics";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? (
        <Layout>{children}</Layout>
    ) : (
        <Navigate to="/login" replace />
    );
};

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Registration />} />

                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/find"
                        element={
                            <ProtectedRoute>
                                <FindRide />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/rides/search"
                        element={
                            <ProtectedRoute>
                                <AvailableRides />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/offer"
                        element={
                            <ProtectedRoute>
                                <OfferRide />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/my-trips"
                        element={
                            <ProtectedRoute>
                                <MyTrip />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/trips/:id"
                        element={
                            <ProtectedRoute>
                                <TripDetail />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/vehicles"
                        element={
                            <ProtectedRoute>
                                <Vehicles />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/wallet"
                        element={
                            <ProtectedRoute>
                                <Wallet />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/analytics"
                        element={
                            <ProtectedRoute>
                                <Analytics />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
