// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

// ------------------------
// MIDDLEWARE
// ------------------------
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // serve frontend files

// ------------------------
// DATABASE CONNECTION
// ------------------------
const mongoURI = process.env.MONGO_URI || "mongodb+srv://wintersadvocate_db_user:YEB5WGBcbiLOrlWK@cluster0.1osugwq.mongodb.net/helpdeskDB";

mongoose.connect(mongoURI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.error("MongoDB connection error:", err));

// ------------------------
// SCHEMA & MODEL
// ------------------------
const ticketSchema = new mongoose.Schema({
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Ticket = mongoose.model("Ticket", ticketSchema);

// ------------------------
// ROUTES
// ------------------------

// Get all tickets
app.get("/tickets", async (req, res) => {
    try {
        const tickets = await Ticket.find().sort({ createdAt: -1 });
        res.json(tickets);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch tickets" });
    }
});

// Add a ticket
app.post("/tickets", async (req, res) => {
    try {
        const { text } = req.body;
        if (!text || text.trim() === "") return res.status(400).json({ error: "Ticket cannot be empty" });

        const newTicket = new Ticket({ text });
        await newTicket.save();
        res.json(newTicket);
    } catch (err) {
        res.status(500).json({ error: "Failed to add ticket" });
    }
});

// Delete a ticket
app.delete("/tickets/:id", async (req, res) => {
    try {
        const deleted = await Ticket.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Ticket not found" });
        res.json({ message: "Ticket deleted", id: req.params.id });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete ticket" });
    }
});

// ------------------------
// SERVER START
// ------------------------
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});