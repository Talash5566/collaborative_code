const {Router} = require('express')

const {registerUser , loginUser} = require('../controller/auth.controller')

const authRouter = Router()

authRouter.post('/register', registerUser)
authRouter.post('/login',loginUser)
//authRouter.post('/logout' , logoutUser)
//authRouter.get('/get-me',authUser,getme)

module.exports = authRouter




