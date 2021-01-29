import React, { useContext } from "react"
import { UserContext } from "../context/UserProvider"
import { Votes } from "./Votes"

export const News = (props) => {
    
    const { title, description, username, _id } = props

    return(
        <div>
            <h1>{title}</h1>
            <p>{description}</p>
            <p><Votes /></p>
            <p>Posted by: {username}</p>
        </div>
    )
}