import React, {useContext} from "react"
import { UserContext } from "../context/UserProvider.js"

//items will be sorted by total votes. This component doesn't handle that; it will be handled elsewhere.
//when a vote button is pressed, make sure the user hasn't voted before. 
//if they have and press the same vote again, do nothing.
//if they have and press the other button, change their vote.
//If not, increase total votes by 1 and up or downvotes by 1.

export const Votes = () => {

    const { upVote } = useContext(UserContext)

    return(
        <div>
            <div>
                Total Votes: 0
            </div>
            <div>
                <button onClick={() => upVote()}>Upvote</button>
            </div>
            <div>
                <button>Downvote</button>
            </div>
        </div>
    )
}