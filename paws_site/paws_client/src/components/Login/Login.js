import "./Login.scss";
import React from "react";
import axios from "axios";
import Logout from "../Logout/Logout.js";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { csrf_token } from "../../utils";

export default function Login() {
	const userJSON = localStorage.getItem("user");
	const user = JSON.parse(userJSON);
	const navigate = useNavigate();

	if (user) {
		return <Logout />;
	}

	const handleGoogleLoginSuccess = (credentialResponse) => {
		const postData = { credential: credentialResponse.credential };
		return axios
			.post("http://localhost:8000/googleLogin/", postData)
			.then((response) => {
				const userJSON = JSON.stringify(response.data.user);
				localStorage.setItem("user", userJSON);
				navigate("/");
			})
			.catch((error) => {
				console.log({ "Login Failed": error });
			});
	};

	const googleLoginProps = {
		onSuccess: handleGoogleLoginSuccess,
	
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		axios
			.post(`http://127.0.0.1:8000/login/`, {
				username: e.target.username.value,
				password: e.target.password.value,
			})
			.then((response) => {
				const user_id = response.data.user_id;
				const token = response.data.token;
				console.log("TOKEN", token);

				// Store token and user_id in localStorage
				localStorage.setItem("token", token);
				localStorage.setItem("user_id", user_id);

				// Set Authorization header for subsequent axios requests
				axios.defaults.headers.common.Authorization = `Token ${token}`;

				// Fetch user data using the user_id
				return axios
					.get(`http://127.0.0.1:8000/api/users/${user_id}`)
					.then((res) => {
						const userJSON = JSON.stringify(res.data);
						// Store user object in localStorage
						localStorage.setItem("user", userJSON);

						// Navigate to home page after successful login
						navigate("/");
					})
					.catch((error) => {
						console.log(error);
					});
			});
	};

	return (
		<main>
			<h2 className="login-form__title">Log In</h2>

			<GoogleLogin {...googleLoginProps} />

			<form className="login-form" onSubmit={handleSubmit}>
				<input type="hidden" value={csrf_token} />

				<span className="divider sign-in">
					*** or sign in with email ***
				</span>
				<div className="login-form__div">
					<input
						className="login-form__input"
						type="text"
						name="username"
						placeholder="Username"
					/>
				</div>
				<div className="login-form__div">
					<input
						className="login-form__input"
						type="password"
						name="password"
						placeholder="Password"
					/>
				</div>
				<div className="login-form__div">
					<button className="submit-button" type="submit">
						Log In
					</button>
				</div>
			</form>
		</main>
	);
}
