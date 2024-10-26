// Check the authenticated status of the user
// If they're NOT authenticated
// send the user to the login page
// If they ARE authenticated

import { Navigate, Outlet, useLocation } from "react-router-dom";

// Render the Outlet
export default function AuthRequired() {
    const isAuthenticated = localStorage.getItem("loggedin")
    const location = useLocation()

    if (!isAuthenticated) {
        return <Navigate
            to="/login"
            state={{ message: "You must log in first", fromLoc: location.pathname }}
            replace
        />
    }
    return <Outlet />;

}