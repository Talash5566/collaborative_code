const { customAlphabet } = require('nanoid/non-secure');

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 6);

function generateRoomId() {
    const id = nanoid();
    return `${id.slice(0, 3)}-${id.slice(3)}`;
}

module.exports = generateRoomId;