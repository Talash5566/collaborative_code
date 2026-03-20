const jwt = require('jsonwebtoken')

function authUser(req , res , next){

    const token = req.cookies.token

    if(!token){
        return res.status(400).json({
            message:'No token found'
        })
    }

    try {

        const decoded = jwt.verify(token , process.env.JWT_SECRET)

        if(!decoded){
            return res.status(400).json({
                message:'verification failed'
            })
        }

        req.user = decoded
        next()


    } catch (error) {
        res.status(400).json({
            message:'problem in middleware'
        })
    }
}

module.exports = authUser