import React, { useContext, useState } from "react"
import { newsContext } from "../../context/newsContext"
import { UserContext } from "../../context/UserProvider"
import { CommentForm } from "./CommentForm"

export const Comment = (props) => {
    const { commentId, postId, comment, userId, username, _id, key, TESTPROP} = props
    const { deleteComment, editComment } = useContext(newsContext)
    const { user } = useContext(UserContext)

    //edit state for the comment form lives here:
    const [commentFormEdit, setCommentFormEdit] = useState(false)
    const close = () => {
        setCommentFormEdit(prevEdit  => !prevEdit )
    }

    // console.log("this is the id I need to pass in maybe?", TESTPROP)
    return(
        <div>
            {userId === user._id ?
                <div>
                    { !commentFormEdit ?
                        <>
                            <div>
                                <p>{username}:{comment}
                                    <button 
                                        onClick={() => deleteComment(TESTPROP._id)}>delete
                                    </button>
                                    <button 
                                        onClick={() => setCommentFormEdit(prevEdit => !prevEdit)}>edit
                                    </button>
                                </p> 
                            </div>
                        </>
                    :
                        <>
                            <CommentForm 
                                id={_id}
                                close={close}
                                submit={editComment}
                                commentId={commentId}
                                postId={postId}
                            />
                        </>
                    }
                </div>
            :
                <div>
                    <div>
                        <p>{username}: {comment}</p> 
                    </div>
                </div>
            }
        </div>
    ) 
}