import "./Logout.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { googleLogout } from '@react-oauth/google';
import { base_url } from "../../utils";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    googleLogout();
   
    
    axios.post(`${base_url}/logout/`)
      .then(response => {
        localStorage.clear();
        navigate("/login");
      })
      .catch(error => {
        console.log("Logout Error:", error);
      });
      
  };

  return (
    <main>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </main>
  )
}