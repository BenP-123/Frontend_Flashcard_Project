import React from "react";
import {deleteCard} from "../utils/api/index";
import {NavLink, useNavigate} from "react-router-dom";

export const Card = ({card}) => {
  const navigate = useNavigate();
  
  const handleDelete = async () => {
    const result = window.confirm("Delete this card?\n\nYou will not be able to recover it." );
    if (result) {
      await deleteCard(card.id);
    }
  };
  
  function handleEdit() {
    navigate(`/decks/${card.deckId}/cards/${card.id}/edit`);
  };
  
  
  return (
      <div>
        <p>{card.front}</p>
        <p>{card.back}</p>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleEdit}>Edit</button>
      </div>
    );
}

export default Card;