const express = require("express")
const newsRouter = express.Router()
const News = require("../models/news")
// const Votes = require("../models/votes")

//get all news
newsRouter.get("/", (request, response, next) => {
    News.find()
        .populate("user", "username")
        .exec((error, news) => {
                if(error){
                    response.status(500)
                    return next(error)
                }
                return response.status(200).send(news)
            })
})

//all posts from a specific user
newsRouter.get("/user", (request, response, next) => {
    News.find({ user: request.user._id },)
        .populate("user", "username")
        .exec((error, userPosts) => {
                if(error){
                    response.status(500)
                    return next(error)
                }
                return response.status(200).send(userPosts)
            })
})

newsRouter.post("/", (request, response, next) => {
    request.body.user = request.user._id
    const newNewsPost = new News(request.body)
    newNewsPost.save((error, savedPost) => {
        if(error){
            response.status(500)
            return next(error)
        }
        return response.status(201).send(savedPost)
    })
})

//edit a news post
//tried passing in post after user but it didn't work: post: request.post 
newsRouter.put("/:commentId", (request, response, next) => {
    Comment.findOneAndUpdate(

        { _id: request.params.commentId, user: request.user._id, post: request.params.newsId, },
        request.body,
        { new: true },
        (error, editedPost) => {
            if(error){
                response.status(500)
                return next(error)
            }
            return response.status(201).send(editedPost)
        }
    )
})

//delete a COMMENT
newsRouter.delete("/comment/:commentId", (request, response, next) => {
    Comment.findOneAndDelete(
        { _id: request.params.newsId, user: request.user._id },
        (error, deletedComment) => {
            if(error){
                response.status(500)
                return next(error)
            }
            return response.status(201).send(`"${deletedComment.title}" removed successfully!`)
        }
    )
})

//maybe I should have one path and let the vote type be the differentiator? the button pressing on the front end will influence vote.voteType
//upvote
newsRouter.put("/upvote/:newsId", (request, response, next) => {
    let user = request.user
    News.findOneAndUpdate(
        { _id: request.params.newsId },
        { $addToSet: { votes: { user: user, voteType: "Up" } } },
        (error, updatedPost) => {
            if (error) {
                response.status(500)
                return next(error)
            }
            return response.status(201).send(updatedPost)
        }
    )
})

//down
newsRouter.put("/downvote/:newsId", (request, response, next) => {
    let user = request.user
    News.findOneAndUpdate(
        { _id: request.params.newsId },
        // { $addToSet: { votes: { user: user, voteType: "Down" } } }, apparently the code works below? RIGHT NOW YOU CANT VOTE LESS THAN 0
        { $pull: { votes: { user: user, voteType: "Up" } } },
        (error, updatedPost) => {
            if (error) {
                response.status(500)
                return next(error)
            }
            return response.status(201).send(updatedPost)
        }
    )
})

module.exports = newsRouter