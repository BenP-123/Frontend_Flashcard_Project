import React, {useState, useEffect} from "react";
import { useParams, useNavigate} from "react-router-dom";
import {readDeck, deleteDeck} from "../utils/api/index";
import CardList from "./CardList.js";


export const Deck = () => {
  const navigate = useNavigate();
  const {deckId} = useParams();
  const [deck, setDeck] = useState([]);

  useEffect(() => {
    const fetchDecks = async () => {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
    };

    fetchDecks();
  }, []);
  
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
      <CardList cards = {deck.cards}/>
    </div>
    
  );
}

export default Deck;
