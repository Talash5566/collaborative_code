const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, _ and -'],
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    avatarColor: {
        type: String,
        default: '#378ADD'
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);