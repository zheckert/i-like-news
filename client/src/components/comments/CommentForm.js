import React, { useState, useContext } from "react"
import { UserContext } from "../../context/UserProvider"

const initialInputs = {
    comment: "",
}

export const CommentForm = (props) => {
    const [inputs, setInputs] = useState(initialInputs)
    const { addComment } = useContext(UserContext)

    const handleChange = (e) => {
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addComment({comment: inputs.comment, post: props.id})
        setInputs(initialInputs)
    }

    const { comment } = inputs

    return(
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="comment"
                value={comment}
                onChange={handleChange}
                placeholder="Type your goofy thoughts out here"
            />
            <button>Post</button>
        </form>
    )


}