import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";
import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home/Home.js";
import OrganizationPage from "./pages/Organization Page/OrganizationPage.js";
import Animal from "./pages/Animal/Animal";
import CreateReq from "./components/CreateReq/CreateReq.js";
import Login from "./components/Login/Login.js";
import Logout from "./components/Logout/Logout.js";
import AddAnimal from "./components/AddAnimal/AddAnimal";

export default function App() {

  const [requestList, setRequestList] = useState(null);
  const [orgList, setOrgList] = useState(null);
  const [animalList, setAnimalList] = useState(null);
  const [users, setUsers] = useState("");



  useEffect(() => {
    // An array of URLs for the Axios requests
    const urls = [
      'http://127.0.0.1:8000/api/organizations/',
      'http://127.0.0.1:8000/api/animals/',
      'http://127.0.0.1:8000/api/tranportrequest/',
      'http://127.0.0.1:8000/api/users/'
    ];

    // Function to make an Axios request and return a promise
    function fetchData(url) {
      return axios.get(url);
    }

    // Array to store all the promises
    const promises = urls.map(url => fetchData(url));

    // Execute all requests concurrently and wait for all promises to resolve
    Promise.all(promises)
      .then(responses => {
        setOrgList(responses[0].data);
        setAnimalList(responses[1].data);
        setRequestList(responses[2].data);
        setUsers(responses[3].data);
      })
      .catch(error => {
        console.log(error);
      });

  }, []);


    if (!orgList) {
      return (
        <main className="profile">
          <p>Loading...</p>
        </main>
      );
    }
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="App__body">
          <div className="page-container">
            <Routes>
              <Route path="/" element={<Home requestList={requestList} animalList={animalList} />} />
              <Route path="/organization" element={<OrganizationPage orgList={orgList} users={users} animalList={animalList} />} />
              <Route path="/animal/:animalId" element={<Animal animalList={animalList} reqList={requestList} />} />
              <Route path="/createrequest/:animalId" element={<CreateReq animalList={animalList} organizations={orgList} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/addanimal" element={<AddAnimal orgList={orgList} />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}


