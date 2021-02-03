import React, { useEffect, useContext } from "react"
import { UserContext } from "../context/UserProvider"
import { NewsForm } from "./NewsForm"
import { News } from "./News"

//optional chaining added to username because I couldn't get it to render without it. This shouldn't affect anything, but I haven't used it before so I think I'll just leave the note there.

export const Public = () => {
    const { addNews, getNews, allNews } = useContext(UserContext)
    const sortedNews = allNews.sort((a, b) => b.votes - a.votes)

    useEffect(() => {
        getNews()
      }, [])

    return(
        <div>
            <h1>Add New Post</h1>
                <div>
                    <NewsForm addNews={addNews} />
                </div>
            <h2>All Posts</h2>
            <div>
                {sortedNews.map(post => 
                    <News 
                        {...post}
                        username={post.user?.username}
                        key={post._id}
                    />
                )}
            </div>
        </div>
    )
}