import React, { useEffect, useContext } from "react"
import { UserContext } from "../context/UserProvider"
import { NewsFeed } from "./NewsFeed"
import { NewsForm } from "./NewsForm"
import { News } from "./News"



export const Public = () => {
    const { addNews, news, getNews, allNews } = useContext(UserContext)
    //can I map through the news, then sort them by surrounding them with sort? hmm hmm hmm 
    // const user

    // <p>Posts from most to least popular</p>
    //         <p>Comments and votes accessible beneath each</p>

    useEffect(() => {
        getNews()
      }, [])

    return(
        <div>
            <h1>All Posts</h1>
            {/* <div>
                <h2>Add New</h2>
                <NewsForm addNews={addNews} />
            </div>
            <div>
                Top Posts
                <NewsFeed news={news}/>
            </div> */}
            <div>
                {allNews.map(post => 
                    <News 
                        {...post}
                        key={post._id}
                    />
                    )}
                    {/* {allNews} */}
            </div>
        </div>
    )
}