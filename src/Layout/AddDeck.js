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
  const [decks, setDecks] = useState([]);

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
    setFormData({ ...initialFormState });
    setFormData(initialFormState);
    navigate(`/decks/${createdDeck.id}`);
  };
  
  function handleCancel() {
    navigate(`/`);
  }

  useEffect(() => {
    const fetchDecks = async () => {
      const loadedDecks = await listDecks();
      setDecks(loadedDecks);
    };

    fetchDecks();
  }, [formData]);

  return (
    <div>
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