import axiosClient from "./axiosClient";

export const rideAPI = {
    // POST: /api/rides/new (Publish a new ride)
    publishRide: (data) => axiosClient.post("/rides/new", data),

    // GET: /api/rides/search?lng=...&lat=...&date=... (Find rides based on location and date)
    searchRides: (params) => axiosClient.get("/rides/search", { params }),

    // GET: /api/rides/:id (Get details of a specific ride by its ID)
    getRideById: (id) => axiosClient.get(`/rides/${id}`),
};
