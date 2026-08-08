// Load environment variables from a .env file
require('dotenv').config();

const http = require('http');
const mongoose = require('mongoose');
const { Server } = require('socket.io');

// Import your Express app (adjust the path if app.js is inside a 'src' folder)
const app = require('./src/app'); 

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // this is React frontend URL 
    methods: ["GET", "POST"]
  }
});


io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);

  // Example: Passenger or Driver joining a specific trip room for live updates
  socket.on('joinTripRoom', (tripId) => {
    socket.join(tripId);
    console.log(`User joined trip room: ${tripId}`);
  });

  socket.on('sendLocation', (data) => {
    const { tripId, latitude, longitude } = data;
    // Broadcast the location to anyone else in this trip's room (the passenger)
    socket.to(tripId).emit('receiveLocation', { latitude, longitude });
  });

  socket.on('disconnect', () => {
    console.log(` Client disconnected: ${socket.id}`);
  });
});


const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/carpool_db';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB');
    
    // Only start the server if the database connects successfully
    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error.message);
    process.exit(1); // Exit process with failure
  });