import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteCard, createCard, readDeck} from '../utils/api';
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

  const returnCard = async (cardFront, cardBack) => {
    // Step 1: Delete the existing card
    await deleteCard(cardId);

    // Step 2: Create a new card with the updated information
    await createCard(deckId, {
      front: cardFront,
      back: cardBack,
      deckId: deckId
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