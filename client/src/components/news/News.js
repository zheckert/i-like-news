import React, { useContext } from "react"
import { UserContext } from "../../context/UserProvider"
import { Votes } from "../votes/Votes"
import { CommentForm } from "../comments/CommentForm"
import { Comment } from "../comments/Comment"

export const News = (props) => {

    const { getComments, comments } = useContext(UserContext)

    const { title, description, username, _id, votes } = props

    return(
        <div>
            <h1>{title}</h1>
            <p>{description}</p>
            <p><Votes votes={votes} id={_id}/></p>
            <div>
                <p>Comments:</p>
                <CommentForm id={_id}/>
                <div>
                    {comments.map(post => <Comment 
                        {...post}
                        key={post._id}
                    />
                    )}
                </div>
                
                
            </div>
            <p>Posted by: {username}</p>
        </div>
    )
}

// {sortedNews.map(post => 
//     <News 
//         {...post}
//         username={post.user?.username}
//         key={post._id}
//     />
// )}