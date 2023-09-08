import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useGetEffect, base_url } from "./utils";
import axios from "axios";
import "./App.scss";
import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home/Home.js";
import OrganizationPage from "./pages/Organization Page /OrganizationPage.js";
import Animal from "./pages/Animal/Animal";
import CreateReq from "./components/CreateReq/CreateReq.js";
import Login from "./components/Login/Login.js";
import Logout from "./components/Logout/Logout.js";
import AddAnimal from "./components/AddAnimal/AddAnimal";
import UserPage from "./pages/UserPage/UserPage";

export default function App() {
  const [requestList, setRequestList] = useState(null);
  const [animalList, setAnimalList] = useState(null);

  useGetEffect(`${base_url}/api/animals/`, setAnimalList);
  useGetEffect(`${base_url}/api/tranportrequest/`, setRequestList);

    if (!animalList) {
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
              <Route path="/userpage" element={<UserPage animalList={animalList} />} />
              <Route path="/organization/:orgId" element={<OrganizationPage />} />
              <Route path="/animal/:animalId" element={<Animal animalList={animalList} reqList={requestList} />} />
              <Route path="/createrequest/:animalId" element={<CreateReq animalList={animalList} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/addanimal" element={<AddAnimal  />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}


