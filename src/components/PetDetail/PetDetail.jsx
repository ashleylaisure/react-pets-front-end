// src/components/PetDetail/PetDetail.jsx

const PetDetail = (props) => {

    return (
      <div className="details-container">
        {!props.selected ? (<h2>NO DETAILS</h2>) : (

          <div>
            <h1>{props.selected.name}</h1>
            <h2>Breed: {props.selected.breed}</h2>
            <h2>
              Age: {props.selected.age} year{props.selected.age > 1 ? 's' : ''} old
            </h2>
            <div className="button-container">
              <button onClick={() => props.handleFormView(props.selected)}>
                Edit Pet
              </button>
              <button onClick={() => props.handleDeletePet(props.selected._id)}>
                Delete Pet
              </button>
            </div>
          </div>
        )}

      </div>
        
    );
  };
  
  export default PetDetail;
  