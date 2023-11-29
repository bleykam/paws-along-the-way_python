import "./OrganizationPage.scss";
import { Link, useParams } from "react-router-dom";
import {useState} from "react";
import AnimalRequestCard from "../../components/AnimalRequestCard/AnimalRequestCard";
import { useGetEffect, base_url } from "../../utils";


export default function OrganizationPage() {
  const id = useParams();
  const orgId = id['orgId']
  const [organization, setOrganization] = useState("");
  const [animals, setAnimals] = useState("");
 
  useGetEffect(`${base_url}/api/organizations/${orgId}/`, setOrganization);
  useGetEffect(`http://localhost:8000/api/org-animals/?orgId=${orgId}`, setAnimals);

  if(!organization){
    return <p>Page coming soon</p>
  }

  return (
    <main className="organization-page">

      <div className="user-page__header" > <h1 className="user-page__title">Welcome, {organization.name} !</h1>
          <Link to='/userpage/messages'><button className="user-page__button">Contact {organization.name}</button></Link></div> 
      <div className="organization-page__info">

        <div className="organization-page__address">
        

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

