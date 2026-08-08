const { Server } = require("socket.io");
const registerChatHandler = require("./chatHandler");
const registerTrackingHandler = require("./trackingHandler");

const initSocketServer = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000", // this is React frontend URL
            methods: ["GET", "POST"],
        },
    });
    io.on("connection", (socket) => {
        console.log(`🔌 User Connected: ${socket.id}`);

        // Optional: Map user ID if sent via auth handshake from frontend
        const userId = socket.handshake.auth.userId;
        if (userId) {
            socket.join(`user_${userId}`);
            console.log(`👤 User mapped to room: user_${userId}`);
        }

        // Register feature-specific handlers
        registerChatHandler(io, socket);
        registerTrackingHandler(io, socket);

        socket.on("disconnect", () => {
            console.log(`❌ User Disconnected: ${socket.id}`);
        });
    });
    return io;
};
module.exports = initSocketServer;
