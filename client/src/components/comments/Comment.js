import React from "react"

export const Comment = (props) => {

    const { comment, username, _id} = props

    return(
        <div>
            <h3>{username}:</h3>
            <p>{comment}</p>
        </div>
    )
}