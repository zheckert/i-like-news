import React, { useState } from "react"
import axios from "axios"

// I could to move some stuff to another context provider.

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
        comments: [],
        errorMessage: ""
    }

    const [userState, setUserState] = useState(initialState)
    const [userNews, setUserNews] = useState([])

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
            news: [],
            comments: []
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

    //user-specific news
    const getUserNews = () => {
        userAxios.get("/api/news/user")
            .then(response => setUserNews(response.data))
            .catch(error => console.log(error))
    }

    return(
        <UserContext.Provider value={{...userState, signup, login, logout, getUserNews, removeAuthError, userNews }}>
            { props.children }
        </UserContext.Provider>
    )
}