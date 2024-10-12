import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

const HostLayout = () => {

    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    return (
        <>
            <nav className="host-nav">
                <NavLink
                    to="/host"
                    end
                    style={({ isActive }) => isActive ? activeStyles : undefined}
                >
                    Dashboard</NavLink>
                <NavLink
                    to="/host/income"
                    style={({ isActive }) => isActive ? activeStyles : undefined}
                >
                    Income</NavLink>
                <NavLink
                    to="/host/reviews"
                    style={({ isActive }) => isActive ? activeStyles : undefined}
                >
                    Reviews</NavLink>
            </nav>
            <Outlet />
        </>
    )
}

export default HostLayout;