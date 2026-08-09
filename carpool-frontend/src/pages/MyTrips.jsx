import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { tripAPI } from "../api/trip.api";
import Card from "../components/common/Card";
import StatusBadge from "../components/common/StatusBadge";
import Button from "../components/common/Button";

export default function MyTrip() {
    const [trips, setTrips] = useState([]);
    const [role, setRole] = useState("passenger");

    useEffect(() => {
        tripAPI
            .getUserTrips({ role })
            .then((res) => setTrips(res.data || res || []));
    }, [role]);

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Trip History</h2>
                <div className="space-x-2">
                    <Button
                        variant={role === "passenger" ? "primary" : "outline"}
                        size="sm"
                        onClick={() => setRole("passenger")}
                    >
                        Passenger
                    </Button>
                    <Button
                        variant={role === "driver" ? "primary" : "outline"}
                        size="sm"
                        onClick={() => setRole("driver")}
                    >
                        Driver
                    </Button>
                </div>
            </div>
            {trips.length === 0 && <p>No trips found.</p>}
            {trips.map((trip) => (
                <Card key={trip._id || trip.id}>
                    <Card.Content className="flex justify-between items-center">
                        <div>
                            <p className="font-bold">
                                Trip ID: {trip._id || trip.id}
                            </p>
                            <StatusBadge
                                status={trip.status}
                                className="mt-1"
                            />
                        </div>
                        <Link to={`/trips/${trip._id || trip.id}`}>
                            <Button size="sm">Details</Button>
                        </Link>
                    </Card.Content>
                </Card>
            ))}
        </div>
    );
}
