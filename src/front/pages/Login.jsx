import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {

    // Input control
    const [emailInput, setEmailInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate()

    async function login() {
        const newLogin = {
            email: emailInput,
            password: passwordInput
        }
        try {
            const response = await fetch(backendUrl + "login", {
                method: "POST",
                body: JSON.stringify(newLogin),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json()
            if (response.ok) {
                localStorage.setItem("jwtoken", data.access_token)
                console.log(data)
                navigate("/profile")
            }
            else if (response.status === 401 ) {
                console.log(data)
                alert("Invalid email or password")
            }
            else if (response.status === 400) {
                console.log(data)
                alert("Email or password is missing")
            }
            
        } catch (error) {console.log(error)}
    }


    return (
        <div className="register-login">
            <div className="register-login-box">
                <h1>Login</h1>
                <div className="input-div">
                    <label htmlFor="email">E-mail</label>
                    <input value={emailInput} onChange={(e) => setEmailInput(e.target.value)} type="email" id="email" name="email" />
                </div>
                <div className="input-div">
                    <label htmlFor="password">Password</label>
                    <input value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} type="password" name="password" id="password" />
                </div>
                <input onClick={login} type="submit" value="Login" />
                <div className="d-flex gap-2">
                    <h5>Not registered?</h5>
                    <Link to="/register">Sign in here</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;