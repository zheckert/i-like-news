import React, { useContext } from "react"
import { UserContext } from "../context/UserProvider"
import { Votes } from "./Votes"

export const News = (props) => {
    // do my votes need to be in here, too?1?!? and the username? Hmm hmm hmmh hmm
    
    const { title, description, _id } = props
    const { user: {username}, } = useContext(UserContext)
    return(
        <div>
            <h1>{title}</h1>
            <p>{description}</p>
            <p><Votes /></p>
            <p>Posted by: {username}</p>
        </div>
    )
}