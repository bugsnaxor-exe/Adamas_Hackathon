import React, { useEffect, useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polyline,
    useMap,
    useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = new L.Icon({
    iconUrl: markerIconPng,
    shadowUrl: markerShadowPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

// 1. Handles map clicks and passes coordinates up
function MapClickHandler({ onMapClick }) {
    useMapEvents({
        click(e) {
            if (onMapClick) {
                onMapClick({ lat: e.latlng.lat, lng: e.latlng.lng });
            }
        },
    });
    return null;
}

// 2. Interactive Marker that reverse-geocodes its position
function InteractiveMarker({
    position,
    label,
    fallbackAddress,
    onAddressFound,
}) {
    const [address, setAddress] = useState("Loading address...");
    const map = useMap();

    useEffect(() => {
        if (!position || !position.lat || !position.lng) return;

        const controller = new AbortController();
        const { signal } = controller;

        const timerId = setTimeout(async () => {
            try {
                const { lat, lng } = position;
                const response = await fetch(
                    `https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}&api_key=695000414c3ee961172409vsz40d3ab`,
                    { signal },
                );
                const data = await response.json();

                if (data && data.display_name) {
                    setAddress(data.display_name);
                    if (onAddressFound) onAddressFound(data.display_name);
                    map.flyTo([lat, lng], map.getZoom(), {
                        animate: true,
                        duration: 0.5,
                    });
                } else {
                    setAddress(fallbackAddress || "Address not found");
                }
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error("Error fetching address:", error);
                    setAddress(fallbackAddress || "Address not found");
                }
            }
        }, 500); // 500ms debounce

        return () => {
            clearTimeout(timerId);
            controller.abort();
        };
    }, [position.lat, position.lng]); // Re-run when coordinates change

    if (!position.lat || !position.lng) return null;

    return (
        <Marker position={[position.lat, position.lng]} icon={defaultIcon}>
            <Popup className="font-semibold text-slate-800 max-w-[250px]">
                <div>
                    <div className="text-xs text-indigo-600 uppercase mb-1 tracking-wider">
                        {label}
                    </div>
                    <div className="text-sm leading-tight">{address}</div>
                </div>
            </Popup>
        </Marker>
    );
}

export default function OpenStreetMap({
    pickup,
    destination,
    onMapClick,
    onPickupAddressFound,
    onDestAddressFound,
}) {
    return (
        <div className="w-full h-full rounded-2xl overflow-hidden shadow-sm border border-slate-200 relative z-0">
            <MapContainer
                center={[28.6139, 77.209]} // Default center (Delhi)
                zoom={12}
                scrollWheelZoom={true}
                className="w-full h-full"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Listen for clicks on the map */}
                <MapClickHandler onMapClick={onMapClick} />

                {/* Render Pickup Marker */}
                {pickup && (
                    <InteractiveMarker
                        position={pickup}
                        label="📍 Pickup Location"
                        fallbackAddress={pickup.address}
                        onAddressFound={onPickupAddressFound}
                    />
                )}

                {/* Render Destination Marker */}
                {destination && (
                    <InteractiveMarker
                        position={destination}
                        label="🏁 Destination"
                        fallbackAddress={destination.address}
                        onAddressFound={onDestAddressFound}
                    />
                )}

                {/* Draw a line if both points exist */}
                {pickup?.lat && destination?.lat && (
                    <Polyline
                        positions={[
                            [pickup.lat, pickup.lng],
                            [destination.lat, destination.lng],
                        ]}
                        color="#4f46e5"
                        weight={4}
                        dashArray="10, 10"
                        opacity={0.7}
                    />
                )}
            </MapContainer>
        </div>
    );
}
