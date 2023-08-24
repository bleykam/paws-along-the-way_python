import "./AnimalRequestCard.scss";

import React, {useState, useEffect} from "react";
import axios from "axios";

export default function AnimalRequestCard({animal}) {
  const [animalPic, setAnimalPic]=useState("");
  
    // const userJSON = localStorage.getItem('user');
    // const user = JSON.parse(userJSON);
   
    useEffect(() => {
    axios.get(`https://dog.ceo/api/breeds/image/random`)
    .then(response=>setAnimalPic(response.data.message))
    .catch(error => console.error('Error fetching data:', error));
    }, []); 


    if (animalPic==="") {
      return <p>Loading...</p>;
       }
 

    return (
      <div className="animal-tile-inner" >
        <div className="tile">
          <div className="image-wrapper">
            <div className="animal-tile-icon rich-icon" style={{ backgroundImage: `url(${animalPic})` }}></div>
          </div>
        </div>
        <div className="title">
          <span className="tile-span" dir="auto">
          {animal.name}
          </span>

        </div>
      </div>
  
  );
}


