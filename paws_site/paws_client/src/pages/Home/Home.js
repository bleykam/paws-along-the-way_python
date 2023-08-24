import "./Home.scss";

import { loader, useAutocomplete, formatAddress } from '../../utils'
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home({ requestList, orgList }) {
  const [total, setTotal] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const navigate = useNavigate();
  const startRef = useRef("");
  const endRef = useRef("");
  const mapRef = useRef(null);
  const [originLocation, setOriginLocation] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");


  useEffect(() => {

    loader.importLibrary('core').then(() => {
      //set map options
      const mapOptions = {
        center: { lat: 39.8283, lng: -100.5795 },
        zoom: 4.5,
      };
      //set map
      let map;
      map = new window.google.maps.Map(mapRef.current, mapOptions);


      let marker;
      new window.google.maps.Marker();
      //set markers for pick-up locations
      requestList.map((request) => {
        const locationObj = request.origin_address.locationObj;

        marker = new window.google.maps.Marker({
          map,
          position: locationObj,
        });
        //go to request details page when clicked
        marker.addListener("click", () => {
          if (null) {
            <p>Loading...</p>
          }
          navigate(`/animal/${request.animal}`);
        });
        return locationObj;
      });


      //add auto address complete for starting location
      const autocomplete = new window.google.maps.places.Autocomplete(
        startRef.current
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        setOriginLocation(place.geometry.location);
      });

      //add auto address complete for end location
      const autocomplete2 = new window.google.maps.places.Autocomplete(
        endRef.current
      );

      autocomplete2.addListener("place_changed", () => {
        const place2 = autocomplete2.getPlace();
        setDestinationLocation(place2.geometry.location);
      });

      //add directions route to map
      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer({
        draggable: true,
        map,
      });

      let start = originLocation;
      let end = destinationLocation;

      let request = {
        origin: start,
        destination: end,
        provideRouteAlternatives: true,
        travelMode: "DRIVING",
      };

      loader.importLibrary("core").then(e => {
        if (e) {
          directionsService.route(request, function (result, status) {
            if (status === "OK") {
              directionsRenderer.setDirections(result);
              if (result) {
                const dist = result.routes[0].legs.reduce(
                  (total, leg) => total + leg.distance.value,
                  0
                );
                setTotal(((dist / 1000) * 0.621371).toFixed(2) + " mi");
              }
            }
          })
        }
      });

      // Add a directions_changed event listener to the directions object
      window.google.maps.event.addListener(
        directionsRenderer,
        "directions_changed",
        () => {
          // Get the updated directions object
          const updatedDirections = directionsRenderer.getDirections();
          const distance = updatedDirections.routes[0].legs.reduce(
            (total, leg) => total + leg.distance.value,
            0
          );
          setTotal(((distance / 1000) * 0.621371).toFixed(2) + " mi");
          const duration = updatedDirections.routes[0].legs.reduce(
            (totalTime, leg) => totalTime + leg.duration.value,
            0
          );
          setTotalTime(
            duration < 3600
              ? (duration / 60).toFixed(0) + " min"
              : (duration / 3600).toFixed(2) + " hr");
        });
    });
  }, [navigate, requestList, originLocation, destinationLocation]);



  return (
    <main className='homepage'>
      <div className="map" ref={mapRef}></div>

      <ul className="instructions-list">
        <li className="instructions-list__instruction">Markers are animals in need.</li>
        <li className="instructions-list__instruction">Enter the start and end addresses for your trip to see animals in need along your route.</li>
        <li className="instructions-list__instruction">Click on marker to view request details.</li>
        <li className="instructions-list__instruction">Drag the route to an animal to see additonal time/mile required to pick up an animal.</li>
      </ul>

      <form className="directions-form">
        <h2 className="directions-form__title">Your Trip:</h2>
        <div>
          <label className="directions-form__label" htmlFor="origin">
            Start:{" "}
          </label>
          <input className="directions-form__dir-input" name="orgin" required={true} id="origin" placeholder="Enter City and State" ref={startRef} />
        </div>
        <div>
          <label className="directions-form__label" htmlFor="destination">
            End:{" "}
          </label>
          <input className="directions-form__dir-input" name="destination" required={true} id="destination" placeholder="Enter City and State" ref={endRef} />
        </div>
      </form>
      <div className="directions-form__calculations">
        <div className="directions-form__distance">Total Distance: {total}</div>
        <div className="directions-form__distance">
          Total Duration: {totalTime}
        </div>
      </div>
    </main>
  );
}