import React from "react"

export const AuthForm = (props) => {
    const {
        handleChange,
        handleSubmit,
        buttonText,
        errorMessage,
        inputs : {
            username,
            password
        }
    } = props

    //style the error message, don't forget thank you

    return(
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={username}
                name="username"
                onChange={handleChange}
                placeholder="Username"
            />
            <input
                type="text"
                value={password}
                name="password"
                onChange={handleChange}
                placeholder="Password"
            />
            <button>{ buttonText }</button>
            <p>{errorMessage}</p>
        </form>
    )
}