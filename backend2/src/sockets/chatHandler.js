// src/sockets/chatHandler.js
module.exports = (io, socket) => {
    // Join a specific trip room
    socket.on("join_trip_chat", (tripId) => {
        socket.join(`trip_${tripId}`);
        console.log(`💬 User joined chat room: trip_${tripId}`);
    });

    // Handle incoming text/media messages
    socket.on("send_trip_message", async (data) => {
        const { tripId, senderId, message } = data;

        const payload = {
            senderId,
            message,
            createdAt: new Date(),
        };

        // Broadcast message to everyone else in that trip room
        io.to(`trip_${tripId}`).emit("receive_trip_message", payload);

        // Optional: Save message to MongoDB database here asynchronously if you want message history!
    });
};
