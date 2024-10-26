import { NavLink } from "react-router-dom"

const Header = () => {

    const isLoggedin = localStorage.getItem("loggedin")


    const fakeLogOut = () => {
        localStorage.removeItem("loggedin")
    }

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
                {isLoggedin === "true" ?
                    <NavLink to="." className="login-link">
                        <button onClick={
                            fakeLogOut
                        }>
                            Logout
                        </button>
                    </NavLink>
                    :
                    <NavLink to="login" className="login-link">
                        <img
                            src="/avatar-icon.png"
                            className="login-icon"
                        />
                    </NavLink>
                }
            </nav>
        </header>
    )
}

export default Header;