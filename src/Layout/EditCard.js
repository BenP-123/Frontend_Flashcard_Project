import React, {useState} from "react";
import { useParams, useNavigate} from "react-router-dom";
import {readCard, updateCard} from "../utils/api/index";


export const EditCard = () => {
  const navigate = useNavigate();
  const {deckId, cardId } = useParams();
  const card = readCard(cardId);
  
  const initialFormState = {
    front: card.front,
    back: card.back,
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
    const newCard = {"id": cardId, "front": formData.front, "back": formData.back, "deckId": deckId};
    updateCard(newCard);
    navigate(`/decks/${deckId}`);
  };
  
  function handleCancel() {
    navigate(`/decks/${deckId}`);
  }

  return (
    <div>
      <h1>Edit Card</h1>
        <form onSubmit={handleSubmit}>
        <label htmlFor="front">
          Front
          <textarea
            id="front"
            type="text"
            name="front"
            onChange={handleChange}
            value={formData.front}
          />
        </label>
        <br />
        <label htmlFor="back">
          Back
          <textarea
            id="back"
            type="text"
            name="back"
            onChange={handleChange}
            value={formData.back}
          />
        </label>
        <br />
        <button onClick={handleCancel}>Cancel</button>
        <button type="submit">Submit</button>
      </form>
    </div>
    
  );
}

export default EditCard;