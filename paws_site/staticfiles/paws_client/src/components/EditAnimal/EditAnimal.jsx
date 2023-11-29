import "./EditAnimal.scss"
import { useParams, useNavigate} from "react-router-dom";
import { useState, useEffect} from 'react';
import axios from 'axios';
import { useGetEffect, base_url } from "../../utils";

export default function EditAnimal() {
    const navigate = useNavigate();
    const { animalId } = useParams();
	const [orgList, setOrgList] =useState("");
    const[animal, setAnimal]=useState("");

    useGetEffect(`${base_url}/api/organizations/`, setOrgList);
    useGetEffect(`${base_url}/api/animals/${animalId}`, setAnimal);
  
   const [values, setValues] = useState({
    description: "",  name: "", gender: "", type: "", species: "", breeds: "", colors: "", age: "", coat: "", active: "", organization: "",
    });
    
    const [checkbox, setCheckbox]=useState({
        dogs: "", cats: "", children: "", spayed_neutered: "", house_trained: "", declawed: "", special_needs: "", shots_current: "", mixed: "", 
        });


    const updateValues = (animal) => {
        if (animal) {
            setValues(prevValues => ({
                ...prevValues,
                description: animal.description,
                name: animal.name,
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
            setCheckbox(prevValues => ({
                ...prevValues,
                dogs: animal.environment.dogs,
                cats: animal.environment.cats,
                children: animal.environment.children,
                spayed_neutered: animal.attributes.spayed_neutered,
                house_trained: animal.attributes.house_trained,
                declawed: animal.attributes.declawed,
                special_needs: animal.attributes.special_needs,
                shots_current: animal.attributes.shots_current,
                mixed: animal.attributes.mixed,
            }));
        }
    };

    useEffect(() => {
        updateValues(animal);
    }, [animal]);
  

    const handleChange = (event) => {
        if (!event) {
            return;
        }
       
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };
 
    
    const handleCheckChange = (event) => {
        if (!event) {
            return;
        }

        const { name, checked } = event.target;
        setCheckbox({ ...checkbox, [name]: checked });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        let EditAnimal ={
            attributes:{
                spayed_neutered: checkbox.spayed_neutered,
                house_trained: checkbox.house_trained,
                declawed: checkbox.declawed,
                special_needs: checkbox.special_needs,
                shots_current: checkbox.shots_current,
                mixed: checkbox.mixed,
            },
            environment: {
                children:checkbox.children,
                dogs: checkbox.dogs,
                cats: checkbox.cats
            },
            description: values.description,
            name: values.name,
            gender: values.gender,
            size: values.size,
            type: values.type,
            species: values.species,
            breeds: values.breeds,
            colors: values.colors,
            age: values.age,
            coat: values.coat,
            active: values.active,
            organization: values.organization
        }
        
        axios.put(`${base_url}/api/animals/${animalId}/`, EditAnimal)
            .then(() => {
                navigate(`/animal/${animalId}`);
            })
            .catch((error) => {
                console.error(error);
            });
    }
        
    return (
     
        <main className="add-animal">

            <div className="create-request__div">
                <label className="create-request__label" htmlFor="name">Animal Name: </label>
                <input className="create-request__input" id="name" name="name" value={values.name} onChange={handleChange} />
            </div>

            <div className="create-request__div">
                <label className="create-request__label" htmlFor="organization">Organization: </label>
                <select className="create-request__input"  name="organization" id="organization"   value={values.organization} onChange={handleChange} >
                <option value="">Select an Organization</option> 
                    {orgList && orgList.map(org => (
                        <option key={org.id} value={org.id}>{org.name}</option>
                    ))}
                </select>
            </div>

            <div className="create-request__div">
                <label className="create-request__label" htmlFor="type">Type: </label>
                <input className="create-request__input" id="type" name="type" onChange={handleChange}  value={values.type} />
            </div>

            <div className="create-request__div">
                <label className="create-request__label" htmlFor="species">Species: </label>
                <input className="create-request__input" id="species" name="species" onChange={handleChange} value={values.species} />
            </div>

            <div className="create-request__div">
                <label className="create-request__label" htmlFor="breeds">Breeds: </label>
                <input className="create-request__input" id="breeds" name="breeds" onChange={handleChange}  value={values.breeds}/>
            </div>

            <div className="create-request__div">
                <label className="create-request__label" htmlFor="colors">Colors: </label>
                <input className="create-request__input" id="colors" name="colors" onChange={handleChange} value={values.colors}  />
            </div>

            <div className="create-request__div">
                <label className="create-request__label" htmlFor="coat">Coat: </label>
                <input className="create-request__input" id="coat" name="coat" onChange={handleChange} value={values.coat} />
            </div>


            <div className='create-request__div'>
                <label className="create-request__label" htmlFor="age">Age:</label>
                <select className="create-request__input" name="age" id="age" value={values.age} onChange={handleChange} >
                    <option value="">Select Age</option>
                    <option value="Baby">Baby</option>
                    <option value="Young">Young</option>
                    <option value="Adult">Adult</option>
                    <option value="Senior">Senior</option>
                </select>
            </div>


            <div className='create-request__div'>
                <label className="create-request__label" htmlFor="gender">Choose a Gender:</label>
                <select className="create-request__input" name="gender" id="gender" value={values.gender} onChange={handleChange}  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>


            <div className='create-request__div'>
                <label className="create-request__label" htmlFor="size">Size: </label>
                <select className="create-request__input" name="size" id="size" value={values.size} onChange={handleChange}  >
                    <option value="">Select Size</option>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                    <option value="Giant">Giant</option>
                </select>
            </div>

            <div className="create-request__div">
                <label className="create-request__label" htmlFor="photo">Photo: </label>
                <input className="create-request__input" id="photo" name="photo" onChange={handleChange} value={values.photos}  />
            </div>


            <div className="create-request__div">
                <label className="create-request__label" htmlFor="description">Description:  </label>
                <textarea className='create-request__input' value={values.description} type="text" name="description" id="descritpion" placeholder='Enter Request details' onChange={handleChange} />
            </div>

            <div className='add-animal__env'>
                <h4 className="add-animal__title">Friendly With:</h4>

                <div className="checkbox-wrapper-13 add-animal__box">
                    <input id="c1-13" type="checkbox" name="children" checked={checkbox.children} onChange={handleCheckChange} />
                    <label htmlFor="c1-13">Children</label>
                </div>

                <div className="checkbox-wrapper-13 add-animal__box">
                    <input id="c1-13" type="checkbox" name="dogs"  checked={checkbox.dogs}  onChange={handleCheckChange} />
                    <label htmlFor="c1-13">Dogs</label>
                </div>

                <div className="checkbox-wrapper-13 add-animal__box">
                    <input id="c1-13" type="checkbox" name="cats" checked={checkbox.cats} onChange={handleCheckChange} /> 
                    <label htmlFor="c1-13">Cats</label>
                </div>

            </div>

            <div className='add-animal__env'>

                <div className="checkbox-wrapper-13 add-animal__box">
                    <input id="c1-13" type="checkbox" name="spayed_neutered" checked={checkbox.spayed_neutered} onChange={handleCheckChange} />
                    <label htmlFor="c1-13">Spayed/Neutered</label>
                </div>

                <div className="checkbox-wrapper-13 add-animal__box">
                    <input id="c1-13" type="checkbox" name="house_trained" checked={checkbox.house_trained} onChange={handleCheckChange} />
                    <label htmlFor="c1-13">House Trained</label>
                </div>

                <div className="checkbox-wrapper-13 add-animal__box">
                    <input id="c1-13" type="checkbox" name="declawed" checked={checkbox.declawed ?? ''} onChange={handleCheckChange} />
                    <label htmlFor="c1-13">Declawed</label>
                </div>

                <div className="checkbox-wrapper-13 add-animal__box">
                    <input id="c1-13" type="checkbox" name="special_needs" checked={checkbox.special_needs} onChange={handleCheckChange} />
                    <label htmlFor="c1-13">Special Needs</label>
                </div>

                <div className="checkbox-wrapper-13 add-animal__box">
                    <input id="c1-13" type="checkbox" name="shots_current" checked={checkbox.shots_current} onChange={handleCheckChange} />
                    <label htmlFor="c1-13">Shots Current</label>
                </div>

                <div className="checkbox-wrapper-13 add-animal__box">
                    <input id="c1-13" type="checkbox" name="mixed" checked={checkbox.mixed } onChange={handleCheckChange} />
                    <label htmlFor="c1-13">Mixed</label>
                </div>
            </div>

            <div className="add-animal__buttondiv">
                <button type="submit" className='add-animal__button' onClick={handleSubmit}>SUBMIT</button>
            </div>

        </main>
   
    )



}