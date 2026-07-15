import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

const PrivateProfile = () => {

    const { store, dispatch } = useGlobalReducer()
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate()

    // Get private profile view
    async function get_profile() {
        dispatch({ type: "loading_user_info" })
        const JWToken = localStorage.getItem("jwtoken")
        try {
            const response = await fetch(backendUrl + "users/me", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + JWToken
                }
            })
            const data = await response.json()
            console.log(data)
            dispatch({ type: "set_user_info", payload: data.user.email })
        } catch (error) { console.log(error) }
    }

    const logout = () => {
        localStorage.removeItem("jwtoken");
        dispatch({type: "restart_store"})
        navigate("/login")
    }

    useEffect(() => {
        const isLogged = Boolean(localStorage.getItem("jwtoken"));
        if (!isLogged) navigate("/login")
        get_profile()
    }, [])

    return (
        <div className="profile d-flex flex-column align-items-center">
            {store.loadingUser ? <h1>Loading user...</h1> : 
            <div className="d-flex flex-column align-items-center">
                <h1>Welcome back {store.userInfo}</h1>
                <h2>This is your profile private view</h2>
                <button className="btn btn-primary" onClick={logout}>Log out</button>
            </div>}
        </div>
    )
}



export default PrivateProfile