import React, {useState, useEffect} from "react";
import { useParams, useNavigate} from "react-router-dom";
import {readDeck, createCard} from "../utils/api/index";
import CardForm from "./CardForm.js";

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
  }, [deckId]);
 
  const returnCard = async (cardFront, cardBack) => {
    const newCard = {"id": cardId, "front": cardFront, "back": cardBack, "deckId": deckId};
    await createCard(deckId, newCard);
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
      <CardForm returnCard={returnCard} handleDone={handleDone} />
    </div>
    
  );
}

export default AddCard;