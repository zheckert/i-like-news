const express = require("express")
const newsRouter = express.Router()
const News = require("../models/news")

//gets all news, but make sure it's for logged in users only, thank you goodbye
newsRouter.get("/", (request, response, next) => {
    News.find((error, news) => {
        if(error){
            response.status(500)
            return next(error)
        }
        return response.status(200).send(news)
    })
})

//all posts from a specific user
newsRouter.get("/user", (request, response, next) => {
    News.find({ user: request.user._id }, (error, userPosts) => {
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
        return response.status(200).send(savedPost)
    })
})

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
            return response.status(200).send(editedPost)
        }
    )
})

newsRouter.delete("/:newsId", (request, response, next) => {
    News.findOneAndDelete(
        { _id: request.params.newsId, user: request.user._id },
        (error, deletedPost) => {
            if(error){
                response.status(500)
                return next(error)
            }
            return response.status(200).send(`"${deletedPost.title}" removed successfully!`)
        }
    )
})

module.exports = newsRouter