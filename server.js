// server.js
require('dotenv').config(); // Load .env variables
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();

// Rate limiter: limit repeated requests to ticket endpoints
const ticketsLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});

// ====== Middleware ======
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ====== Environment Variables ======
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

// ====== Connect to MongoDB ======
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB connected successfully!'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// ====== Ticket Schema & Model ======
const ticketSchema = new mongoose.Schema({
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

// ====== API Routes ======

// Apply rate limiting to all /tickets routes
app.use('/tickets', ticketsLimiter);

// Get all tickets
app.get('/tickets', async (req, res) => {
    try {
        const tickets = await Ticket.find().sort({ createdAt: -1 }); // newest first
        res.json(tickets);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a ticket
app.post('/tickets', async (req, res) => {
    const { content } = req.body;
    if (!content) return res.status(400).json({ error: 'Ticket content is required.' });

    try {
        const newTicket = await Ticket.create({ content });
        res.json(newTicket);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a ticket
app.delete('/tickets/:id', async (req, res) => {
    try {
        await Ticket.findByIdAndDelete(req.params.id);
        res.json({ message: 'Ticket deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ====== Serve HTML ======
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ====== Start Server ======
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});