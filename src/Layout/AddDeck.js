import React, {useState} from "react";
import { useParams, useNavigate} from "react-router-dom";
import {createDeck, listDecks} from "../utils/api/index";


export const AddDeck = () => {
  const navigate = useNavigate();
  const initialFormState = {
    name: "",
    description: "",
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
    const newDeck = {"name": formData.name, "description": formData.description};
    createDeck(newDeck);
    setFormData({ ...initialFormState });
    const decks = Promise.resolve(listDecks());
    const curDeck = decks.find((deck) => deck.name == formData.name);
    setFormData(initialFormState);
    navigate(`/decks/${curDeck.id}`);
  };
  
  function handleCancel() {
    navigate(`/`);
  }

  return (
    <div>
      <h1>Create Deck</h1>
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
          Description
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

export default AddDeck;