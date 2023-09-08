import "./CreateReq.scss";
import React, {useState, useEffect, useRef} from 'react';
import AnimalRequestCard from "../AnimalRequestCard/AnimalRequestCard";
import { useParams, Link } from 'react-router-dom';
import "react-datetime/css/react-datetime.css";
import Datetime from 'react-datetime';
import axios from "axios";
import {loader, formatAddress, useGetEffect, base_url} from "../../utils"


export default function CreateReq({animalList}){
    const [organization, setOrganization] = useState("");
    const [values, setValues] = useState({  time: "", user: "" });
    const timeChoices = ["", "Morning", "Afternoon", "Evening", "Flexible"];
    const id = useParams();
    const originRef = useRef("");
    const destinationRef = useRef("");
    const [place, setPlace]=useState("");
    const [place1, setPlace1]=useState("");
 
    const handleDateChange = (date) => {
        // Update the date in state
        setValues({ ...values, date: date });
      };
      const handleChange = (event) => {
        if (!event) {
            return;
        }
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };
 
    const animal = animalList.filter((animal)=>animal.id=== id.animalId)[0];
    useGetEffect(`api/organizations/${animal.organization}`, setOrganization);
    
   
   
    useEffect(() => {
        loader.importLibrary('core').then(() => {
          const autocomplete = new window.google.maps.places.Autocomplete(originRef.current);
    
          autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          setPlace(place);
        });

          const autocomplete1 = new window.google.maps.places.Autocomplete(destinationRef.current);

          autocomplete1.addListener("place_changed", () => {
            const place1 = autocomplete1.getPlace();
            setPlace1(place1);
          });
        })
      }, [originRef, destinationRef]);

      const origin_address = formatAddress(place);
      const destination_address = formatAddress(place1);
     


    const handleSubmit = (event) => {
        event.preventDefault();
        
        let newRequest={
            "origin_address": origin_address,
            "destination_address": destination_address,
            "date": values.date ? values.date.format("YYYY-MM-DD") : null,
            "time": values.time,
            "user": "",
            "animal": animal.id
        }

        axios.post(`${base_url}/api/tranportrequest/`, newRequest)
        .then(() => {
            console.log('success');
        })
        .catch((error) => {
            console.log(error)
        });

    }

   
    return(
     <main className="create-request">  
        <section className="animal">
   

            <div className="animal-tile-outer" > 
              <Link to={`/animal/${animal.id}`}><AnimalRequestCard animal={animal} />{organization.name}</Link> 
            </div>
        </section>
         
            <div className="create-request__origin-address create-request__div">  
            <label className = "create-request__label" htmlFor="origin">Pick Up: </label> 
                <input className="create-request__input" id="origin" name="origin" ref={originRef}/>
            </div>

            <div className="create-request__destination-address create-request__div ">   
            <label className = "create-request__label" htmlFor="destination">Drop Off: </label> 
            <input className="create-request__input" id="destination" name="destination" ref={destinationRef}/>
            </div>
         
            <div className="create-request__div">
            <label className = "create-request__label" htmlFor="date">Date: </label> 
              <Datetime  id="date" name="date" dateFormat="YYYY-MM-DD" timeFormat="" onChange={handleDateChange} />
            </div>
            <div className="create-request__div">
            <label className = "create-request__label" htmlFor="time">Select a time: </label>
              <select className="create-request__input" name="time" id="time"  onChange={handleChange}>
                {timeChoices.map(choice => (
                  <option key={choice} value={choice}>{choice}</option>
                ))}
              </select>
              </div>
            <div>
                <button className='create-request__button' onClick={handleSubmit}>Submit</button>
            </div>
        
        </main>     

    )
}