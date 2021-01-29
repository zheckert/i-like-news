import React, { useEffect, useContext } from "react"
import { UserContext } from "../context/UserProvider"
import { NewsFeed } from "./NewsFeed"
import { NewsForm } from "./NewsForm"
import { News } from "./News"



export const Public = () => {
    const { addNews, news, getNews, allNews } = useContext(UserContext)

    useEffect(() => {
        getNews()
      }, [])
      console.log(allNews)  
    return(
        <div>
            <h1>All Posts</h1>
            <div>
                {allNews.map(post => 
                    <News 
                        {...post}
                        username={post.user.username}
                        key={post._id}
                    />
                )}
            </div>
        </div>
    )
}