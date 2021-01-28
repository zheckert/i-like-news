import React, { useState, useContext } from "react"
import {AuthForm} from "./AuthForm"
import { UserContext } from "../context/UserProvider.js"

const initialInputs = { username: "", password: "" }

export const Auth = () => {
    const[inputs, setInputs] = useState(initialInputs)
    const[toggle, setToggle] = useState(false)

     const { signup, login, errorMessage, removeAuthError } = useContext(UserContext)

    const handleChange = (e) => {
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }
    
    const handleSignup = (e) => {
        e.preventDefault()
        signup(inputs)
    }

    const handleLogin = (e) => {
        e.preventDefault()
        login(inputs)
    }

    const toggleForm = () => {
        setToggle(prev => !prev)
        removeAuthError()
    }

    return(
        <div>
            {toggle ?
                <>
                    <AuthForm
                        handleChange={handleChange}
                        handleSubmit={handleSignup}
                        inputs={inputs}
                        buttonText="Sign Up"
                        errorMessage={errorMessage}
                    />
                    <p onClick={toggleForm}>Already have an account?</p>
                </>
            :
                <>
                    <AuthForm
                        handleChange={handleChange}
                        handleSubmit={handleLogin}
                        inputs={inputs}
                        buttonText="Login"
                        errorMessage={errorMessage}
                    />
                    <p onClick={toggleForm}>Don't have an account?</p>
                </>
            }
        </div>
    )
}
