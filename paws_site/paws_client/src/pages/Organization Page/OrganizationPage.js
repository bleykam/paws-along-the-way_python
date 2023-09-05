import "./OrganizationPage.scss";
import { Link, useNavigate } from "react-router-dom";
import React, {useState} from "react";
import AnimalRequestCard from "../../components/AnimalRequestCard/AnimalRequestCard";
import { useGetEffect } from "../../utils";


export default function OrganizationPage({ animalList }) {
  const navigate = useNavigate();
  const userJSON = localStorage.getItem('user');
  const user = JSON.parse(userJSON);
  const [organization, setOrganization] = useState("");

  if(!user){
    navigate("/login");
  };

  useGetEffect(`api/organizations/${user.organization}`, setOrganization);

  
  if(!organization){
    return <p>Page coming soon</p>
  }



  const animals = animalList.filter((animal) => animal.organization === organization.id);


  return (
    <main className="organization-page">
      <h1 className="profile__heading">Welcome, {user.first_name} {user.last_name}!</h1>
      <div className="organization-page__info">

        <div className="organization-page__address">
          <h2>{organization.name}</h2>

          <p className="organization-page__contact-p">{organization.address.address1} </p>
          {organization.address.address2 && <p>{organization.address.address2}</p>}
          <p className="organization-page__contact-p">
            <span>{organization.address.city} </span>
            <span>{organization.address.state}, </span>
            <span>{organization.address.postcode}</span>
          </p>
        </div>

        <div className="organization-page__contact">
          <p className="organization-page__contact-p">{organization.phone}</p>
          <p className="organization-page__contact-p">{organization.email}</p>
          <p className="organization-page__contact-p">{organization.website}</p>
        </div>

      </div>

      <div className="organization-page__header-bar">
        <h2 className="organization-page__title">Animals</h2>
        <Link className="organization-page__add" to="/addanimal"><span>Add Animal</span></Link>
        <input className="organization-page__search" type="search" placeholder="search animals..." ></input>
      </div>

      <div className="organization_page__animals">
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
    </main>
  );
}

