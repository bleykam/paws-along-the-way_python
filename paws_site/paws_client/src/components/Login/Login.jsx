import "./Login.scss";
import axios from "axios";
import Logout from "../Logout/Logout";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { csrf_token, base_url } from "../../utils";
import Cookies from 'js-cookie';

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
			alert("Username and password fields cannot be blank");
			return;
		}

		axios
			.post(
				`${base_url}/login/`,
				{
					username: e.target.username.value,
					password: e.target.password.value,
				},
				{
					headers: {
						'X-CSRFToken': csrf_token,
						'Origin': 'http://localhost:8000'
					},
				},
				{
				proxy: {
					protocol: 'https',
					host: '127.0.0.1',
					port: 8000,
					auth: {
					  username: 'bleykam',
					  password: 'marble85'
					}
				  }
				},
			)
			.then((response) => {
				const user_id = response.data.user_id;
				const token = response.data.token;
				const session = Cookies.get('sessionid');

				// Store token and user_id in localStorage
				localStorage.setItem("token", token);
				localStorage.setItem("user_id", user_id);
			

				// Set Authorization header for subsequent axios requests
				axios.defaults.headers.common.Authorization =`Token ${token}`;
				axios.defaults.headers.common.Authorization =`Bearer ${token}`;
			
			
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
					console.error("Request failed with status code 500");
				} else {
					console.log("Login Failed:", error);
				}
			});
	};

	return (
		<main>
			<h2 className="login-form__title">Log In</h2>

			<div className="login-form__google">
				<GoogleLogin {...googleLoginProps} />
			</div>

			<form className="login-form" onSubmit={handleSubmit}>
			

				
            <div className="Sso__divider ">
            <span className="Sso__dividerLine"></span>
            <span className="Sso__dividerText">or</span>
            <span className="Sso__dividerLine">     </span>
            </div>
			<div>Sign in with Email:</div>
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

