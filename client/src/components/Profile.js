import React, { useContext, useEffect } from "react"
import { UserContext } from "../context/UserProvider"
import { NewsForm } from "./NewsForm"
import { News } from "./News"

export const Profile = () => {

    const { 
        user: {
            username
        }, 
        addNews,
        news,
        getUserNews, 
        userNews
    } = useContext(UserContext)

    useEffect(() => {
        getUserNews()
    }, [])

    return(
        <div>
            <h1>{username}'s Profile</h1>
            <div>
                <NewsForm addNews={addNews} />
            </div>
            <div>
                {userNews.map(post =>
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