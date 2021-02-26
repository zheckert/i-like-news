import React, { useContext } from "react"
import { newsContext } from "../../context/newsContext"
import { Votes } from "../votes/Votes"
import { CommentForm } from "../comments/CommentForm"
import { Comment } from "../comments/Comment"

//Currently, you're filtering through EVERY SINGLE comment and then displaying. You can condense this so it scales better in an enterprise-level app situation

export const News = (props) => {

    const { getComments, comments } = useContext(newsContext)
    const { title, description, username, _id, votes } = props
    

    return(
        <div>
            <h1>{title}</h1>
            <p>Posted by: {username}</p>
            <p>{description}</p>
            <p><Votes votes={votes} id={_id} title={title}/></p>
            <div>
                <p>Comments:</p>
                <CommentForm id={_id}/>
                <div>
                    {/* {console.log("This is my comment log", comments)} */}
                    {comments.filter(comment => comment.post === _id).map(comment => 
                        <Comment userId={comment.user._id} username={comment.user.username} comment={comment.comment} postId={comment.post} key={comment._id} commentId={comment._id} TESTPROP={comment}/>, 
                    )}
                </div> 
            </div> 
        </div>
    )
}