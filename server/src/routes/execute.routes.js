const express = require('express');
const router = express.Router();

router.post('/run', async (req, res) => {
    try {
        const { code, language } = req.body;

        if (!code) {
            return res.status(400).json({
                success: false,
                message: 'Code is required'
            });
        }

        // TEMP: fake execution (we will upgrade later)
        return res.json({
            success: true,
            output: `Output:\n\n${code}`
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;