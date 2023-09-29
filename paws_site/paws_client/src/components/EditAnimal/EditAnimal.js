import "./EditAnimal.scss"
import { useParams } from "react-router-dom";
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useGetEffect, base_url } from "../../utils";

export default function EditAnimal() {
    const { animalId } = useParams();
	const [orgList, setOrgList] =useState("");
    const[animal, setAnimal]=useState("");
    
    const [selectedFruit, setSelectedFruit] = useState('Giant'); 
    console.log("FRUIT", selectedFruit)
    useGetEffect(`${base_url}/api/organizations/`, setOrgList);
    useGetEffect(`${base_url}/api/animals/${animalId}`, setAnimal);
  

   const [values, setValues] = useState({
    description: "", dogs: "", cats: "", children: "", name: "", spayed_neutered: "", house_trained: "", declawed: "",
    special_needs: "", shots_current: "", mixed: "", gender: "",  type: "", species: "", breeds: "", colors: "", age: "", coat: "", active: "", organization: "",
    });

    const updateValues = (animal) => {
        if (animal) {
            setValues(prevValues => ({
                ...prevValues,
                description: animal.description,
                dogs: animal.environment.dogs,
                cats: animal.environment.cats,
                children: animal.environment.children,
                name: animal.name,
                spayed_neutered: animal.attributes.spayed_neutered,
                house_trained: animal.attributes.house_trained,
                declawed: animal.attributes.declawed,
                special_needs: animal.attributes.special_needs,
                shots_current: animal.attributes.shots_current,
                mixed: animal.attributes.mixed,
                gender: animal.gender,
                size: animal.size,
                type: animal.type,
                species: animal.species,
                breeds: animal.breeds,
                colors: animal.colors,
                age: animal.age,
                coat: animal.coat,
                active: animal.active,
                organization: animal.organization
            }));
        }
    };

    useEffect(() => {
        updateValues(animal);
    }, [animal]);
  
    console.log(values); 
    let changes={}
    const handleChange = (event) => {
        if (!event) {
            return;
        }

        const { name, value } = event.target;
            changes[name]=value;
       
        console.log("CHANGE VAL", changes)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
            
        const form = event.target;
        console.log("FORM", form)
        const formData = new FormData(form);
        console.log("FORMDATA", FormData)
        console.log(new URLSearchParams(formData).toString());
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson); 
        console.log([...formData.entries()]);
        // for (const field in EditAnimal) {
        //     if (EditAnimal[field] !== animal[field] && EditAnimal[field] !== "" ) {
        //     editReq[field] = EditAnimal[field];
        //   }
        // }
   

        // axios.put(`${base_url}/api/animals/${animalId}/`, EditAnimal)
        //     .then((response) => {
        //         console.log("response", response)
        //         event.target.reset();
        //     })
        //     .catch((error) => {
        //     });

        // for (let key in EditAnimal) {
        //     EditAnimal[key] = "";
        // }
    
    }
        


    return (
        <main className="add-animal">
    <form method="put" onSubmit={handleSubmit}>
            <div className="create-request__div">
                <label className="create-request__label" htmlFor="name">Animal Name: </label>
                <input className="create-request__input" id="name" name="name" onChange={handleChange} value={values.name} />
            </div>

            <div className="create-request__div">
                <label className="create-request__label" htmlFor="organization">Organization: </label>
                <select className="create-request__input"  name="organization" id="organization"   value={animal?.size} onChange={handleChange} >
                <option value="">Select an Organization</option> 
                    {orgList && orgList.map(org => (
                        <option key={org.id} value={org.id}>{org.name}</option>
                    ))}
                </select>
            </div>

            <div className="create-request__div">
                <label className="create-request__label" htmlFor="type">Type: </label>
                <input className="create-request__input" id="type" name="type" onChange={handleChange}  defaultValue={values.type} />
            </div>

            <div className="create-request__div">
                <label className="create-request__label" htmlFor="species">Species: </label>
                <input className="create-request__input" id="species" name="species" onChange={handleChange} defaultValue={values.species} />
            </div>

            <div className="create-request__div">
                <label className="create-request__label" htmlFor="breeds">Breeds: </label>
                <input className="create-request__input" id="breeds" name="breeds" onChange={handleChange}  defaultValue={values.breeds}/>
            </div>

            <div className="create-request__div">
                <label className="create-request__label" htmlFor="colors">Colors: </label>
                <input className="create-request__input" id="colors" name="colors" onChange={handleChange} defaultValue={values.colors}  />
            </div>

            <div className="create-request__div">
                <label className="create-request__label" htmlFor="coat">Coat: </label>
                <input className="create-request__input" id="coat" name="coat" onChange={handleChange} defaultValue={values.coat} />
            </div>


            <div className='create-request__div'>
                <label className="create-request__label" htmlFor="age">Age:</label>
                <select className="create-request__input" name="age" id="age" onChange={handleChange} defaultValue={values.age}>
                    <option value="">Select Age</option>
                    <option value="Baby">Baby</option>
                    <option value="Young">Young</option>
                    <option value="Adult">Adult</option>
                    <option value="Senior">Senior</option>
                </select>
            </div>


            <div className='create-request__div'>
                <label className="create-request__label" htmlFor="gender">Choose a Gender:</label>
                <select className="create-request__input" name="gender" id="gender" onChange={handleChange}  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>


            <div className='create-request__div'>
                <label className="create-request__label" htmlFor="size">Size: </label>
                <select className="create-request__input" name="size" id="size" value={animal?.size} onChange={handleChange}   >
                    <option value="">Select Size</option>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                    <option value="Giant">Giant</option>
                </select>
            </div>

            <div className="create-request__div">
                <label className="create-request__label" htmlFor="photo">Photo: </label>
                <input className="create-request__input" id="photo" name="photo" onChange={handleChange} defaultValue={values.photos}  />
            </div>


            <div className="create-request__div">
                <label className="create-request__label" htmlFor="description">Description:  </label>
                <textarea className='create-request__input' defaultValue={values.description} type="text" name="description" id="descritpion" placeholder='Enter Request details' onChange={handleChange} />
            </div>

            <div className='add-animal__env'>
                <h4 className="add-animal__title">Friendly With:</h4>

                <div className="checkbox-wrapper-13 add-animal__box">
                    <input id="c1-13" type="checkbox" name="children" defaultValue={values.children} checked={values.children === "true"} onChange={(e) => setValues({ ...values, children: e.target.checked ? 'True' : 'False' })} />
                    <label htmlFor="c1-13">Children</label>
                </div>

                <div className="checkbox-wrapper-13 add-animal__box">
                    <input id="c1-13" type="checkbox" name="dogs" value={values.dogs} checked={values.dogs === "true"} onChange={(e) => setValues({ ...values, dogs: e.target.checked ? 'True' : 'False' })} />
                    <label htmlFor="c1-13">Dogs</label>
                </div>

                <div className="checkbox-wrapper-13 add-animal__box">
                    <input id="c1-13" type="checkbox" name="cats" defaultValue={values.cats} checked={values.cats === "true"} onChange={(e) => setValues({ ...values, cats: e.target.checked ? 'True' : 'False' })} /> 
                    <label htmlFor="c1-13">Cats</label>
                </div>

            </div>

            <div className='add-animal__env'>

                <div className="checkbox-wrapper-13 add-animal__box">
                    <input id="c1-13" type="checkbox" name="spayed_neutered" checked={values.spayed_neutered === "True"}  onChange={(e) => setValues({ ...values, spayed_neutered: e.target.checked ? 'True' : 'False' })} />
                    <label htmlFor="c1-13">Spayed/Nuetered</label>
                </div>

                <div className="checkbox-wrapper-13 add-animal__box">
                    <input id="c1-13" type="checkbox" name="house_trained" checked={values.house_trained === "True"}  onChange={(e) => setValues({ ...values, house_trained: e.target.checked ? 'True' : 'False' })} />
                    <label htmlFor="c1-13">House Trained</label>
                </div>

                <div className="checkbox-wrapper-13 add-animal__box">
                    <input id="c1-13" type="checkbox" name="declawed" checked={values.declawed === "True"}  onChange={(e) => setValues({ ...values, declawed: e.target.checked ? 'True' : 'False' })} />
                    <label htmlFor="c1-13">Declawed</label>
                </div>

                <div className="checkbox-wrapper-13 add-animal__box">
                    <input id="c1-13" type="checkbox" name="special_needs" checked={values.special_needs === "True"}  onChange={(e) => setValues({ ...values, special_needs: e.target.checked ? 'True' : 'False' })} />
                    <label htmlFor="c1-13">Special Needs</label>
                </div>

                <div className="checkbox-wrapper-13 add-animal__box">
                    <input id="c1-13" type="checkbox" name="shots_current" checked={values.shots_current  === "True"}  onChange={(e) => setValues({ ...values, shots_current: e.target.checked ? 'True' : 'False' })} />
                    <label htmlFor="c1-13">Shots Current</label>
                </div>

                <div className="checkbox-wrapper-13 add-animal__box">
                    <input id="c1-13" type="checkbox" name="mixed" checked={values.mixed  === "True"}  onChange={(e) => setValues({ ...values, mixed: e.target.checked ? 'True' : 'False' })} />
                    <label htmlFor="c1-13">Mixed</label>
                </div>
            </div>

            <div className="add-animal__buttondiv">
                <button type="submit" className='add-animal__button' >SUBMIT</button>
            </div>
</form>
        </main>
    )



}