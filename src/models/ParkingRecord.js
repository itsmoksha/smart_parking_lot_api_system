const mongoose = require('mongoose');

const parkingRecordSchema = new mongoose.Schema({
    numberPlate: {
        type: String,
        required: true
    },
    slotNumber: {
        type: Number,
        required: true
    },
    entryTime: {
        type: Date,
        default: Date.now
    },
    exitTime: {
        type: Date
    },
    status: {
        type: String,
        enum: ['IN', 'OUT'],
        default: 'IN'
    },
    duration: {
        type: Number // in minutes
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ParkingRecord', parkingRecordSchema);
