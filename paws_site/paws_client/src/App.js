import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useGetEffect, base_url } from "./utils";
import Home from "./pages/Home/Home.js";
import OrganizationPage from "./pages/Organization Page /OrganizationPage.js";
import Animal from "./pages/Animal/Animal";
import CreateReq from "./components/CreateReq/CreateReq.js";
import Login from "./components/Login/Login.js";
import Logout from "./components/Logout/Logout.js";
import AddAnimal from "./components/AddAnimal/AddAnimal";
import UserPage from "./pages/UserPage/UserPage";
import Messaging from "./components/Messaging/Messaging";
import NavBar from "./components/NavBar/NavBar";

export default function App() {
  const userJSON = localStorage.getItem('user');
  const user = JSON.parse(userJSON);
  const [requestList, setRequestList] = useState(null);
  const [animalList, setAnimalList] = useState(null);
  const [isLoggedIn, setIsLoggedIn]=useState("");
  useEffect(()=>{
  if(user){
    setIsLoggedIn(true);
  }
}, [user])

  console.log("IS LOGGED IN:", isLoggedIn)

  useGetEffect(`${base_url}/api/animals/`, setAnimalList);
  useGetEffect(`${base_url}/api/tranportrequest/`, setRequestList);

    if (!animalList || !requestList) {
      return (
        <main className="profile">
          <p>Loading...</p>
        </main>
      );  
    }
    
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar isLoggedIn={isLoggedIn}/>
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
              <Route path="/userpage/messages" element={<Messaging />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}


