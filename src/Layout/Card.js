import React, {useState, useEffect} from "react";
import {readCard} from "../utils/api/index";

export const Card = ({cardId, handleNext}) => {

  const [card, setCard] = useState({});
  const [front, setFront] = useState(true);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const fetchCard = async () => {
      const loadedCard = await readCard(cardId);
      setCard(loadedCard);
    };

    fetchCard();
    setFront(true);
    setFlipped(false);
  }, [cardId]);

  function handleFlip(){
    setFlipped(true);
    setFront(!front);
  }

  if(flipped){
    if(front){
      return (
        <div>
          <p>{card.front}</p>
          <button onClick={handleFlip}>Flip</button>
          <button onClick={handleNext}>Next</button>;
        </div>
      );
    }
    else{
      return (
        <div>
          <p>{card.back}</p>
          <button onClick={handleFlip}>Flip</button>
          <button onClick={handleNext}>Next</button>;
        </div>
      );
    }
  }
  else{
    return (
      <div>
        <p>{card.front}</p>
        <button onClick={handleFlip}>Flip</button>
      </div>
    );
  }
}

export default Card;