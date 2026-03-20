const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    name: {
        type: String,
        default: 'Untitled room'
    },
    code: {
        type: String,
        default: '// Start coding here\n'
    },
    language: {
        type: String,
        default: 'javascript'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);