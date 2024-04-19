import React, {useState} from "react";
import { useParams, useNavigate} from "react-router-dom";
import {readDeck, deleteDeck} from "../utils/api/index";
import CardList from "./CardList.js";


export const Deck = () => {
  const navigate = useNavigate();
  const {deckId} = useParams();
  const deck = readDeck(deckId);
  
  function handleEdit() {
    navigate(`/decks/${deckId}/edit`);
  };
  
  function handleStudy() {
    navigate(`/decks/${deckId}/study`);
  };
  
  function handleAddCards() {
    navigate(`/decks/${deckId}/cards/new`);
  };
  
  const handleDelete =  async () => {
    const result = window.confirm("Delete this deck?\n\nYou will not be able to recover it.");
    if (result) {
      await deleteDeck(deck.id);
    }
    navigate(`/`);
  };

  return (
    <div>
      <h3>{deck.name}</h3>
      <p>{deck.description}</p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleStudy}>Study</button>
      <button onClick={handleAddCards}>Add Cards</button>
      <button onClick={handleDelete}>Delete</button>
      <h1>Cards</h1>
      <CardList />
    </div>
    
  );
}

export default Deck;
