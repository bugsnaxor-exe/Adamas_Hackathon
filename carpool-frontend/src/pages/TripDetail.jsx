import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { tripAPI } from "../api/trip.api";
import LiveTrackingMap from "../components/map/LiveTrackingMap";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import StatusBadge from "../components/common/StatusBadge";

export default function TripDetail() {
    const { id } = useParams();
    const [trip, setTrip] = useState(null);

    useEffect(() => {
        tripAPI.getTripDetails(id).then((res) => setTrip(res.data || res));
    }, [id]);

    const updateStatus = async (status) => {
        await tripAPI.updateTripStatus(id, { status });
        setTrip({ ...trip, status });
    };

    const pay = async () => {
        await tripAPI.updatePaymentStatus(id, {
            paymentStatus: "Completed",
            method: "Wallet",
        });
        setTrip({ ...trip, paymentStatus: "Completed" });
    };

    if (!trip) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
                <h2 className="text-xl font-bold">Live Trip</h2>
                <StatusBadge status={trip.status} />
            </div>
            <div className="h-[400px]">
                <LiveTrackingMap
                    pickup={{ lat: 28.6, lng: 77.2 }}
                    destination={{ lat: 28.5, lng: 77.3 }}
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Card>
                    <Card.Content className="space-y-2">
                        <h3 className="font-bold">Actions</h3>
                        <Button
                            size="sm"
                            onClick={() => updateStatus("In Progress")}
                        >
                            Start Trip
                        </Button>
                        <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => updateStatus("Completed")}
                        >
                            End Trip
                        </Button>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content className="space-y-2">
                        <h3 className="font-bold">
                            Payment: {trip.paymentStatus}
                        </h3>
                        {trip.paymentStatus !== "Completed" && (
                            <Button size="sm" onClick={pay}>
                                Pay ₹{trip.fare || 150}
                            </Button>
                        )}
                    </Card.Content>
                </Card>
            </div>
        </div>
    );
}
