import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {

    // Input control
    const [emailInput, setEmailInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate()

    // Register function with POST
    async function registerUser() {
        const newUser = {
            email: emailInput,
            password: passwordInput
        }
        try {
            const response = await fetch(backendUrl + "users", {
                method: "POST",
                body: JSON.stringify(newUser),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json()
            if (response.ok) {
                console.log(data)
                alert("User registered successfully")
                navigate("/login")
            }
            else if (response.status === 401 || response.status === 400) console.log(data)
        } catch (error) {console.log(error)}
    }


    return (
        <div className="register-login">
            <div className="register-login-box">
                <h1>Sign in</h1>
                <div className="input-div">
                    <label htmlFor="email">E-mail</label>
                    <input value={emailInput} onChange={(e)=>setEmailInput(e.target.value)} type="email" id="email" name="email" />
                </div>
                <div className="input-div">
                    <label htmlFor="password">Password</label>
                    <input value={passwordInput} onChange={(e)=>setPasswordInput(e.target.value)} type="password" name="password" id="password" />
                </div>
                <input onClick={registerUser} type="submit" value="Sign in" />
                <div className="d-flex gap-2">
                    <h5>Alredy an user?</h5>
                    <Link to="/login">Login here</Link>
                </div>
            </div>
        </div>
    )
}

export default Register;