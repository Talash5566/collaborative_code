const express = require('express');
const {createRoom , getRoomId }= require('../controller/room.controller')
const authUser = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', authUser, createRoom);
router.get('/:id', authUser, getRoomId);

module.exports = router;