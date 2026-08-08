// Load environment variables from a .env file
require("dotenv").config();

const http = require("http");
const mongoose = require("mongoose");
const initSocketServer = require("./src/sockets/socketManager");

// Import your Express app (adjust the path if app.js is inside a 'src' folder)
const app = require("./src/app");

const server = http.createServer(app);
initSocketServer(server); // Initialize the socket server

const PORT = process.env.PORT || 5000;
const MONGO_URI =
    process.env.MONGO_URI || "mongodb://127.0.0.1:27017/carpool_db";

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("Successfully connected to MongoDB");

        // Only start the server if the database connects successfully
        server.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database connection failed:", error.message);
        process.exit(1); // Exit process with failure
    });
