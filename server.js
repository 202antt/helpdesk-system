// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public')); // index.html and assets should be in /public

// Connect to MongoDB Atlas
mongoose.connect(
    'mongodb+srv://wintersadvocate_db_user:jHsQk8uIpEAJhLjq@cluster0.1osugwq.mongodb.net/helpdesk?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
);

const ticketSchema = new mongoose.Schema({
    content: String,
    timestamp: { type: Date, default: Date.now }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

// API endpoints
app.get('/tickets', async (req, res) => {
    const tickets = await Ticket.find();
    res.json(tickets);
});

app.post('/tickets', async (req, res) => {
    const ticket = new Ticket({ content: req.body.content });
    await ticket.save();
    res.json(ticket);
});

app.delete('/tickets/:id', async (req, res) => {
    await Ticket.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));