const express = require('express');
const router = express.Router();
const Room = require('../models/Room'); 

router.post('/run', async (req, res) => {
    try {
        const { code, language, roomId } = req.body; 

        if (!code) {
            return res.status(400).json({
                success: false,
                message: 'Code is required'
            });
        }

        
        const output = `Output:\n\n${code}`;

       
        if (roomId) {
            await Room.findOneAndUpdate(
                { roomId },
                { output, runError: '' }
            );
        }

        return res.json({
            success: true,
            output
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;