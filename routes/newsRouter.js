const express = require("express")
const newsRouter = express.Router()
const News = require("../client/models/news")

newsRouter.get("/", (req, res, next) => {
    News.find((error, news) => {
        if(error){
            res.status(500)
            return next(error)
        }
        return res.status(200).send(news)
    })
})

newsRouter.post("/", (req, res, next) => {
    const newNewsPost = new News(req.body)
    newNewsPost.save((error, savedPost) => {
        if(error){
            res.status(500)
            return next(error)
        }
        return res.status(200).send(savedPost)
    })
})

newsRouter.put("/newsId", (req, res, next) => {
    News.findOneAndUpdate(
        { _id: req.params.newsId },
        req.body,
        { new: true },
        (error, editedPost) => {
            if(error){
                res.status(500)
                return next(error)
            }
            return res.status(200).send(editedPost)
        }
    )
})

newsRouter.delete("/newsId", (req, res, next) => {
    News.findOneAndDelete(
        { _id: req.params.newsId },
        (error, deletedPost) => {
            if(error){
                res.status(500)
                return next(error)
            }
            return res.status(200).send(`"${deletedPost.title}" removed successfully!`)
        }
    )
})