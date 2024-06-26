import React, {useState, useEffect} from "react";
import { useParams, useNavigate} from "react-router-dom";
import {readDeck, deleteDeck} from "../utils/api/index";
import CardList from "./CardList.js";


export const Deck = () => {
  const navigate = useNavigate();
  let {deckId} = useParams();
  const [deck, setDeck] = useState([]);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    const fetchDeck = async () => {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
    };

    fetchDeck();
  }, [deckId, deleted]);
  
  function handleEdit() {
    navigate(`/decks/${deckId}/edit`);
  };
  
  function handleStudy() {
    navigate(`/decks/${deckId}/study`);
  };
  
  function handleAddCards() {
    navigate(`/decks/${deckId}/cards/new`);
  };

  function handleDeleted() {
    setDeleted(!deleted);
  };
  
  const handleDelete =  async () => {
    const result = window.confirm("Delete this deck?\n\nYou will not be able to recover it.");
    if (result) {
      await deleteDeck(deck.id);
    }
    navigate(`/`);
  };

  const nav = <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="/">Home</a></li>
                  <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
                </ol>
              </nav>;

  return (
    <div>
      {nav}
      <h3>{deck.name}</h3>
      <p>{deck.description}</p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleStudy}>Study</button>
      <button onClick={handleAddCards}>Add Cards</button>
      <button onClick={handleDelete}>Delete</button>
      <h1>Cards</h1>
      <CardList cards = {deck.cards} handleDeleted={handleDeleted}/>
    </div>
    
  );
}

export default Deck;
