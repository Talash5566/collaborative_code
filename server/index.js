require('dotenv').config()

const connectDB = require('../server/src/config/db.js')
const app = require('./src/app')

async function startServer() {
    try {
        await connectDB()

        app.listen(3000, () => {
            console.log("Backend is running on port 3000")
        })
    } catch (error) {
        console.log("Server failed to start:", error.message)
    }
}

startServer()