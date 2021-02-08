import React, { useState, useContext } from "react"
import { newsContext } from "../../context/newsContext"


const initialInputs = {
    title: "",
    description: ""
}

export const NewsForm = (props) => {
    const [inputs, setInputs] = useState(initialInputs)
    const { addNews } = useContext(newsContext)

    const handleChange = (e) => {
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addNews(inputs)
        setInputs(initialInputs)
    }

    const { title, description } = inputs

    return(
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
                placeholder="Title"
            />
            <input
                type="text"
                name="description"
                value={description}
                onChange={handleChange}
                placeholder="Your description"
            />
            <button>Post</button>
        </form>
    )


}