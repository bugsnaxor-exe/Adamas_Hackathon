import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OpenStreetMap from "../components/map/OpenStreetMap";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import { MapPin } from "lucide-react";

export default function FindRide() {
    const navigate = useNavigate();

    // Tracks what a map click should update ('pickup' or 'destination')
    const [activePin, setActivePin] = useState("pickup");

    const [formData, setFormData] = useState({
        pickupLat: 28.6139,
        pickupLng: 77.209,
        pickupAddress: "",
        destLat: 28.5355,
        destLng: 77.391,
        destAddress: "",
        date: new Date().toISOString().split("T")[0],
        seats: 1,
    });

    // Handles updating coordinates when the map is clicked
    const handleMapClick = (latlng) => {
        if (activePin === "pickup") {
            setFormData((prev) => ({
                ...prev,
                pickupLat: latlng.lat,
                pickupLng: latlng.lng,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                destLat: latlng.lat,
                destLng: latlng.lng,
            }));
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // Passes coordinates to the search page for backend querying
        navigate(
            `/rides/search?lng=${formData.pickupLng}&lat=${formData.pickupLat}&date=${formData.date}&seats=${formData.seats}`,
        );
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
                <Card.Header>
                    <Card.Title>Find a Ride</Card.Title>
                </Card.Header>
                <Card.Content>
                    <form onSubmit={handleSearch} className="space-y-4">
                        {/* Pickup Details */}
                        <div
                            className={`p-4 rounded-xl border-2 transition-colors cursor-pointer ${activePin === "pickup" ? "bg-indigo-50 border-indigo-500" : "bg-slate-50 border-transparent hover:border-slate-300"}`}
                            onClick={() => setActivePin("pickup")}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-bold text-slate-700">
                                    Pickup Location
                                </h3>
                                {activePin === "pickup" && (
                                    <span className="text-xs font-semibold text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full animate-pulse">
                                        Click map to set
                                    </span>
                                )}
                            </div>
                            <Input
                                label="Pickup Address"
                                placeholder="e.g. 123 Sector 4, Noida"
                                value={formData.pickupAddress}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        pickupAddress: e.target.value,
                                    })
                                }
                            />
                            <div className="grid grid-cols-2 gap-3 mt-3">
                                <Input
                                    label="Latitude"
                                    type="number"
                                    step="any"
                                    value={formData.pickupLat}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            pickupLat: e.target.value,
                                        })
                                    }
                                />
                                <Input
                                    label="Longitude"
                                    type="number"
                                    step="any"
                                    value={formData.pickupLng}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            pickupLng: e.target.value,
                                        })
                                    }
                                />
                            </div>
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
                                placeholder="e.g. Cyber City, Gurugram"
                                value={formData.destAddress}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        destAddress: e.target.value,
                                    })
                                }
                            />
                            <div className="grid grid-cols-2 gap-3 mt-3">
                                <Input
                                    label="Latitude"
                                    type="number"
                                    step="any"
                                    value={formData.destLat}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            destLat: e.target.value,
                                        })
                                    }
                                />
                                <Input
                                    label="Longitude"
                                    type="number"
                                    step="any"
                                    value={formData.destLng}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            destLng: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <Input
                                label="Date"
                                type="date"
                                value={formData.date}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        date: e.target.value,
                                    })
                                }
                            />
                            <Input
                                label="Seats Needed"
                                type="number"
                                min="1"
                                value={formData.seats}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        seats: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <Button type="submit" className="w-full mt-2">
                            Search Available Rides
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
                            activePin === "pickup"
                                ? "text-indigo-400"
                                : "text-emerald-400"
                        }
                    >
                        {activePin === "pickup"
                            ? "Pickup Location"
                            : "Drop-off Location"}
                    </span>
                </div>

                <OpenStreetMap
                    pickup={{
                        lat: Number(formData.pickupLat) || 28.6139,
                        lng: Number(formData.pickupLng) || 77.209,
                        address: formData.pickupAddress,
                    }}
                    destination={{
                        lat: Number(formData.destLat) || 28.5355,
                        lng: Number(formData.destLng) || 77.391,
                        address: formData.destAddress,
                    }}
                    onMapClick={handleMapClick}
                    onPickupAddressFound={(address) =>
                        setFormData((prev) => ({
                            ...prev,
                            pickupAddress: address,
                        }))
                    }
                    onDestAddressFound={(address) =>
                        setFormData((prev) => ({
                            ...prev,
                            destAddress: address,
                        }))
                    }
                    routeCoordinates={[
                        [
                            Number(formData.pickupLat) || 28.6139,
                            Number(formData.pickupLng) || 77.209,
                        ],
                        [
                            Number(formData.destLat) || 28.5355,
                            Number(formData.destLng) || 77.391,
                        ],
                    ]}
                />
            </div>
        </div>
    );
}
