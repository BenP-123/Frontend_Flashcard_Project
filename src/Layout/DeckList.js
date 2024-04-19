import {useNavigate, useParams} from "react-router-dom";
import {listDecks, deleteDeck} from "../utils/api/index";
import React from "react";

export const DeckList = () => {
  const navigate = useNavigate();
  const {deckId} = useParams();
  let decks = Promise.resolve(listDecks());
  let decksList;
  
  if(decks.length > 0){
    decksList = decks.map((deck) => {
    <div>
      <h2>{deck.name}</h2>
      <p>NUMBER OF CARDS IN DECK?</p>
      <p>{deck.description}</p>
      <button onClick={handleView}>View</button>
      <button onClick={handleStudy}>Study</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  });
  }
  
  const handleDelete = async (id) => {
    const result = window.confirm("Delete this deck?\n\nYou will not be able to recover it.");
    if (result) {
      await deleteDeck(id);
      navigate('/');
    }
  };
  
  const handleView = async (id) => {
    navigate(`/decks/${id}`);
  }
  
  const handleStudy = async (id) => {
    navigate(`/decks/${id}/study`);
  }
  
  const handleCreate = async () => {
    navigate(`/decks/new`);
  }
  
  return (
    <div>
      <button onClick={handleCreate}>Create Deck</button>
      <ul>
        {decksList}
      </ul>
    </div>
  );
}

export default DeckList;