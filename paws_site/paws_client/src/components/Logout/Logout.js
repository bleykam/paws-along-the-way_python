import "./Logout.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    axios.get('http://localhost:8000/logout/')
      .then(response => {
        navigate("/login");
      })
      .catch(error => {
        console.error("Logout Error:", error);
      });
  };

  return (
    <main>
      <button className="submit-button" onClick={handleSubmit}>Logout</button>
    </main>
  )
}