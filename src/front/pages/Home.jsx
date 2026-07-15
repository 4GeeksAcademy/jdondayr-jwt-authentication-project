import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

// HOME USED AS LANDING LOGIN PAGE

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	return (
		<div className="login-box">
			<div className="link-to-register">
				<h5>Alredy not registered?</h5>
				<Link to="/register">Sign up here</Link>
			</div>
		</div>
	)
	
}; 