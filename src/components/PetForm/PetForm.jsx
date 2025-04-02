import {useState} from 'react';

const PetForm = (props) => {

    const initialState = {
            name: '',
            age: '',
            breed: '',
    }

    const [formData, setFormData] = useState(
        // if pet data has been passed as props, we set formData as the pet object 
        props.selected ? props.selected : initialState
    )

    const handleChange = (evt) => {
        setFormData({...formData, [evt.target.name]: evt.target.value})
    }

    console.log(formData)

    const handleSubmit = (evt) => {
        evt.preventDefault();
        
        props.selected ? props.handleUpdatePet(formData, props.selected._id)
        : props.handleAddPet(formData);
    }

    return (
        <div className="form-container">

            <form onSubmit={handleSubmit}>

                <label htmlFor="name">Name:</label>
                <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="age">Age:</label>
                <input
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="breed">Breed:</label>
                <input
                    id="breed"
                    name="breed"
                    value={formData.breed}
                    onChange={handleChange}
                    required
                />

                <button type="submit">{props.selected ? 'Update Pet' : 'Add New Pet'}</button>

            </form>
        </div>
    )
}

export default PetForm;