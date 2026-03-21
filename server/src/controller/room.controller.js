const Room = require('../models/Room')
const generateRoomId = require('../utils/generateRoomId')

async function createRoom(req, res) {
    try {
        const { name, language } = req.body
        const roomId = generateRoomId();

        const room = await Room.create({
            roomId,
            name: name || 'Untitled room',
            code: '// Start coding here\n',
            language: language || 'javascript',
            createdBy: req.user.id || null
        })

        return res.status(201).json({
            success: true,
            messege: "Room Created Sucessful",
            room
        })
    } catch (error) {
        console.log('Create room error:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Failed to create room',
            error: error.message
        });
    }
}

async function getRoomId(req, res) {
    try {
        const { id } = req.params

        const room = await Room.findOne({ roomId: id })

        if (!room) {
            return res.status(404).json({
                success: false,
                message: 'Room not found'
            })
        }
        return res.status(200).json({
            success: true,
            room
        });
    } catch (error) {
        console.log('Get room error:', error.message);

        return res.status(500).json({
            success: false,
            message: 'Failed to fetch room',
            error: error.message
        });
    }
}

module.exports = {createRoom , getRoomId}