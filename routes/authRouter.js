const express = require("express")
const authRouter = express.Router()
const User = require("../client/models/user.js")
const jwt = require("jsonwebtoken")

// Signup Route
authRouter.post("/signup", (request, response, next) => {
    User.findOne({ username: request.body.username }, (error, user) => {
        if(error){
            response.status(500)
            return next(error)
        }
        //if user is truthy, it already exists, hence error message
        if(user){
            response.status(403)
            return next(new Error("Username already exists."))
        }
        const newUser = new User(req.body)
        newUser.save((error, savedUser) => {
            if(error){
                response.status(500)
                return next(error)
            }
            const token = jwt.sign(savedUser.toObject(), process.env.SECRET)
            return response.status(201).send({ token, user: savedUser })
        })
    })
})


module.exports = authRouter