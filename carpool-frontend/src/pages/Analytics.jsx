import React from "react";
import Card from "../components/common/Card";
import { BarChart3, TrendingUp, Droplets } from "lucide-react";

export default function Analytics() {
    // Static mockup for the hackathon analytics requirement[cite: 7]
    const metrics = [
        {
            label: "Total Distance",
            value: "450 km",
            icon: TrendingUp,
            color: "text-blue-500",
        },
        {
            label: "Fuel Saved",
            value: "25 L",
            icon: Droplets,
            color: "text-emerald-500",
        },
        {
            label: "Cost Savings",
            value: "₹3,500",
            icon: BarChart3,
            color: "text-indigo-500",
        },
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">
                Travel Reports
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {metrics.map((m, i) => {
                    const Icon = m.icon;
                    return (
                        <Card key={i}>
                            <Card.Content className="flex items-center gap-4">
                                <div
                                    className={`p-4 bg-slate-100 rounded-xl ${m.color}`}
                                >
                                    <Icon className="w-8 h-8" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 font-semibold">
                                        {m.label}
                                    </p>
                                    <p className="text-2xl font-bold text-slate-800">
                                        {m.value}
                                    </p>
                                </div>
                            </Card.Content>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
