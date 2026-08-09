import React, { useEffect, useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polyline,
    useMap,
} from "react-leaflet";
import L from "leaflet";

// Custom Marker for the live vehicle
const carIcon = new L.DivIcon({
    className: "custom-car-marker",
    html: `<div style="font-size: 28px; filter: drop-shadow(0px 4px 6px rgba(0,0,0,0.3)); transform: scaleX(-1);">🚘</div>`,
    iconSize: [35, 35],
    iconAnchor: [17, 17],
    popupAnchor: [0, -15],
});

// Standard marker for Start/End
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const pinIcon = new L.Icon({
    iconUrl: markerIconPng,
    shadowUrl: markerShadowPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

// Helper component to keep the map centered on the moving car
const AutoCenterMap = ({ position }) => {
    const map = useMap();
    useEffect(() => {
        if (position) {
            map.setView(position, map.getZoom(), { animate: true });
        }
    }, [map, position]);
    return null;
};

export default function LiveTrackingMap({
    pickup,
    destination,
    initialDriverLocation,
}) {
    // Initialize driver position at pickup if no initial location is provided
    const [driverPos, setDriverPos] = useState(
        initialDriverLocation || [
            pickup?.lat || 28.6139,
            pickup?.lng || 77.209,
        ],
    );

    // Mocking live location updates for the hackathon/demo environment
    useEffect(() => {
        if (!destination) return;

        const interval = setInterval(() => {
            setDriverPos((prev) => {
                // Linearly interpolate position towards destination by 2% every 2 seconds
                const nextLat = prev[0] + (destination.lat - prev[0]) * 0.02;
                const nextLng = prev[1] + (destination.lng - prev[1]) * 0.02;

                // Stop updating if we are extremely close to the destination
                const latDiff = Math.abs(destination.lat - nextLat);
                const lngDiff = Math.abs(destination.lng - nextLng);
                if (latDiff < 0.0001 && lngDiff < 0.0001) {
                    clearInterval(interval);
                    return prev;
                }

                return [nextLat, nextLng];
            });
        }, 2000);

        return () => clearInterval(interval);
    }, [destination]);

    return (
        <div className="w-full h-96 rounded-2xl overflow-hidden shadow-sm border border-slate-200 relative z-0">
            <MapContainer
                center={driverPos}
                zoom={14}
                scrollWheelZoom={true}
                className="w-full h-full"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Start / End Pins */}
                {pickup && (
                    <Marker position={[pickup.lat, pickup.lng]} icon={pinIcon}>
                        <Popup className="font-semibold text-slate-800">
                            📍 Pickup Point
                        </Popup>
                    </Marker>
                )}

                {destination && (
                    <Marker
                        position={[destination.lat, destination.lng]}
                        icon={pinIcon}
                    >
                        <Popup className="font-semibold text-slate-800">
                            🏁 Destination
                        </Popup>
                    </Marker>
                )}

                {/* Active Route Line (Dashed) */}
                {pickup && destination && (
                    <Polyline
                        positions={[
                            [pickup.lat, pickup.lng],
                            [destination.lat, destination.lng],
                        ]}
                        color="#94a3b8"
                        weight={4}
                        dashArray="8, 8"
                        opacity={0.6}
                    />
                )}

                {/* Trail behind the car */}
                {pickup && (
                    <Polyline
                        positions={[[pickup.lat, pickup.lng], driverPos]}
                        color="#059669"
                        weight={5}
                    />
                )}

                {/* Live Moving Vehicle Marker */}
                <Marker position={driverPos} icon={carIcon}>
                    <Popup className="font-semibold text-emerald-700">
                        Live Driver Location
                    </Popup>
                </Marker>

                {/* Auto center the camera on the car */}
                <AutoCenterMap position={driverPos} />
            </MapContainer>
        </div>
    );
}
