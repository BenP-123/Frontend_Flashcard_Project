import {deleteCard} from "../utils/api/index";
import {useNavigate} from "react-router-dom";

export const CardList = ({ cards = []}) => {

  const navigate = useNavigate();
  
  const handleDelete = async (cardId) => {
    const result = window.confirm("Delete this card?\n\nYou will not be able to recover it." );
    if (result) {
      await deleteCard(cardId);
    }
  };
  
  function handleEdit(deckId, cardId) {
    navigate(`/decks/${deckId}/cards/${cardId}/edit`);
  };


  return (
    <ul>
      {cards.map((card) => (
        <li key={card.id}>
          <p>{card.front}</p>
          <p>{card.back}</p>
          <button onClick={() => handleDelete(card.id)}>Delete</button>
          <button onClick={() => handleEdit(card.deckId, card.id)}>Edit</button>
        </li>
      ))}
    </ul>
  );

}

export default CardList;