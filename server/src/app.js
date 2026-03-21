const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const RoomRouter = require('./routes/room.routes');
const authRouter = require('./routes/auth.routes');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors())

app.get('/', (req,res)=>{
    res.json({
        success: true ,
        messege: "server running"
    })
})

app.use('/api/auth' , authRouter)
app.use('/api/rooms' , RoomRouter)

module.exports = app;