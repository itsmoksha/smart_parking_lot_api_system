const express = require('express');
const router = express.Router();
const Slot = require('../models/Slot');
const ParkingRecord = require('../models/ParkingRecord');

// Vehicle Entry: Register incoming vehicles
router.post('/entry', async (req, res) => {
    try {
        const { numberPlate } = req.body;
        if (!numberPlate) {
            return res.status(400).json({ message: 'Number plate is required' });
        }

        // Check if vehicle is already parked
        const existingRecord = await ParkingRecord.findOne({ numberPlate, status: 'IN' });
        if (existingRecord) {
            return res.status(400).json({ message: 'Vehicle is already inside the parking lot' });
        }

        // Find nearest available slot
        const slot = await Slot.findOne({ isOccupied: false }).sort({ slotNumber: 1 });
        if (!slot) {
            return res.status(404).json({ message: 'No parking slots available' });
        }

        // Create parking record
        const record = new ParkingRecord({
            numberPlate,
            slotNumber: slot.slotNumber
        });

        await record.save();

        // Update slot status
        slot.isOccupied = true;
        await slot.save();

        res.status(201).json({
            message: 'Vehicle entered successfully',
            record
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Vehicle Exit: Release slot and record exit time
router.post('/exit', async (req, res) => {
    try {
        const { numberPlate } = req.body;
        if (!numberPlate) {
            return res.status(400).json({ message: 'Number plate is required' });
        }

        // Find current record
        const record = await ParkingRecord.findOne({ numberPlate, status: 'IN' });
        if (!record) {
            return res.status(404).json({ message: 'Vehicle not found in parking lot' });
        }

        // Record exit details
        record.exitTime = new Date();
        record.status = 'OUT';
        
        // Calculate duration in minutes
        const diffMs = record.exitTime - record.entryTime;
        record.duration = Math.round(diffMs / (1000 * 60));

        await record.save();

        // Release the slot
        const slot = await Slot.findOne({ slotNumber: record.slotNumber });
        if (slot) {
            slot.isOccupied = false;
            await slot.save();
        }

        res.json({
            message: 'Vehicle exited successfully',
            record
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// View currently parked vehicles
router.get('/status', async (req, res) => {
    try {
        const parkedVehicles = await ParkingRecord.find({ status: 'IN' });
        res.json(parkedVehicles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Retrieve parking history
router.get('/history', async (req, res) => {
    try {
        const history = await ParkingRecord.find().sort({ entryTime: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get vehicle details using number plate
router.get('/vehicle/:numberPlate', async (req, res) => {
    try {
        const { numberPlate } = req.params;
        const records = await ParkingRecord.find({ numberPlate }).sort({ entryTime: -1 });
        if (records.length === 0) {
            return res.status(404).json({ message: 'No records found for this number plate' });
        }
        res.json(records);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Reset parking lot: Clear all slots and records (for demo purposes)
router.post('/reset', async (req, res) => {
    try {
        await Slot.updateMany({}, { isOccupied: false });
        await ParkingRecord.deleteMany({});
        res.json({ message: 'Parking lot reset successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
