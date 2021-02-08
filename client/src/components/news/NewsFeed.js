import React from "react"
import { News } from "./News"

export const NewsFeed = (props) => {
    const { news } = props
    
    return(
        <div>            
            { news.map(post => <News {...post} username={post.user?.username} key={post._id}/>) }
        </div>
    )
}