// import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import { loginUser } from "./api"

export default function Login() {
    const [loginFormData, setLoginFormData] = useState<{
        email: string,
        password: string
    }>({ email: "", password: "" })

    const [status, setStatus] = useState("idle")
    const [error, setError] = useState<{ message: string } | null>(null)

    const location = useLocation()

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setStatus("submitting")
        loginUser(loginFormData)
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                setError(err)
            })
            .finally(() => {
                setStatus("idle")
            })
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        setLoginFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="login-container">
            {
                location.state?.message &&
                <h3 className="login-first">{location.state.message}</h3>
            }
            <h1>Sign in to your account</h1>
            {
                error?.message &&
                <h3 className="login-first">{error.message}</h3>
            }
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    name="email"
                    onChange={handleChange}
                    type="email"
                    placeholder="Email address"
                    value={loginFormData.email}
                />
                <input
                    name="password"
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                    value={loginFormData.password}
                />
                <button
                    disabled={status === "submitting"}
                >
                    {status === "submitting"
                        ? "Logging in..."
                        : "Log in"
                    }
                </button>
            </form>
        </div>
    )

}