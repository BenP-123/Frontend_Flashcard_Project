import React, {useState} from "react";
import { useParams, useNavigate} from "react-router-dom";
import {readDeck, updateDeck} from "../utils/api/index";


export const EditDeck = () => {
  const navigate = useNavigate();
  const {deckId} = useParams();
  const deck = readDeck(deckId);
  
  const initialFormState = {
    name: deck.name,
    description: deck.description,
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedDeck = {"deckId": deckId, "name": formData.name, "description": formData.description};
    updateDeck(updatedDeck);
    navigate(`/decks/${deckId}`);
  };
  
  function handleCancel() {
    navigate(`/decks/${deckId}`);
  }

  return (
    <div>
      <h1>Edit Deck</h1>
        <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name
          <input
            id="name"
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
          />
        </label>
        <br />
        <label htmlFor="description">
          description
          <textarea
            id="description"
            type="text"
            name="description"
            onChange={handleChange}
            value={formData.description}
          />
        </label>
        <br />
        <button onClick={handleCancel}>Cancel</button>
        <button type="submit">Submit</button>
      </form>
    </div>
    
  );
}

export default EditDeck;