import "./Login.scss";
import axios from "axios";
import Logout from "../Logout/Logout.js";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

export default function Login(){
 const token = localStorage.getItem('token');
 const navigate = useNavigate();
 const csrf_token = Cookies.get('csrftoken');
  
 if(token){
    return <Logout />
  };
   
  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post(`http://127.0.0.1:8000/login/`, {   
        username: e.target.username.value,
        password: e.target.password.value  
    })
    .then((response) => {
      const user = response.data.user_id
      const token = response.data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('user', user);
      axios.defaults.headers.common.Authorization = `Token ${token}`;   
      navigate("/organization");
    })
    .catch((error) => {
        console.log(error);
    });    
  }

    return(
    <main>
      <h2 className="login-form__title">Log In</h2>
      <form className="login-form"  onSubmit={handleSubmit}>
      <input type="hidden" value ={csrf_token} />
      <div className="login-form__div">
        <input className="login-form__input" type="text" name="username" placeholder="Username" />
      </div>
      <div className="login-form__div">
        <input className="login-form__input"  type="password" name="password" placeholder="Password"  />
      </div>
      <div className="login-form__div">
        <button className="submit-button" type="submit">Log In</button>
      </div>
      </form>
    
    </main>
    )
      
}

