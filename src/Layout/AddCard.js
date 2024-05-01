import React, {useState, useEffect} from "react";
import { useParams, useNavigate} from "react-router-dom";
import {readDeck, createCard} from "../utils/api/index";


export const EditCard = () => {
  const navigate = useNavigate();
  const {deckId, cardId } = useParams();

  const [deck, setDeck] = useState([]);

  useEffect(() => {
    const fetchDecks = async () => {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
    };

    fetchDecks();
  }, []);
  
  const initialFormState = {
    front: "",
    back: "",
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
    const newCard = {"id": cardId, "front": formData.front, "back": formData.back, "deckId": deckId};
    await createCard(deckId, newCard);
    setFormData({ ...initialFormState });
  };
  
  function handleDone() {
    navigate(`/decks/${deckId}`);
  }

  return (
    <div>
      <h1>{deck.name}: Add Card</h1>
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
        <button onClick={handleDone}>Done</button>
        <button type="submit">Submit</button>
      </form>
    </div>
    
  );
}

export default EditCard;