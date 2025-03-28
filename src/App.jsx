import { useState, useEffect } from 'react'
import * as petService from './services/petService.js'
import PetList from './components/PetList/PetList.jsx';
import PetDetail from './components/PetDetail/PetDetail.jsx';
import PetForm from './components/PetForm/PetForm.jsx'
import './App.css'

function App() {

  const [pets, setPets] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSelect = (pet) => {
    setSelected(pet)
  }

  const handleFormView = () => {
    setIsFormOpen(!isFormOpen)
  }

  const handleAddPet = async (formData) => {
    try {
      const newPet = await petService.create(formData);
      console.log(newPet)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const fetchPets = async () => {

      try {
        const fetchedPets = await petService.index()
        if (fetchedPets.err) {
          throw new Error(fetchedPets.err)
        }
        setPets(fetchedPets)
      } catch (err) {
        console.log(err)
      }
    }

    fetchPets()
  }, []);

  console.log("pets:", pets)

  return (
    <>
      <PetList 
        pets={pets} 
        handleSelect={handleSelect}
        handleFormView={handleFormView}
        isFormOpen={isFormOpen}/>

      {/* {isFormOpen && <PetForm />} */}

      {isFormOpen ? (
        <PetForm handleAddPet={handleAddPet}/>
        ) : (
        <PetDetail selected={selected}/>)}

    </>
  )
}

export default App
