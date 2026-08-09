import React from "react";
import { Link } from "react-router-dom";
import Card from "../components/common/Card";
import { Search, PlusCircle, Navigation } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
    const { user } = useAuth();

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">
                Welcome, {user?.name || "Commuter"}!
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="hover:border-indigo-300 transition cursor-pointer">
                    <Link to="/find" className="flex items-center p-6 gap-4">
                        <div className="p-4 bg-indigo-100 text-indigo-600 rounded-full">
                            <Search className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Find a Ride</h2>
                            <p className="text-sm text-slate-500">
                                Search for available carpools to your
                                destination.
                            </p>
                        </div>
                    </Link>
                </Card>

                <Card className="hover:border-emerald-300 transition cursor-pointer">
                    <Link to="/offer" className="flex items-center p-6 gap-4">
                        <div className="p-4 bg-emerald-100 text-emerald-600 rounded-full">
                            <PlusCircle className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Offer a Ride</h2>
                            <p className="text-sm text-slate-500">
                                Publish a ride and share commuting costs.
                            </p>
                        </div>
                    </Link>
                </Card>
            </div>

            <Card>
                <Card.Header>
                    <Card.Title>Quick Actions</Card.Title>
                </Card.Header>
                <Card.Content className="flex flex-wrap gap-4">
                    <Link
                        to="/my-trips"
                        className="bg-slate-100 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-200 inline-flex items-center gap-2"
                    >
                        <Navigation className="w-4 h-4" /> Active Trips
                    </Link>
                    <Link
                        to="/wallet"
                        className="bg-slate-100 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-200 inline-flex items-center gap-2"
                    >
                        Manage Wallet
                    </Link>
                    <Link
                        to="/vehicles"
                        className="bg-slate-100 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-200 inline-flex items-center gap-2"
                    >
                        My Vehicles
                    </Link>
                </Card.Content>
            </Card>
        </div>
    );
}
