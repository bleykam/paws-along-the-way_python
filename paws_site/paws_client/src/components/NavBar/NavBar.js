import './NavBar.scss';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'; 
import Logout from '../Logout/Logout'
import head from "../../assets/profile-circle-svgrepo-com.svg";


const NavBar = ({isLoggedIn}) => {

 
  console.log(isLoggedIn)


  const handleLogout = () => {
    // setLoggedIn(prevLoggedIn => !prevLoggedIn);
  };

  return (
    <div className="navbar">
      <div className="navbar__left-section">
        <div className="navbar__title-div">
          <NavLink to="/" className="navbar__title-link"><h1 className="navbar__title">Paws Along The Way</h1></NavLink>
        </div>
      </div>
      <div className="navbar__right-section">
        <div className="navbar__profile-link">
          <NavLink to="/userpage" >
            <img className="navbar__profile-icon" src={head} alt="profile icon"></img>
          </NavLink>
        </div>
        {isLoggedIn ? (
          <Logout onClick={handleLogout} />
        ) : (
          <NavLink to="/login" ><button className="navbar__button">Login</button></NavLink>
        )}
      </div>
    </div>
  );
}

export default NavBar;

