import React, {useState, useEffect} from "react";
import { useNavigate} from "react-router-dom";
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newDeck = {"name": formData.name, "description": formData.description};
    const createdDeck = await createDeck(newDeck);
    setFormData(initialFormState);
    navigate(`/decks/${createdDeck.id}`);
  };
  
  function handleCancel() {
    navigate(`/`);
  }

  const nav = <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="/">Home</a></li>
                  <li class="breadcrumb-item active" aria-current="page">Create Deck</li>
                </ol>
              </nav>;

  return (
    <div>
      {nav}
      <h1>Create Deck</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name
          <input
            id="name"
            type="text"
            placeholder="Deck Name"
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
            placeholder="Brief description of the deck"
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