import "./Animal.scss";
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { convertTime } from "../../utils.js";

export default function Animal({ animalList, reqList }) {
	console.log(animalList)
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
					<h2 className="animal-page__name">{animal.name}</h2>
					<Link to={`/organization/${animal.organization}`}><span>Org Info</span></Link>

					<div>
						<ul className="animal-page__attribute-list">
							<li className="animal-page__attribute">
								{animal.breeds}
							</li>
							<li className="animal-page__attribute">
								{animal.gender}
							</li>
							<li className="animal-page__attribute">
								{animal.size}
							</li>
							<li className="animal-page__attribute">
								{animal.colors}
							</li>
							<li className="animal-page__attribute">
								{animal.age}
							</li>
						</ul>
					</div>
					<p className="animal-page__description">
						{animal.description}
					</p>
				</div>
			</div>
			{!req ? (
				<Link to={`/createrequest/${animal.id}`}>
					<button class="button-62">Create Request</button>
				</Link>) : <div></div>}


			{req ? (

				<div >
					<h2 className="animal-page__name">Transportation Request</h2>

					<div className="animal-page__bottom">
						<div className="animal-page__trans-info">
							<p className="animal-page__trans-info-p">Driver: </p>
							<p className="animal-page__trans-info-p">{req.time}</p>
							<p className="animal-page__trans-info-p">{convertTime(req.date)}</p>
						</div>

						<div className="animal-page__bottom-address">
							<div className="animal-page__pickup">
								<ul className="animal-page__list">
									<li className="animal-page__list-item"> <strong>Pick-Up:</strong></li>
									<li className="animal-page__list-item">{req.origin_address.address1}</li>
									<li className="animal-page__list-item">{req.origin_address.address2}</li>
									<li className="animal-page__list-item">{req.origin_address.city}, {req.origin_address.state} {req.origin_address.postcode}</li>
								</ul>
							</div>

							<div className="animal-page__dropoff">
								<ul className="animal-page__list">
									<li className="animal-page__list-item"> <strong>Drop-Off:</strong></li>
									<li className="animal-page__list-item">{req.destination_address.address1}</li>
									<li className="animal-page__list-item">{req.destination_address.address2}</li>
									<li className="animal-page__list-item">{req.destination_address.city}, {req.destination_address.state} {req.destination_address.postcode}</li>
								</ul>
							</div>
						</div>
					</div>
				</div>) : <p></p>}

		</div>

	);
}





