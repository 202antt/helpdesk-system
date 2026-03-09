// server.js
require('dotenv').config(); // Load .env variables
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();

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