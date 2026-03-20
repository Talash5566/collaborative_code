const {Router} = require('express')
const authUser = require('../middleware/auth.middleware')
const {registerUser , loginUser , logoutUser , getme} = require('../controller/auth.controller')

const authRouter = Router()

authRouter.post('/register', registerUser)
authRouter.post('/login',loginUser)
authRouter.post('/logout' , logoutUser)
authRouter.get('/get-me',authUser,getme)

module.exports = authRouter




