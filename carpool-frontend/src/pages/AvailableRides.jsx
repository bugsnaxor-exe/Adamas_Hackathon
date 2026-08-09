import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { rideAPI } from "../api/ride.api";
import { tripAPI } from "../api/trip.api";
import Card from "../components/common/Card";
import Button from "../components/common/Button";

export default function AvailableRides() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [rides, setRides] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        rideAPI
            .searchRides(Object.fromEntries(searchParams))
            .then((res) => setRides(res.data || res || []))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [searchParams]);

    const bookTrip = async (rideId) => {
        try {
            await tripAPI.bookTrip({
                rideId,
                seatsBooked: searchParams.get("seats") || 1,
            });
            navigate("/my-trips");
        } catch (err) {
            alert("Booking failed.");
        }
    };

    if (loading) return <div>Searching rides...</div>;

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold">Search Results</h2>
            {rides.length === 0 ? (
                <p>No rides found.</p>
            ) : (
                rides.map((ride) => (
                    <Card key={ride._id || ride.id}>
                        <Card.Content className="flex justify-between items-center">
                            <div>
                                <p className="font-bold">
                                    Driver:{" "}
                                    {ride.driverName || "Verified Employee"}
                                </p>
                                <p className="text-sm">
                                    Seats Available: {ride.availableSeats} |
                                    Fare: ₹{ride.fare}
                                </p>
                            </div>
                            <Button
                                onClick={() => bookTrip(ride._id || ride.id)}
                            >
                                Book Ride
                            </Button>
                        </Card.Content>
                    </Card>
                ))
            )}
        </div>
    );
}
