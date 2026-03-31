const Room = require('../models/Room')

const roomUsers = new Map();

function roomHandler(io) {
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        socket.on('join_room', async ({ roomId, username }) => {
            try {
                const room = await Room.findOne({ roomId });

                if (!room) {
                    return socket.emit('room_error', {
                        message: 'Room not found'
                    });
                }

                socket.join(roomId);
                socket.roomId = roomId;
                socket.username = username || 'Anonymous';

                if (!roomUsers.has(roomId)) {
                    roomUsers.set(roomId, []);
                }

                const users = roomUsers.get(roomId);

                const alreadyJoined = users.find(
                    (user) => user.socketId === socket.id
                );

                if (!alreadyJoined) {
                    users.push({
                        socketId: socket.id,
                        username: socket.username
                    });
                }

                roomUsers.set(roomId, users);

                socket.emit('load_room_data', {
                    roomId: room.roomId,
                    name: room.name,
                    code: room.code,
                    language: room.language
                });

                io.to(roomId).emit('room_users', users);

                socket.to(roomId).emit('user_connected', {
                    socketId: socket.id,
                    username: socket.username
                });

                console.log(`${socket.username} joined room ${roomId}`);
            } catch (error) {
                console.log('join_room error:', error.message);

                socket.emit('room_error', {
                    message: 'Failed to join room'
                });
            }
        });

        socket.on('code_change', async ({ roomId, code }) => {
            try {
                socket.to(roomId).emit('receive_code_change', { code });

                await Room.findOneAndUpdate(
                    { roomId },
                    { code },
                    { new: true }
                );
            } catch (error) {
                console.log('code_change error:', error.message);
            }
        });

        socket.on('disconnect', () => {
            try {
                const roomId = socket.roomId;

                if (roomId && roomUsers.has(roomId)) {
                    const updatedUsers = roomUsers
                        .get(roomId)
                        .filter((user) => user.socketId !== socket.id);

                    if (updatedUsers.length > 0) {
                        roomUsers.set(roomId, updatedUsers);
                    } else {
                        roomUsers.delete(roomId);
                    }

                    io.to(roomId).emit('room_users', updatedUsers);

                    socket.to(roomId).emit('user_disconnected', {
                        socketId: socket.id,
                        username: socket.username
                    });
                }

                console.log('User disconnected:', socket.id);
            } catch (error) {
                console.log('disconnect error:', error.message);
            }
        });

        socket.on('code_change', ({ roomId, code }) => {
            
        
            socket.to(roomId).emit('code_update', code);
        });
    });
}

module.exports = roomHandler;