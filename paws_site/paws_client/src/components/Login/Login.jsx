import "./Login.scss";
import axios from "axios";
import Logout from "../Logout/Logout";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { csrf_token, base_url } from "../../utils";

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
			.post(`${base_url}/googleLogin/`, postData)
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
		
		if (!e.target.username.value || !e.target.password.value) {
		  alert('Username and password fields cannot be blank');
		  return;
		}
	  
		axios
		  .post(`${base_url}/login/`, {
			username: e.target.username.value,
			password: e.target.password.value,
		  })
		  .then((response) => {
			const user_id = response.data.user_id;
			const token = response.data.token;
	  
			// Store token and user_id in localStorage
			localStorage.setItem("token", token);
			localStorage.setItem("user_id", user_id);
	  
			// Set Authorization header for subsequent axios requests
			axios.defaults.headers.common.Authorization = `Token ${token}`;
	  
			// Fetch user data using the user_id
			return axios.get(`${base_url}/api/users/${user_id}`);
		  })
		  .then((res) => {
			const userJSON = JSON.stringify(res.data);
			// Store user object in localStorage
			localStorage.setItem("user", userJSON);
	  
			// Navigate to home page after successful login
			navigate("/");
		  })
		  .catch((error) => {
			if (error.response && error.response.status === 500) {
			  alert("Invalid username or password");
			  console.error('Request failed with status code 500');
			} else {
			  console.log("Login Failed:", error);
			}
		  });
	  };

	return (
		<main>
			<h2 className="login-form__title">Log In</h2>

			<div className="login-form__google"><GoogleLogin {...googleLoginProps} /></div>

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
					<button className="login-form__button" type="submit">
						Log In
					</button>
				</div>
			</form>
		</main>
	);
}