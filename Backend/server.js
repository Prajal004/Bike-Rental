const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB } = require('./config/database');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));
app.use('/api/location', require('./routes/locationRoutes'));
app.use('/api/motorcycles', require('./routes/motorcycleRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/referrals', require('./routes/referralRoutes'));
app.use('/api/rentals', require('./routes/rentalRoutes'));
app.use('/api/sos', require('./routes/sosRoutes'));
app.use('/api/shops', require('./routes/shopRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));

// WebSocket
io.on('connection', (socket) => {
  console.log('🔌 User connected:', socket.id);

  socket.on('join-chat', (chatId) => {
    socket.join(`chat-${chatId}`);
    console.log(`📩 User joined chat: ${chatId}`);
  });

  socket.on('send-message', (data) => {
    io.to(`chat-${data.chatId}`).emit('new-message', data);
  });

  socket.on('typing', (data) => {
    io.to(`chat-${data.chatId}`).emit('user-typing', data);
  });

  socket.on('disconnect', () => {
    console.log('🔌 User disconnected:', socket.id);
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running with PostgreSQL',
    features: ['payment', 'referral', 'nepali', 'sos', 'shops', 'locations', 'chat'],
  });
});

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Motorcycle Rental API Nepal' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 Health Check: http://localhost:${PORT}/api/health`);
});
