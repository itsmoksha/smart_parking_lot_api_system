const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        
        // Optional: Ping the database to confirm it's responsive (like in your snippet)
        const admin = new mongoose.mongo.Admin(mongoose.connection.db);
        const result = await admin.ping();
        console.log("📡 Database Pinged: Successful");

    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
