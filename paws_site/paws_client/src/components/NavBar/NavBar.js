import "./NavBar.scss";
import { NavLink } from "react-router-dom";
import head from "../../assets/profile-circle-svgrepo-com.svg";
import React from 'react';
import Logout from "../Logout/Logout.js"

export default function NavBar() {
  const user = localStorage.getItem("user");

  return (
    <header className="header">
      <div className="header__home">
        <NavLink className="header__homelink" to="/">
          Paws Along The Way
        </NavLink>
      </div>
      <div className="header__right">
        <div className="header__account">
          <div className="header__profile">
            {" "}
            <NavLink to="/userpage">
              <img className="header__icon" src={head} alt="profile icon"></img>
            </NavLink>
            </div>
        {user?
        (<NavLink to="/logout" className="header-profile">
              <Logout />
          </NavLink>)
         :( <NavLink to="/login" className="header-profile">
              <button className="submit-button">Login</button>
          </NavLink>)
        }
        </div>
      </div>
    </header>
  );
}
