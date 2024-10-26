// Check the authenticated status of the user
// If they're NOT authenticated
// send the user to the login page
// If they ARE authenticated

import { Navigate, Outlet } from "react-router-dom";

// Render the Outlet
export default function AuthRequired() {
    const isAuthenticated: boolean = false;
    if (!isAuthenticated) {
        return <Navigate
            to="/login"
            state={{ message: "You must log in first" }}
        />
    }
    return <Outlet />;

}