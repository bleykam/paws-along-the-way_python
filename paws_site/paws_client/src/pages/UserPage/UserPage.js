import "./UserPage.scss";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import AnimalRequestCard from "../../components/AnimalRequestCard/AnimalRequestCard";
import { useGetEffect, base_url} from "../../utils";
import Login from "../../components/Login/Login";

export default function UserPage() {
  const userJSON = localStorage.getItem('user');
  const user = JSON.parse(userJSON);
  const [organization, setOrganization] = useState("");
  const [animals, setAnimals] = useState("");

  useGetEffect(`${base_url}/api/organizations/${user?.organization}/`, setOrganization);
  useGetEffect(`${base_url}/api/org-animals/?orgId=${user?.organization}`, setAnimals)
 
  return (
    !user ? <Login />: (
    <main className="user-page">
        {user && (
        <div className="user-page__header" > <h1 className="user-page__title">Welcome, {user.first_name} {user.last_name}!</h1>
          <Link to='/userpage/messages'><button className="user-page__button">Contact {user.first_name}</button></Link></div> 
      )}
     
      {organization && (
        <>
      <div className="user-page__info">
  
        <div className="user-page__address">
          <h2>{organization.name }</h2>

          <p className="user-page__contact-p">{organization.address.address1} </p>
          {organization.address.address2 && <p>{organization.address.address2}</p>}
          <p className="user-page__contact-p">
            <span>{organization.address.city} </span>
            <span>{organization.address.state}, </span>
            <span>{organization.address.postcode}</span>
          </p>
        </div>

        <div className="user-page__contact">
          <p className="user-page__contact-p">{organization.phone}</p>
          <p className="user-page__contact-p">{organization.email}</p>
          <p className="user-page__contact-p">{organization.website}</p>
        </div>

      </div>

      <div className="user-page__animal-bar">
        <h2 className="user-page__animal-title">Animals</h2>
        <Link className="user-page__add" to="/addanimal"><span>Add Animal</span></Link>
        <input className="user-page__search" type="search" placeholder="search animals..." ></input>
      </div>

      <div className="user_page__animals">
        <ul className="animal-tiles-list">
          {animals &&
            animals.map((animal) => (
              <Link to={"/animal/" + animal.id} key={animal.id}>
                <li className="animal-tile-outer" key={animal.id}>
                  {" "}
                  <AnimalRequestCard animal={animal} organization={organization} />
                </li>
              </Link>
            ))}
        </ul>
      </div>
      </>
   )}
    </main>)
  );
}

