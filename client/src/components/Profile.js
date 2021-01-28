import React, { useContext } from "react"
import { UserContext } from "../context/UserProvider"
import { NewsFeed } from "./NewsFeed"
import { NewsForm } from "./NewsForm"
import { News } from "./News"


export const Profile = () => {
    const { user: {username}, addNews, news } = useContext(UserContext)
    return(
        <div>
            <h1>{username}'s Profile</h1>
            <div>
                <NewsForm addNews={addNews} />
                This shows all your posts and how popular they are.
                All stories
                comments
                upvotes
            </div>
            <div>
                Your Top Posts
                <NewsFeed news={news}/>

            </div>
        </div>
    )
}