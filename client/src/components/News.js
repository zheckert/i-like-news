import React from "react"
import { Votes } from "./Votes"

export const News = (props) => {

    const { title, description, username, _id, votes } = props

    return(
        <div>
            <h1>{title}</h1>
            <p>{description}</p>
            <p><Votes votes={votes} id={_id}/></p>
            <p>Posted by: {username}</p>
        </div>
    )
}