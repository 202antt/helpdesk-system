// server.js
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()

// Middleware
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

// MongoDB connection
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/helpdeskDB'

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err))

// Ticket model
const TicketSchema = new mongoose.Schema({
    text: String
})
const Ticket = mongoose.model('Ticket', TicketSchema)

// Routes
app.get('/tickets', async (req, res) => {
    try {
        const tickets = await Ticket.find()
        res.json(tickets)
    } catch (err) {
        res.status(500).json({ message: 'Error fetching tickets' })
    }
})

app.post('/tickets', async (req, res) => {
    try {
        const newTicket = new Ticket({ text: req.body.ticket })
        const savedTicket = await newTicket.save()
        res.json({ ticket: savedTicket })
    } catch (err) {
        res.status(500).json({ message: 'Error saving ticket' })
    }
})

app.delete('/tickets/:id', async (req, res) => {
    try {
        await Ticket.findByIdAndDelete(req.params.id)
        res.json({ message: 'Ticket deleted' })
    } catch (err) {
        res.status(500).json({ message: 'Error deleting ticket' })
    }
})

// Dynamic port
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))