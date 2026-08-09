import React, { useEffect, useState } from "react";
import { vehicleAPI } from "../api/vehicle.api";
import Card from "../components/common/Card";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

export default function Vehicles() {
    const [vehicles, setVehicles] = useState([]);
    const [formData, setFormData] = useState({
        vehicleModel: "",
        registrationNumber: "",
        seatingCapacity: 2,
    });

    const fetchVehicles = () =>
        vehicleAPI
            .getUserVehicles()
            .then((res) => setVehicles(res.data || res || []));
    useEffect(() => {
        fetchVehicles();
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        await vehicleAPI.addVehicle(formData);
        fetchVehicles();
        setFormData({
            vehicleModel: "",
            registrationNumber: "",
            seatingCapacity: 2,
        });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
                <Card.Header>
                    <Card.Title>Add Vehicle</Card.Title>
                </Card.Header>
                <Card.Content>
                    <form onSubmit={handleAdd} className="space-y-4">
                        <Input
                            label="Model"
                            value={formData.vehicleModel}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    vehicleModel: e.target.value,
                                })
                            }
                        />
                        <Input
                            label="Registration Number"
                            value={formData.registrationNumber}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    registrationNumber: e.target.value,
                                })
                            }
                        />
                        <Input
                            label="Capacity"
                            type="number"
                            value={formData.seatingCapacity}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    seatingCapacity: e.target.value,
                                })
                            }
                        />
                        <Button type="submit">Add Vehicle</Button>
                    </form>
                </Card.Content>
            </Card>
            <div>
                <h3 className="text-lg font-bold mb-4">My Vehicles</h3>
                <div className="space-y-3">
                    {vehicles.map((v) => (
                        <Card key={v._id || v.id}>
                            <Card.Content className="flex justify-between items-center">
                                <div>
                                    <p className="font-bold">
                                        {v.vehicleModel}
                                    </p>
                                    <p className="text-sm text-slate-500">
                                        {v.registrationNumber} | Seats:{" "}
                                        {v.seatingCapacity}
                                    </p>
                                </div>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={async () => {
                                        await vehicleAPI.deleteVehicle(
                                            v._id || v.id,
                                        );
                                        fetchVehicles();
                                    }}
                                >
                                    Remove
                                </Button>
                            </Card.Content>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
