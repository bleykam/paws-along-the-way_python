import "./AddAnimal.scss"
import React, { useState} from 'react';
import axios from 'axios';
import { useGetEffect } from "../../utils";

export default function AddAnimal() {
   const [orgList, setOrgList] =useState("");
   useGetEffect(`api/organizations/`, setOrgList);

    const [values, setValues] = useState({
        description: "", dogs: "", cats: "", children: "", name: "", spayed_neutered: "", house_trained: "", declawed: "",
        special_needs: "", shots_current: "", mixed: "", gender: "", size: "", type: "", species: "", breeds: "", colors: "", age: "", coat: "", active: "", organization: "",
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        let newAnimal = {
            "attributes": {
                "spayed_neutered": values.spayed_neutered,
                "house_trained": values.house_trained,
                "declawed": values.declawed,
                "special_needs": values.special_needs,
                "shots_current": values.shots_current,
                "mixed": values.mixed
            },
            "environment": {
                "children": values.children,
                "dogs": values.dogs,
                "cats": values.cats
            },
            "gender": values.gender,
            "size": values.size,
            "type": values.type,
            "species": values.species,
            "breeds": values.breeds,
            "colors": values.colors,
            "age": values.age,
            "coat": values.coat,
            "name": values.name,
            "description": values.description,
            "photos": null,
            "organization": values.organization
        }

        axios.post(`/api/animals/`, newAnimal)
            .then(() => {
                event.target.reset();
            })
            .catch((error) => {
            });

        for (let key in newAnimal) {
            newAnimal[key] = "";
        }
    }

    const handleChange = (event) => {
        if (!event) {
            return;
        }

        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };


    return (
        <main className="add-animal">

            <div className="create-request__div">
                <label className="create-request__label" htmlFor="name">Animal Name: </label>
                <input className="create-request__input" id="name" name="name" onChange={handleChange} />
            </div>

            <div className="create-request__div">
                <label className="create-request__label" htmlFor="organization">Organization: </label>
                <select className="create-request__input" defaultValue="" name="organization" id="organization" onChange={handleChange}>
                    {orgList && orgList.map(org => (
                        <option key={org.id} value={org.id}>{org.name}</option>
                    ))}
                </select>
            </div>

            <div className="create-request__div">
                <label className="create-request__label" htmlFor="type">Type: </label>
                <input className="create-request__input" id="type" name="type" onChange={handleChange} />
            </div>

            <div className="create-request__div">
                <label className="create-request__label" htmlFor="species">Species: </label>
                <input className="create-request__input" id="species" name="species" onChange={handleChange} />
            </div>

            <div className="create-request__div">
                <label className="create-request__label" htmlFor="breeds">Breeds: </label>
                <input className="create-request__input" id="breeds" name="breeds" onChange={handleChange} />
            </div>

            <div className="create-request__div">
                <label className="create-request__label" htmlFor="colors">Colors: </label>
                <input className="create-request__input" id="colors" name="colors" onChange={handleChange} />
            </div>

            <div className="create-request__div">
                <label className="create-request__label" htmlFor="coat">Coat: </label>
                <input className="create-request__input" id="coat" name="coat" onChange={handleChange} />
            </div>


            <div className='create-request__div'>
                <label className="create-request__label" htmlFor="age">Age:</label>
                <select className="create-request__input" defaultValue="" name="age" id="age" onChange={handleChange} >
                    <option value="">Select Age</option>
                    <option value="Baby">Baby</option>
                    <option value="Young">Young</option>
                    <option value="Adult">Adult</option>
                    <option value="Senior">Senior</option>
                </select>
            </div>


            <div className='create-request__div'>
                <label className="create-request__label" htmlFor="gender">Choose a Gender:</label>
                <select className="create-request__input" defaultValue="" name="gender" id="gender" onChange={handleChange} >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>


            <div className='create-request__div'>
                <label className="create-request__label" htmlFor="size">Size: </label>
                <select className="create-request__input" defaultValue="" name="size" id="size" onChange={handleChange} >
                    <option value="">Select Size</option>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                    <option value="Giant">Giant</option>
                </select>
            </div>

            <div className="create-request__div">
                <label className="create-request__label" htmlFor="photo">Photo: </label>
                <input className="create-request__input" id="photo" name="photo" onChange={handleChange} />
            </div>


            <div className="create-request__div">
                <label className="create-request__label" htmlFor="description">Description:  </label>
                <textarea className='create-request__input' type="text" name="description" id="descritpion" placeholder='Enter Request details' onChange={handleChange} />
            </div>

            <div className='add-animal__env'>
                <h4 className="add-animal__title">Friendly With:</h4>

                <div className="checkbox-wrapper-13 add-animal__box">
                    <input id="c1-13" type="checkbox" name="children" checked={values.children === "True"} onChange={(e) => setValues({ ...values, children: e.target.checked ? 'True' : 'False' })} />
                    <label htmlFor="c1-13">Children</label>
                </div>

                <div className="checkbox-wrapper-13 add-animal__box">
                    <input id="c1-13" type="checkbox" name="dogs" checked={values.dogs === "True"} onChange={(e) => setValues({ ...values, dogs: e.target.checked ? 'True' : 'False' })} />
                    <label htmlFor="c1-13">Dogs</label>
                </div>

                <div className="checkbox-wrapper-13 add-animal__box">
                    <input id="c1-13" type="checkbox" name="cats" checked={values.cats === "True"} onChange={(e) => setValues({ ...values, cats: e.target.checked ? 'True' : 'False' })} />
                    <label htmlFor="c1-13">Cats</label>
                </div>

            </div>

            <div className='add-animal__env'>

                <div className="checkbox-wrapper-13 add-animal__box">
                    <input id="c1-13" type="checkbox" name="spayed_neutered" checked={values.spayed_neutered === "True"} onChange={(e) => setValues({ ...values, spayed_neutered: e.target.checked ? 'True' : 'False' })} />
                    <label htmlFor="c1-13">Spayed/Nuetered</label>
                </div>

                <div className="checkbox-wrapper-13 add-animal__box">
                    <input id="c1-13" type="checkbox" name="house_trained" checked={values.house_trained === "True"} onChange={(e) => setValues({ ...values, house_trained: e.target.checked ? 'True' : 'False' })} />
                    <label htmlFor="c1-13">House Trained</label>
                </div>

                <div className="checkbox-wrapper-13 add-animal__box">
                    <input id="c1-13" type="checkbox" name="declawed" checked={values.declawed === "True"} onChange={(e) => setValues({ ...values, declawed: e.target.checked ? 'True' : 'False' })} />
                    <label htmlFor="c1-13">Declawed</label>
                </div>

                <div className="checkbox-wrapper-13 add-animal__box">
                    <input id="c1-13" type="checkbox" name="special_needs" checked={values.special_needs === "True"} onChange={(e) => setValues({ ...values, special_needs: e.target.checked ? 'True' : 'False' })} />
                    <label htmlFor="c1-13">Special Needs</label>
                </div>

                <div className="checkbox-wrapper-13 add-animal__box">
                    <input id="c1-13" type="checkbox" name="shots_current" checked={values.shots_current === "True"} onChange={(e) => setValues({ ...values, shots_current: e.target.checked ? 'True' : 'False' })} />
                    <label htmlFor="c1-13">Shots Current</label>
                </div>

                <div className="checkbox-wrapper-13 add-animal__box">
                    <input id="c1-13" type="checkbox" name="mixed" checked={values.mixed === "True"} onChange={(e) => setValues({ ...values, mixed: e.target.checked ? 'True' : 'False' })} />
                    <label htmlFor="c1-13">Mixed</label>
                </div>
            </div>

            <div className="add-animal__button">
                <button className='submit-button' onClick={handleSubmit}>SUBMIT</button>
            </div>

        </main>
    )



}