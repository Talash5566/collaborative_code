async function runCode(req, res) {
    try {
        const { code, language } = req.body;

        if (!code) {
            return res.status(400).json({
                success: false,
                message: 'Code is required'
            });
        }

        if (!language) {
            return res.status(400).json({
                success: false,
                message: 'Language is required'
            });
        }

        // temporary dummy response
        return res.status(200).json({
            success: true,
            output: `Output:\n\n${code}`
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to run code',
            error: error.message
        });
    }
}

module.exports = { runCode };