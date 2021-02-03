import React, { useState } from "react"
import axios from "axios"

// I need to move some stuff to another context provider.

export const UserContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export const UserProvider = (props) => {
    const initialState = { 
        user: JSON.parse(localStorage.getItem("user")) || {}, 
        token: localStorage.getItem("token") || "", 
        news: [],
        errorMessage: ""
    }

    const [userState, setUserState] = useState(initialState)
    const [allNews, setAllNews] = useState([])
    const [userNews, setUserNews] = useState([])
    //maybe use this when it's not broken and dumb as heck
    const [votes, setVotes] = useState("")
    const [displayVotes, setDisplayVotes] = useState([])

    const signup = (credentials) => {
        axios.post("/auth/signup", credentials)
            .then(response => {
                const { user, token } = response.data
                console.log(localStorage)
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user,
                    token
                }))
            })
            .catch(error => handleAuthError(error.response.data.errorMessage))
    }

    const login = (credentials) => {
        axios.post("/auth/login", credentials)
            .then(response => {
                const { user, token } = response.data
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                getUserNews()
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user,
                    token
                }))
            })
            .catch(error => handleAuthError(error.response.data.errorMessage))
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUserState({
            user: {},
            token: "",
            news: []
        })
    }

    const handleAuthError = (errorMessage) => {
        setUserState(prevState => ({
            ...prevState,
            errorMessage
        }))
    }

    const removeAuthError = () => {
        setUserState(prevState => ({
            ...prevState,
            errorMessage: ""
        }))
    }

    //all news
    const getNews = () => {
        userAxios.get("/api/news")
            .then(response => setAllNews(response.data))
            .catch(error => console.log(error))
    }

    //user-specific news
    const getUserNews = () => {
        userAxios.get("/api/news/user")
            .then(response => setUserNews(response.data))
            .catch(error => console.log(error))
    }

    const addNews = (newNews) => {
        userAxios.post("/api/news", newNews)
        .then(response => {
            setUserState(prevState => ({
            ...prevState,
            news: [...prevState.news, response.data]
        }))
    })
        .catch(error => console.log(error.response.data.errorMessage))
    }

    const upVote = (newsId) => {
        console.log(newsId)
        userAxios.put(`/api/news/upvote/${newsId}`)
        .then(response => setAllNews(prevNews => prevNews.map(post => post._id === newsId ? response.data : post)))
        .catch(error => console.log(error))
    }

    const downVote = (newsId) => {
        userAxios.put(`/api/news/downvote/${newsId}`)
        .then(response => setAllNews(prevNews => prevNews.map(post => post._id === newsId ? response.data : post)))
        .catch(error => console.log(error))
    }

    return(
        <UserContext.Provider value={{...userState, signup, login, logout, addNews, getUserNews, removeAuthError, getNews, allNews, userNews, upVote, downVote, votes, setVotes}}>
            { props.children }
        </UserContext.Provider>
    )
}