import React, { useContext, useState } from "react"
import { newsContext } from "../../context/newsContext"
import { UserContext } from "../../context/UserProvider"
import { CommentForm } from "./CommentForm"

export const Comment = (props) => {
    const { commentId, comment, userId, username, _id} = props
    const { deleteComment, editComment } = useContext(newsContext)
    const { user } = useContext(UserContext)

    //edit state for the comment form lives here:
    const [commentFormEdit, setCommentFormEdit] = useState(false)
    const close = () => {
        setCommentFormEdit(prevEdit  => !prevEdit )
    }

    return(
        <div>
            {userId === user._id ?
                <div>
                    { !commentFormEdit ?
                        <>
                            <div>
                                <p>{username}:{comment}
                                    <button 
                                        onClick={() => deleteComment(commentId), console.log("This is another log", commentId)}>delete
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