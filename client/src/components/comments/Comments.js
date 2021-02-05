import React from "react"
import { Comment } from "./Comment"

export const Comments = (props) => {
    const { comment } = props
    return(
        <div>            
            { comment.map(post => <Comment {...post} username={post.user?.username} key={post._id}/>) }
        </div>
    )
}