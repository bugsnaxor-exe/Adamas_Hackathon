import axiosClient from "./axiosClient";

export const tripAPI = {
    // POST: /api/trips/book (Book a new trip)
    bookTrip: (data) => axiosClient.post("/trips/book", data),

    // GET: /api/trips/my-trips?role=passenger (Get trip history for a user, query can filter by role)
    getUserTrips: (params) => axiosClient.get("/trips/my-trips", { params }),

    // GET: /api/trips/:id (Get specific trip details)
    getTripDetails: (id) => axiosClient.get(`/trips/${id}`),

    // PATCH: /api/trips/:id/status (Update ride status e.g., Ongoing, Completed, Cancelled)
    updateTripStatus: (id, statusData) =>
        axiosClient.patch(`/trips/${id}/status`, statusData),

    // PATCH: /api/trips/:id/payment (Update payment status e.g., Pending, Completed, Failed)
    updatePaymentStatus: (id, paymentData) =>
        axiosClient.patch(`/trips/${id}/payment`, paymentData),
};
