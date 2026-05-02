const express = require('express');
const router = express.Router();
const Slot = require('../models/Slot');

// Initialize slots (e.g., POST /api/slots/initialize with { count: 10 })
router.post('/initialize', async (req, res) => {
    try {
        const { count } = req.body;
        if (!count || count <= 0) {
            return res.status(400).json({ message: 'Valid slot count is required' });
        }

        // Clear existing slots first (optional based on reset requirements)
        await Slot.deleteMany({});

        const slots = [];
        for (let i = 1; i <= count; i++) {
            slots.push({ slotNumber: i, isOccupied: false });
        }

        await Slot.insertMany(slots);
        res.status(201).json({ message: `${count} slots initialized successfully` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// View all slots
router.get('/', async (req, res) => {
    try {
        const slots = await Slot.find().sort({ slotNumber: 1 });
        res.json(slots);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// View available slots
router.get('/available', async (req, res) => {
    try {
        const slots = await Slot.find({ isOccupied: false }).sort({ slotNumber: 1 });
        res.json(slots);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
