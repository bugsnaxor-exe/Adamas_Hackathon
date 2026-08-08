// src/sockets/trackingHandler.js
module.exports = (io, socket) => {
    // Driver joins a tracking room for their active trip
    socket.on("join_tracking", (tripId) => {
        socket.join(`tracking_${tripId}`);
        console.log(`📍 Live tracking active for trip: ${tripId}`);
    });

    // Driver sends their live coordinates from their mobile app/browser
    socket.on("update_location", (data) => {
        const { tripId, lat, lng } = data;

        // Broadcast the coordinates instantly to all passengers watching this trip
        io.to(`tracking_${tripId}`).emit("live_location_update", {
            lat,
            lng,
            updatedAt: new Date(),
        });
    });
};
