import React, { useContext } from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { Auth } from "./components/Auth"
import { Navbar } from "./components/Navbar"
import { Public } from "./components/Public"
import { Profile } from "./components/Profile"
import { ProtectedRoute } from "./components/ProtectedRoute"

//make index.js to handle components so I don't have a stupid list 
    //     Each item can be upvoted or downvoted.
    //         User's should only be able to upvote/downvote once per issue.
    //     Items will be ordered by upvotes (the most being at the top).
    //     Each item should show the total number of votes

    // Users can comment on posts (unlimited number of comments per post)
    // You will create a back end with the needed 'models' and 'routes' so that all topics, comments, and votes are persistent.

import { UserContext } from "./context/UserProvider"

export const App = () => {
  const { token, logout } = useContext(UserContext)
  return(
    <div>
      { token && <Navbar logout={ logout }/> }
        <Switch>
          <Route
            exact path="/"
            render={() => token ? <Redirect to="/public"/> : <Auth/>}
          />
          <ProtectedRoute
            path="/public"
            component={Public}
            redirectTo="/"
            token={token}
          />
          <ProtectedRoute
            path="/profile"
            component={Profile}
            redirectTo="/"
            token={token}
          />
        </Switch>
    </div>
    
    
  )
}
