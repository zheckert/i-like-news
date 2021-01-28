const express = require("express")
const authRouter = express.Router()
const User = require("../models/user.js")
const jwt = require("jsonwebtoken")
const auth = require("basic-auth")
const user = require("../models/user.js")

// Signup Route
authRouter.post("/signup", (request, response, next) => {
    User.findOne({ username: request.body.username.toLowerCase() }, (error, user) => {
        if(error){
            response.status(500)
            return next(error)
        }
        //if user is truthy, it already exists, hence error message
        if(user){
            response.status(403)
            return next(new Error("Username already exists."))
        }
        const newUser = new User(request.body)
        newUser.save((error, savedUser) => {
            if(error){
                response.status(500)
                return next(error)
            }
            const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
            return response.status(201).send({ token, user: savedUser.withoutPassword() })
        })
    })
})

// Login Route
authRouter.post("/login", (request, response, next) => {
    User.findOne({ username: request.body.username.toLowerCase()}, (error, user) => {
        if(error){
            response.status(500)
            return next(error)
        }
        if(!user){
            response.status(403)
            return next( new Error("Hmmm, something's not right. Please try again!"))
        }

        user.checkPassword(request.body.password, (error, isMatch) => {
            if(error){
                response.status(403)
                return next(new Error("Hmmm, something's not right. Please try again!"))
            }
            if(!isMatch){
                response.status(403)
                return next(new Error("Hmmm, something's not right. Please try again!"))
            }
            const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
            response.status(200).send({ token, user: user.withoutPassword() })
        })
    })
})


module.exports = authRouter