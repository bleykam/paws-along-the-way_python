import { Loader } from "@googlemaps/js-api-loader";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';

export const csrf_token = Cookies.get('csrftoken');

export  const token = localStorage.getItem("token");
export const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;


export const base_url = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BASE_URL_PROD  || "http://localhost:8000"
  : process.env.REACT_APP_BASE_URL_DEV ?? "http://localhost:8000";


export  const config = {
  headers: {
      Authorization: `Bearer ${token}`,
      'X-CSRFToken': csrf_token, 
  },
};
  
export function convertTime(inputDate) {
  const dateObj = new Date(inputDate);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  
  return formattedDate
  };
 

export function formatDate(dateString){
  const date = new Date(dateString);
  return format(date, "yyyy-MM-dd");
};
  

export function handleKeyPress(event){
  if (event.key === 'Enter') {
    event.preventDefault();
  }
};

export const loader = new Loader({
  apiKey: apiKey,
  version: "weekly",
  libraries: ["places", "maps", "geocoding", "marker", "routes", "drawing"],
  componentRestrictions: { country: ["us", "ca"] },
  fields: ["address_components", "geometry"],
});

export const useAutocomplete = () => {
  const inputRef = useRef("");
  const [value, setValue] = useState("");
  const [location, setLocation] = useState("");
  const [placeId, setPlaceId] = useState("");

  useEffect(() => {
    loader.useLibrary('core').then(() => {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);

      autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      setValue(place.formatted_address);
      setPlaceId(place.place_id);
      setLocation(JSON.stringify(place.geometry.location));
    });
  });
  }, [inputRef]);

  return { inputRef, value, setValue, location, placeId };
};

export function useGetEffect(endpoint, handleResponse, condition="",){
  useEffect(() => {
    axios.get(`/${endpoint}/`)
    .then((response)=>{
      handleResponse(response.data);
    })
    .catch((error)=>console.log(error));

  }, [condition])
  
};


export function formatAddress(place) {
 
  let address1;
  let address2;
  let city;
  let postcode;
  let state;
  let country;
  let locationCoor;
  let lat;
  let lng;


  // Get the place details from the autocomplete object.

if(place.address_components){
  for (const component of place.address_components) {

    const componentType = component.types[0];


  // eslint-disable-next-line default-case
  switch (componentType) {
      case "street_number":
        address1 = component.short_name + " ";
        break;

      case "route": {
        address1 += `${component.long_name};;;;`;
        break;
      }

      case "postal_code": {
        postcode = `${component.long_name}`;
        break;
      }
      case "locality":
        city = component.long_name;
        break;
      case "administrative_area_level_1": {
        state = component.short_name;
        break;
      }
      case "country":
        country = component.long_name;
        break;
    }
  }

locationCoor=place.geometry.location;  
lat = locationCoor.lat();
lng = locationCoor.lng();

let address={
  "address1": address1,
  "address2": address2,
  "city": city,
  "state": state,
  "postcode": postcode,
  "country": country,
  "locationObj": {lat, lng}
}
return address
}

}

export function getCookie(name) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
}


