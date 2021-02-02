const { response } = require("express")
const express = require("express")
const newsRouter = express.Router()
const News = require("../models/news")

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
newsRouter.put("/:newsId", (request, response, next) => {
    News.findOneAndUpdate(
        { _id: request.params.newsId, user: request.user._id },
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

//delete a news post
newsRouter.delete("/:newsId", (request, response, next) => {
    News.findOneAndDelete(
        { _id: request.params.newsId, user: request.user._id },
        (error, deletedPost) => {
            if(error){
                response.status(500)
                return next(error)
            }
            return response.status(201).send(`"${deletedPost.title}" removed successfully!`)
        }
    )
})

//upvote
newsRouter.put("/upvote/:newsId", (request, response, next) => {
    console.log(response)
    News.findOneAndUpdate(
        { newsId: request.params._id },
        { $inc: { votes: 1}},
        { new: true },
        (error, updatedPost) => {
            if(error){
                response.status(500)
                return next(error)
            }
            return response.status(201).send(updatedPost)
        }
    )
})
//down
newsRouter.put("/downvote/:newsId", (request, response, next) => {
    News.findOneAndUpdate(
        { newsId: request.params._id },
        { $inc: { votes: -1}},
        { new: true },
        (error, updatedPost) => {
            if(error){
                response.status(500)
                return next(error)
            }
            return response.status(201).send(updatedPost)
        }
    )
})

module.exports = newsRouter