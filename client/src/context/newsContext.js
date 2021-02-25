import React, { useState } from "react"
import axios from "axios"


export const newsContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export const ContextProvider = (props) => {
    const initialState = { 
        user: JSON.parse(localStorage.getItem("user")) || {}, 
        token: localStorage.getItem("token") || "", 
        news: [],
        comments: [],
        errorMessage: ""
    }

    const [userState, setUserState] = useState(initialState)
    const [allNews, setAllNews] = useState([])
    const [userNews, setUserNews] = useState([])
    const [comments, setComments] = useState([])
    const [totalVotes, setTotalVotes] = useState(0)

    //all news
    const getNews = () => {
        userAxios.get("/api/news")
            .then(response => setAllNews(response.data))
            .then(getComments())
            .catch(error => console.log(error))
    }

    const addNews = (newNews) => {
        userAxios.post("/api/news", newNews)
        //note: not mentioning response. not sure if that's appropriate but it works so there
        .then(getNews())
        .catch(error => console.log(error.response.data.errorMessage))
    }
    
    const addComment = (newComment, id) => {
        userAxios.post("/api/comment", newComment)
        .then(getComments())
        .catch(error => console.log(error.response.data.errorMessage))
    }

    const getComments = () => {
        userAxios.get("/api/comment/")
            .then(response => setComments(response.data))
            .catch(error => console.log(error))
    }

    const editComment = (commentId) => {
        userAxios.put(`/api/comment/${commentId}`)
            .then(response => {
                setComments(prevComment => prevComment.map(comment => comment._id !== commentId ? comment : response.data))
            })
            .catch(error => console.log(error))
    }

    const deleteComment = (commentId) => {
        userAxios.delete(`/api/comment/${commentId}`)
            .then(response => {
                setComments(prevComments => prevComments.filter(comment => comment._id !== commentId))
            })
            .catch(error => console.log(error))
    }

    const upVote = (newsId) => {
        console.log("I Voted")
        userAxios.put(`/api/news/upvote/${newsId}`)
            .then(response => {
                    console.log(response.data)
                    setAllNews(prevNews => prevNews.map(post => post._id === newsId ? response.data : post))
                    getNews()
                }
            )
            .catch(error => console.log(error))
    }

    const downVote = (newsId) => {
        console.log("I down Voted")
        userAxios.put(`/api/news/downvote/${newsId}`)
        .then(response => {
            setAllNews(prevNews => prevNews.map(post => post._id === newsId ? response.data : post))
            getNews()
        }
    )
        .catch(error => console.log(error))
    }

    const voteCalculator = (post) => {
        let upVotes = post.votes.filter(vote => vote.voteType === "Up").length
	    let downVotes = post.votes.filter(vote => vote.voteType === "Down").length
        return upVotes - downVotes
    }

    return(
        <newsContext.Provider value={{...userState, addNews, getNews, allNews, userNews, upVote, downVote, addComment, getComments, editComment, deleteComment, comments, voteCalculator}}>
            { props.children }
        </newsContext.Provider>
    )
}