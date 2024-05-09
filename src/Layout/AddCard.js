import React, {useState, useEffect} from "react";
import { useParams, useNavigate} from "react-router-dom";
import {readDeck, createCard} from "../utils/api/index";


export const AddCard = () => {
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

  const nav = <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="/">Home</a></li>
                  <li className="breadcrumb-item"><a href={"/decks/" + deck.id}>{deck.name}</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Add Card</li>
                </ol>
              </nav>;

  return (
    <div>
      {nav}
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

export default AddCard;