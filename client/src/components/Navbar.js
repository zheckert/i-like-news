import React, { useContext } from "react"
import { UserContext } from "../context/UserProvider"
import { Link } from "react-router-dom"

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