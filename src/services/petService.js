// src/services/petService.js

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/pets`;

const index = async () => {
    try {
        const res = await fetch(BASE_URL)
        return res.json();
    } catch (err) {
        console.log(err)
    }
}

const create = async (formData) => {
    try {
        const res = await fetch(BASE_URL, {
            // specify that this is a POST request
            method: 'POST',
            // we're sending JSON data, se we attach a content-type header
            // and speciry that the data being sent is type "application/json"
            headers: {'Content-Type': 'application/json',},
            // The formData, converted to JSON, is sent as the body 
            // this will be recived on the back-end as req.body
            body: JSON.stringify(formData),
        });
        return res.json();
        
    } catch (err) {
        console.log(err)
    }
}

const update = async (formData, _id) => {
    try {
        const res = await fetch(`${BASE_URL}/${_id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(formData),
        });
        return res.json()

    } catch (err) {
        console.log(err)
    }
}

const deletePet = async (petId) => {
    try {
        const res = await fetch(`${BASE_URL}/${petId}`, {
            method: 'DELETE',
            
        })
        return res.json()

    } catch (err) {
        console.log(err)
    }

}

// console.log(await index());

export {index, create, update, deletePet}