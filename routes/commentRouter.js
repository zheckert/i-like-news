const express = require("express")
const commentRouter = express.Router()
const Comment = require("../models/comment")

//get all comments
commentRouter.get("/", (request, response, next) => {
    Comment.find()
        .populate("user", "username")
        .exec((error, comments) => {
                if(error){
                    response.status(500)
                    return next(error)
                }
                return response.status(200).send(comments)
            })
})

// add new comment
commentRouter.post("/", (request, response, next) => {
    request.body.user = request.user._id
    const newComment = new Comment(request.body)
    newComment.save((error, savedComment) => {
        if(error){
            response.status(500)
            return next(error)
        }
        return response.status(201).send(savedComment)
    })
})

module.exports = commentRouter