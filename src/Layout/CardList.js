import { useParams, useNavigate} from "react-router-dom";
import Card from "./Card.js";
import {readDeck} from "../utils/api/index";

export const CardList = () => {
  const navigate = useNavigate();
  const {deckId} = useParams();
  const deck = readDeck(deckId);
  const cards = deck.cards.map((card) => {
    <Card card={card}/>
  });
  return (
    <div>
      <ul>
        {cards}
      </ul>
    </div>
  );
}

export default CardList;