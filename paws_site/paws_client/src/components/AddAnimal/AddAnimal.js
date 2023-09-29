import "./AddAnimal.scss"
import React, { useState} from 'react';
import axios from 'axios';
import { useGetEffect, base_url } from "../../utils";

export default function AddAnimal() {
   const [orgList, setOrgList] =useState("");
   useGetEffect(`${base_url}/api/organizations/`, setOrgList);

  
    const handleSubmit = (event) => {
        event.preventDefault();
         // Read the form data
        const form = event.target;
        const formData = new FormData(form);
        const formEntries = Object.fromEntries(formData.entries())
        
        const attributes = {
            "spayed_neutered": formEntries.spayed_neutered,
            "house_trained": formEntries.house_trained,
            "declawed": formEntries.declawed,
            "special_needs": formEntries.special_needs,
            "shots_current": formEntries.shots_current,
            "mixed": formEntries.mixed
        }
        
        const environment ={
            "children": formEntries.children,
            "dogs": formEntries.dogs,
            "cats": formEntries.cats
        }

        const animal = {
            attributes,
            environment,
            "gender": formEntries.gender,
            "size": formEntries.size,
            "type": formEntries.type,
            "species": formEntries.species,
            "breeds": formEntries.breeds,
            "colors": formEntries.colors,
            "age": formEntries.age,
            "coat": formEntries.coat,
            "name": formEntries.name,
            "description": formEntries.description,
            "photos": null,
            "organization": formEntries.organization
        }  
   
        axios.post(`${base_url}/api/animals/`, animal)
            .then(() => {
                event.target.reset();
            })
            .catch((error) => {
            });

    }

    return (
        <main className="add-animal">
         <form method="post" onSubmit={handleSubmit}>
            <div className="create-request__div">
                <label className="create-request__label" htmlFor="name">Animal Name: </label>
                <input className="create-request__input" id="name" name="name"  />
            </div>

            <div className="create-request__div">
                <label className="create-request__label" htmlFor="organization">Organization: </label>
                <select className="create-request__input"  name="organization" id="organization" >
                <option value="">Select an organization</option> 
                    {orgList && orgList.map(org => (
                        <option key={org.id} value={org.id}>{org.name}</option>
                    ))}
                </select>
            </div>

            <div className="create-request__div">
                <label className="create-request__label" htmlFor="type">Type: </label>
                <input className="create-request__input" id="type" name="type" />
            </div>

            <div className="create-request__div">
                <label className="create-request__label" htmlFor="species">Species: </label>
                <input className="create-request__input" id="species" name="species" />
            </div>

            <div className="create-request__div">
                <label className="create-request__label" htmlFor="breeds">Breeds: </label>
                <input className="create-request__input" id="breeds" name="breeds" />
            </div>

            <div className="create-request__div">
                <label className="create-request__label" htmlFor="colors">Colors: </label>
                <input className="create-request__input" id="colors" name="colors"  />
            </div>

            <div className="create-request__div">
                <label className="create-request__label" htmlFor="coat">Coat: </label>
                <input className="create-request__input" id="coat" name="coat"  />
            </div>


            <div className='create-request__div'>
                <label className="create-request__label" htmlFor="age">Age:</label>
                <select className="create-request__input" defaultValue="" name="age" id="age"  >
                    <option value="">Select Age</option>
                    <option value="Baby">Baby</option>
                    <option value="Young">Young</option>
                    <option value="Adult">Adult</option>
                    <option value="Senior">Senior</option>
                </select>
            </div>


            <div className='create-request__div'>
                <label className="create-request__label" htmlFor="gender">Choose a Gender:</label>
                <select className="create-request__input" defaultValue="" name="gender" id="gender"  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>


            <div className='create-request__div'>
                <label className="create-request__label" htmlFor="size">Size: </label>
                <select className="create-request__input" defaultValue="" name="size" id="size"  >
                    <option value="">Select Size</option>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                    <option value="Giant">Giant</option>
                </select>
            </div>

            <div className="create-request__div">
                <label className="create-request__label" htmlFor="photo">Photo: </label>
                <input className="create-request__input" id="photo" name="photo" />
            </div>


            <div className="create-request__div">
                <label className="create-request__label" htmlFor="description">Description:  </label>
                <textarea className='create-request__input' type="text" name="description" id="descritpion" placeholder='Enter Request details'  />
            </div>

            <div className='add-animal__env'>
                <h4 className="add-animal__title">Friendly With:</h4>

                <div className="checkbox-wrapper-13 add-animal__box">
                    <input id="c1-13" type="checkbox" name="children" />
                    <label htmlFor="c1-13">Children</label>
                </div>

                <div className="checkbox-wrapper-13 add-animal__box">
                    <input id="c1-13" type="checkbox" name="dogs" />
                    <label htmlFor="c1-13">Dogs</label>
                </div>
                
                <div className="checkbox-wrapper-13 add-animal__box">
                    <input id="c1-13" type="checkbox" name="cats"  />
                    <label htmlFor="c1-13">Cats</label>
                </div>

            </div>

            <div className='add-animal__env'>

                <div className="checkbox-wrapper-13 add-animal__box">
                    <input id="c1-13" type="checkbox" name="spayed_neutered"  />
                    <label htmlFor="c1-13">Spayed/Nuetered</label>
                </div>

                <div className="checkbox-wrapper-13 add-animal__box">
                    <input id="c1-13" type="checkbox" name="house_trained" />
                    <label htmlFor="c1-13">House Trained</label>
                </div>

                <div className="checkbox-wrapper-13 add-animal__box">
                    <input id="c1-13" type="checkbox" name="declawed"  />
                    <label htmlFor="c1-13">Declawed</label>
                </div>

                <div className="checkbox-wrapper-13 add-animal__box">
                    <input id="c1-13" type="checkbox" name="special_needs" />
                    <label htmlFor="c1-13">Special Needs</label>
                </div>

                <div className="checkbox-wrapper-13 add-animal__box">
                    <input id="c1-13" type="checkbox" name="shots_current"  />
                    <label htmlFor="c1-13">Shots Current</label>
                </div>

                <div className="checkbox-wrapper-13 add-animal__box">
                    <input id="c1-13" type="checkbox" name="mixed" />
                    <label htmlFor="c1-13">Mixed</label>
                </div>
            </div> 


            <div className="add-animal__buttondiv">
                <button className='add-animal__button' type="reset">Reset</button>
                <button className='add-animal__button' type='submit'>SUBMIT</button>
            </div>
        </form>
        </main>
    )



}