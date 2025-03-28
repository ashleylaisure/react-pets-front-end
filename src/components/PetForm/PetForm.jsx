import {useState} from 'react';

const PetForm = (props) => {

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        breed: '',
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    console.log(formData)

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.handleAddPet(formData);
    }

    return (
        <div>

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

                <button type="submit">Add new Pet</button>

            </form>
        </div>
    )
}

export default PetForm;