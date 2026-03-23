require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');

const connectDB = require('./src/config/db');
const app = require('./src/app');
const roomHandler = require('./src/socket/socket.handeler')

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL ,
        methods: ['GET', 'POST'],
        credentials: true
    }
});

roomHandler(io);

async function startServer() {
    try {
        await connectDB();

        const PORT = process.env.PORT || 3000;

        server.listen(PORT, () => {
            console.log(`Backend is running on port ${PORT}`);
        });
    } catch (error) {
        console.log('Server failed to start:', error.message);
    }
}

startServer();