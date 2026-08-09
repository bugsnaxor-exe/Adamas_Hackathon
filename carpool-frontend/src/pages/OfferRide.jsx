import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { rideAPI } from "../api/ride.api";
import { vehicleAPI } from "../api/vehicle.api";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import OpenStreetMap from "../components/map/OpenStreetMap";
import { MapPin } from "lucide-react";

export default function OfferRide() {
    const navigate = useNavigate();
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // NEW: Tracks what a map click should update ('origin' or 'destination')
    const [activePin, setActivePin] = useState("origin");

    const [formData, setFormData] = useState({
        vehicleId: "",
        originLat: 28.6139,
        originLng: 77.209,
        originAddress: "",
        destLat: 28.5355,
        destLng: 77.391,
        destAddress: "",
        departureTime: "",
        availableSeats: 3,
        fare: 150,
    });

    useEffect(() => {
        vehicleAPI
            .getUserVehicles()
            .then((res) => {
                const vehicleList =
                    res.docs ||
                    res.data ||
                    res.vehicles ||
                    (Array.isArray(res) ? res : []);
                setVehicles(vehicleList);

                if (vehicleList.length > 0) {
                    setFormData((prev) => ({
                        ...prev,
                        vehicleId: vehicleList[0]._id || vehicleList[0].id,
                    }));
                }
            })
            .catch((err) => {
                console.error("Failed to load vehicles", err);
                setError("Could not load your registered vehicles.");
            });
    }, []);

    // Handles updating coordinates when the map is clicked
    const handleMapClick = (latlng) => {
        if (activePin === "origin") {
            setFormData((prev) => ({
                ...prev,
                originLat: latlng.lat,
                originLng: latlng.lng,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                destLat: latlng.lat,
                destLng: latlng.lng,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const payload = {
                vehicleId: formData.vehicleId,
                pickupCoords: {
                    lat: Number(formData.originLat),
                    lng: Number(formData.originLng),
                    address:
                        formData.originAddress.trim() || "Selected from map",
                },
                destCoords: {
                    lat: Number(formData.destLat),
                    lng: Number(formData.destLng),
                    address: formData.destAddress.trim() || "Selected from map",
                },
                travelDateTime: new Date(formData.departureTime).toISOString(),
                totalSeats: Number(formData.availableSeats),
                farePerSeat: Number(formData.fare),
            };

            await rideAPI.publishRide(payload);
            navigate("/my-trips");
        } catch (err) {
            console.error("Publish Ride Failed:", err);

            // Smarter error extraction to get the exact Joi message
            let backendMessage = "Failed to publish ride. Check your inputs.";

            if (
                err.response?.data?.errors &&
                err.response.data.errors.length > 0
            ) {
                backendMessage =
                    err.response.data.errors[0].message ||
                    err.response.data.errors[0];
            } else if (err.response?.data?.message) {
                backendMessage = err.response.data.message;
            } else if (err.message) {
                backendMessage = err.message;
            }

            // Display the exact backend error in the red box on the UI
            setError(`Validation Error: ${backendMessage}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
                <Card.Header>
                    <Card.Title>Offer a Ride</Card.Title>
                </Card.Header>
                <Card.Content>
                    {error && (
                        <div className="bg-rose-50 border border-rose-200 text-rose-600 p-3 rounded-lg text-sm mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1.5">
                                Select Vehicle
                            </label>
                            <select
                                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 outline-none"
                                value={formData.vehicleId}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        vehicleId: e.target.value,
                                    })
                                }
                                required
                            >
                                <option value="">
                                    -- Select Registered Vehicle --
                                </option>
                                {vehicles.map((v) => (
                                    <option
                                        key={v._id || v.id}
                                        value={v._id || v.id}
                                    >
                                        {v.vehicleModel} ({v.registrationNumber}
                                        ) - Capacity: {v.seatingCapacity}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Origin Details */}
                        <div
                            className={`p-4 rounded-xl border-2 transition-colors cursor-pointer ${activePin === "origin" ? "bg-indigo-50 border-indigo-500" : "bg-slate-50 border-transparent hover:border-slate-300"}`}
                            onClick={() => setActivePin("origin")}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-bold text-slate-700">
                                    Pickup Location
                                </h3>
                                {activePin === "origin" && (
                                    <span className="text-xs font-semibold text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full animate-pulse">
                                        Click map to set
                                    </span>
                                )}
                            </div>
                            <Input
                                label="Pickup Address"
                                value={formData.originAddress}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        originAddress: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>

                        {/* Destination Details */}
                        <div
                            className={`p-4 rounded-xl border-2 transition-colors cursor-pointer ${activePin === "destination" ? "bg-emerald-50 border-emerald-500" : "bg-slate-50 border-transparent hover:border-slate-300"}`}
                            onClick={() => setActivePin("destination")}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-bold text-slate-700">
                                    Drop-off Location
                                </h3>
                                {activePin === "destination" && (
                                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full animate-pulse">
                                        Click map to set
                                    </span>
                                )}
                            </div>
                            <Input
                                label="Destination Address"
                                value={formData.destAddress}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        destAddress: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>

                        <Input
                            label="Departure Date & Time"
                            type="datetime-local"
                            value={formData.departureTime}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    departureTime: e.target.value,
                                })
                            }
                            required
                        />

                        <div className="grid grid-cols-2 gap-3">
                            <Input
                                label="Total Seats"
                                type="number"
                                min="1"
                                max="10"
                                value={formData.availableSeats}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        availableSeats: e.target.value,
                                    })
                                }
                                required
                            />
                            <Input
                                label="Fare Per Seat (₹)"
                                type="number"
                                min="0"
                                value={formData.fare}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        fare: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full mt-4"
                            isLoading={loading}
                            disabled={
                                !formData.vehicleId || vehicles.length === 0
                            }
                        >
                            Publish Ride
                        </Button>
                    </form>
                </Card.Content>
            </Card>

            {/* Map Container */}
            <div className="h-[600px] flex flex-col gap-3 sticky top-6">
                <div className="bg-slate-800 text-white p-3 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold shadow-sm">
                    <MapPin className="w-4 h-4 text-indigo-400" />
                    Currently setting:{" "}
                    <span
                        className={
                            activePin === "origin"
                                ? "text-indigo-400"
                                : "text-emerald-400"
                        }
                    >
                        {activePin === "origin"
                            ? "Pickup Location"
                            : "Drop-off Location"}
                    </span>
                </div>

                <OpenStreetMap
                    pickup={{
                        lat: formData.originLat,
                        lng: formData.originLng,
                        address: formData.originAddress,
                    }}
                    destination={{
                        lat: formData.destLat,
                        lng: formData.destLng,
                        address: formData.destAddress,
                    }}
                    onMapClick={handleMapClick}
                    onPickupAddressFound={(address) =>
                        setFormData((prev) => ({
                            ...prev,
                            originAddress: address,
                        }))
                    }
                    onDestAddressFound={(address) =>
                        setFormData((prev) => ({
                            ...prev,
                            destAddress: address,
                        }))
                    }
                />
            </div>
        </div>
    );
}
