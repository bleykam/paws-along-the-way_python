import "./Logout.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { googleLogout } from '@react-oauth/google';

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    googleLogout();
    e.preventDefault();
    localStorage.clear();
    navigate("/login");

    axios.get('/logout/')
      .then(response => {
        navigate("/login");
      })
      .catch(error => {
        console.error("Logout Error:", error);
      });
  };

  return (
    <main>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </main>
  )
}