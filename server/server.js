//server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://mern-chat-user:dXW9hJ7UwZCRPc3A@cluster0.xn2vabl.mongodb.net/code-editor?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Room schema
const roomSchema = new mongoose.Schema({
  roomId: String,
  code: String,
});

const Room = mongoose.model('Room', roomSchema);

// Keep track of users in each room
const roomUsers = {};

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('joinRoom', async ({ roomId, username }) => {
    socket.join(roomId);
    
    // Initialize room users if not exists
    if (!roomUsers[roomId]) {
      roomUsers[roomId] = new Set();
    }
    
    // Add user to the room
    roomUsers[roomId].add(username);
    
    // Fetch or create room
    let room = await Room.findOne({ roomId });
    if (!room) {
      room = new Room({ roomId, code: '' });
      await room.save();
    }

    // Send current code and user list to all users in the room
    io.to(roomId).emit('roomData', {
      code: room.code,
      users: Array.from(roomUsers[roomId])
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log('Client disconnected');
      if (roomUsers[roomId]) {
        roomUsers[roomId].delete(username);
        if (roomUsers[roomId].size === 0) {
          delete roomUsers[roomId];
        } else {
          io.to(roomId).emit('roomData', {
            users: Array.from(roomUsers[roomId])
          });
        }
      }
    });
  });

  socket.on('codeChange', async ({ roomId, code }) => {
    await Room.findOneAndUpdate({ roomId }, { code });
    io.to(roomId).emit('codeUpdate', code);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));