import axiosClient from "./axiosClient";

export const vehicleAPI = {
    // POST: /api/vehicles (Register a new vehicle)
    addVehicle: (data) => axiosClient.post("/vehicles", data),

    // GET: /api/vehicles/user (Get all vehicles owned by the authenticated user)
    getUserVehicles: () => axiosClient.get("/vehicles/user"),

    // PUT: /api/vehicles/:id (Update a specific vehicle's details)
    updateVehicle: (id, data) => axiosClient.put(`/vehicles/${id}`, data),

    // DELETE: /api/vehicles/:id (Remove a vehicle)
    deleteVehicle: (id) => axiosClient.delete(`/vehicles/${id}`),
};
