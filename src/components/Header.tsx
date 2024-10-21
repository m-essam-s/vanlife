import { NavLink } from "react-router-dom"

const Header = () => {
    return (
        <header>
            <NavLink className="site-logo" to="/">#VanLife</NavLink>
            <nav>
                <NavLink
                    className={({ isActive }) => (isActive ? "active-link" : "")}
                    to="/host"
                >
                    Host</NavLink>
                <NavLink
                    className={({ isActive }) => (isActive ? "active-link" : "")}
                    to="/about"
                >
                    About</NavLink>
                <NavLink
                    className={({ isActive }) => (isActive ? "active-link" : "")}
                    to="/vans"
                >
                    Vans</NavLink>
                <NavLink to="login" className="login-link">
                    <img
                        src="/avatar-icon.png"
                        className="login-icon"
                    />
                </NavLink>
            </nav>
        </header>
    )
}

export default Header;