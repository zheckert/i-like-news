import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../context/UserProvider"


export const Navbar = () => {
    const { logout } = useContext(UserContext)
    return(
            <div>
                <Link to="/public">All News</Link>
                <Link to="/profile">Profile</Link>
                <button onClick={() => logout()}>
                    Logout
                </button>
            </div>
    )
}