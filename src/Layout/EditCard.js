import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateCard, readDeck} from '../utils/api';
import CardForm from "./CardForm.js";

export const EditCard = () => {
  const navigate = useNavigate();
  const { deckId, cardId } = useParams();

  const [deck, setDeck] = useState({name: "", description: ""});

  useEffect(() => {
    const fetchDeck = async () => {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
    };
    fetchDeck();
  }, [deckId]);

  const deckIdInteger = parseInt(deckId);

  const returnCard = async (cardFront, cardBack) => {

    await updateCard({
      front: cardFront,
      back: cardBack,
      id: cardId,
      deckId: deckIdInteger
    });

    navigate(`/decks/${deckId}`);
  };

  function handleCancel() {
    navigate(`/decks/${deckId}`);
  }

  const nav = 
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><a href="/">Home</a></li>
        <li className="breadcrumb-item"><a href={"/decks/" + deck.id}>{deck.name}</a></li>
        <li className="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
      </ol>
    </nav>;

  return (
    <div>
      {nav}
      <h1>Edit Card</h1>
      <CardForm returnCard={returnCard} handleDone={handleCancel} />
    </div>
  );
      
}

export default EditCard;