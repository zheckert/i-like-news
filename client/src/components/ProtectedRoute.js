import React from "react"
import { Route, Redirect } from "react-router-dom"

export const ProtectedRoute = (props) => {
    const { path, redirectTo, component: Stuff, token, ...rest } = props
    return token ? 
        <Route path={path} render={() => <Stuff {...rest}/>}/> :
        <Redirect to={redirectTo} />
}