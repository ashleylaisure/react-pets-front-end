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
    setSelected(pet);
    setIsFormOpen(false);
  }

  const handleFormView = (pet) => {
    // has the pet object been passed to the function
    if(!pet._id) setSelected(null)
    setIsFormOpen(!isFormOpen)
  }

  const handleUpdatePet = async (formData, _id) => {
    try {
      const updatedPet = await petService.update(formData, _id);
      console.log(updatedPet)

      if(updatedPet.err) {
        throw new Error(updatedPet.err)
      }

      const updatedPetList = pets.map((pet) => (
        pet._id !== updatedPet._id ? pet : updatedPet 
      ))

      setPets(updatedPetList)
      setSelected(updatedPet)
      setIsFormOpen(false)

    } catch (err) {
      console.log(err)
    }
  }

  const handleAddPet = async (formData) => {
    try {
      // call petService.create, assign return value to newPet
      const newPet = await petService.create(formData);
      console.log(newPet)

      if(newPet.err) {
        throw new Error(newPet.err)
      }

      // add the pet object and the current pets to a new array
      setPets([...pets, newPet])
      // close the form aftr we've added the new pet
      setIsFormOpen(false)

    } catch (err) {
      console.log(err)
    }
  }

  const handleDeletePet = async (petId) => {
    try {
      const deletedPet = await petService.deletePet(petId)
      console.log(deletedPet)

      if(deletedPet.err) {
        throw new Error(deletedPet.err)
      }

      const newPetList = pets.filter((pet) => pet._id !== deletedPet._id)
      setPets(newPetList)
      setSelected(null)
      setIsFormOpen(false)

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const fetchPets = async () => {

      try {
        // call on the pet service's index function
        const fetchedPets = await petService.index()

        // throw an error and pass the error to the catch block
        if (fetchedPets.err) {
          throw new Error(fetchedPets.err)
        }
        // st pets state to the returned pets data
        setPets(fetchedPets)

      // log the error object
      } catch (err) {
        console.log(err)
      }
    }

    fetchPets()
    // add an empty dependency array to the 'useEffect()' hook
  }, []);

  console.log("pets:", pets)

  return (
    <>
      <PetList 
        pets={pets} 
        handleSelect={handleSelect}
        handleFormView={handleFormView}
        isFormOpen={isFormOpen}/>

      {isFormOpen ? (
        <PetForm 
          handleAddPet={handleAddPet}
          selected={selected}
          handleUpdatePet={handleUpdatePet}/>
        ) : (
        <PetDetail 
          handleFormView={handleFormView}
          selected={selected}
          handleDeletePet={handleDeletePet}/>
        
        )}

    </>
  )
}

export default App
