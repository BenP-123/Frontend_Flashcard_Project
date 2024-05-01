import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { listDecks, deleteDeck } from '../utils/api/index';

export const DeckList = () => {
  const navigate = useNavigate();
  const [decks, setDecks] = useState([]);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    const fetchDecks = async () => {
      const loadedDecks = await listDecks();
      setDecks(loadedDecks);
    };

    fetchDecks();
  }, [changed]);

  const handleDelete = async (id) => {
    const result = window.confirm("Delete this deck?\n\nYou will not be able to recover it.");
    if (result) {
      await deleteDeck(id);
      setChanged(!changed);
      navigate('/');
    }
  };

  const handleView = (id) => {
    navigate(`/decks/${id}`);
  };

  const handleStudy = (id) => {
    navigate(`/decks/${id}/study`);
  };

  const handleCreate = () => {
    navigate('/decks/new');
  };

  return (
    <div>
      <button onClick={handleCreate}>Create Deck</button>
      <ul>
        {decks.map((deck) => (
          <div key={deck.id}>
            <h2>{deck.name}</h2>
            <p>{deck.cards.length} cards</p>
            <p>{deck.description}</p>
            <button onClick={() => handleView(deck.id)}>View</button>
            <button onClick={() => handleStudy(deck.id)}>Study</button>
            <button onClick={() => handleDelete(deck.id)}>Delete</button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default DeckList;