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
    const [votes, setVotes] = useState([])
    const [comments, setComments] = useState([])

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

    const upVote = (newsId) => {
        userAxios.put(`/api/news/upvote/${newsId}`)
            //make downvote the same
            .then(response => setAllNews(prevNews => prevNews.map(post => post._id === newsId ? response.data : post)))
            .catch(error => console.log(error))
    }

    const downVote = (newsId) => {
        userAxios.put(`/api/news/downvote/${newsId}`)
        .then(response => setAllNews(prevNews => prevNews.map(post => post._id === newsId ? response.data : post)))
        .catch(error => console.log(error))
    }

    return(
        <newsContext.Provider value={{...userState, addNews, getNews, allNews, userNews, upVote, downVote, votes, setVotes, addComment, getComments, comments }}>
            { props.children }
        </newsContext.Provider>
    )
}