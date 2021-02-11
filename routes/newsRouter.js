const express = require("express")
const newsRouter = express.Router()
const News = require("../models/news")
const Votes = require("../models/votes")

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

//upvote- although I can probably account for all vote types with a single route I think
newsRouter.post("/vote/:newsId", (request, response, next) => {
    //basically, what will happen is that a user will vote, their username and news will be compared to an array. Based on that data, 3 things can happnen:
    //1. the user hasn't voted, and their id and vote type(up or down) is taken and pushed to the news item's array
    //2. the user has voted, and clicked the same arrow. This would remove their id and vote type from the news item's array
    //3. the user has voted, and clicked the opposite arrow of their inital vote. This removes their initial id and vote type (or maybe alters the vote type?)
    let user = request.user

    if( user && voteType === request.body.user){
        News.insertOne({user: user, vote: "Up"},
            (error, updatedPost) => {
                if(error){
                    response.status(500)
                    return next(error)
                }
                return response.status(201).send(updatedPost)
            }
        )
    }else if( user != request.body.user){
        News.replaceOne({user: user, vote: "Up"},
        (error, updatedPost) => {
            if(error){
                response.status(500)
                return next(error)
            }
            return response.status(201).send(updatedPost)
        })
    }else{
        News.replaceOne({user: user, vote: "Up"},
        (error, updatedPost) => {
            if(error){
                response.status(500)
                return next(error)
            }
            return response.status(201).send(updatedPost)
        })
    }
    

  
    Votes.findOneAndUpdate(
        { _id: request.params.newsId },
        { $inc: { votes: 1}, user: user},
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
        { _id: request.params.newsId },
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