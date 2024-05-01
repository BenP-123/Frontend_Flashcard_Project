import React, {useState, useEffect} from "react";
import { useParams, useNavigate} from "react-router-dom";
import {readCard, updateCard} from "../utils/api/index";


export const EditCard = () => {
  const navigate = useNavigate();
  const {deckId, cardId } = useParams();

  const [card, setCard] = useState({ front: "", back: "" });

  useEffect(() => {
    const fetchCard = async () => {
      const loadedCard = await readCard(cardId);
      setCard(loadedCard);
    };

    fetchCard();
  }, [cardId]);

  
  const initialFormState = {
    front: card.front,
    back: card.back,
  };
  const [formData, setFormData] = useState({ ...initialFormState });

  useEffect(() => {
    setFormData({
      ...formData,
      front: card.front,
      back: card.back,
    });
  }, [card]);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedCard = {
      id: cardId,
      front: formData.front,
      back: formData.back,
      deckId: deckId,
    };
    const newCard = await updateCard(updatedCard);
    console.log(newCard);
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