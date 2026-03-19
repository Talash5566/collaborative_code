const mongoose = require('mongoose')

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB Connected Successfully")
    } catch (error) {
        console.log("MongoDB connection error:", error.message)
        throw error
    }
}

module.exports = connectDB