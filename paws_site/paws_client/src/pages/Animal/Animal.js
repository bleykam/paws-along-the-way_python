import "./Animal.scss";
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import TransportationRequest from "../../components/TransportationRequest/TransportationRequest";

export default function Animal({ animalList, reqList }) {
	const { animalId } = useParams();
	const animal = animalList.filter((animal) => animal.id === animalId)[0];
	const req = reqList.filter((req) => req.animal === animalId)[0];
	const [animalPic, setAnimalPic] = useState("");
	
	useEffect(() => {
		axios
			.get(`https://dog.ceo/api/breeds/image/random`)
			.then((response) => setAnimalPic(response.data.message))
			.catch((error) => console.error("Error fetching data:", error));
	}, []);


	if (!animal) {
		return <p>Loading...</p>;
	}


	return (
		<div className="animal-page">
			<div className="animal-page__top">
				<div className="animal-page__pic-frame">
					<img
						src={animalPic}
						alt={animal.name}
						className="animal-page__pic"
					/>
				</div>
				<div className="animal-page__content">
					<Link to={`/animal/${animal.id}/edit`}><h2 className="animal-page__name">{animal.name}</h2></Link>
					<Link to={`/organization/${animal.organization}`} className="animal-page__link"><span >Contact Info</span></Link>

					<div>
						<ul className="animal-page__attribute-list">
							<li className="animal-page__attribute">
								{animal.breeds}
							</li>
							<li className="animal-page__attribute">
								{animal.gender}tim
							</li>
							<li className="animal-page__attribute">
								{animal.colors}
							</li>
							<li className="animal-page__attribute">
								{animal.age}
							</li>
						</ul>
					</div>
					<div className="animal-page__description">
						{animal.description}
					</div>
				</div>
			</div>
			{!req ? (
				<Link to={`/createrequest/${animal.id}`}>
					<button className="animal-page__button">Create Request</button>
				</Link>) : <div></div>}


			{req ? 

				<TransportationRequest req = {req}/> : <p></p>}

		</div>

	);
}





