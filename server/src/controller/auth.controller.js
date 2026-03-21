const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')

async function registerUser(req, res) {
    const { username, email, password } = req.body
    try {
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({  // Added status code for better error handling
                message: 'User Already Exists'
            })
        }

        const hash = await bcrypt.hash(password, 10)
        const user = await User.create({  // Changed from 'user =' to 'const user'
            username,
            email,
            password: hash
        })

        res.status(201).json({
            message: "User Registered Successfully",
            user
        })

    } catch (error) {
        res.status(500).json({
            message: error.message  // Changed to error.message to get actual error text
        })
    }
}

async function loginUser(req, res) {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "User Not Exists"  // Fixed typo: "Exist" to "Exists"
            })
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

        // generate token
        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        // cookies
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            message: "Login Successful",
            token,
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({  // Added error response for login
            message: error.message
        })
    }
}

function logoutUser(req, res) {

    res.clearCookie("token")

    res.json({
        message: "Logged out successfully"
    })
}

async function getme(req, res) {
    const user = await User.findById(req.user.id)


    res.status(200).json({
        message: 'user details fetched sucessfully',
        user: {
            id: user._id,
            email: user.email,
            username: user.username
        }
    })
}

module.exports = { registerUser, loginUser, logoutUser, getme }