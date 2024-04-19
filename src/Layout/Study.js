import React, {useState} from "react";
import { useParams, useNavigate} from "react-router-dom";
import {readDeck} from "../utils/api/index";

export const Study = () => {
  const navigate = useNavigate();
  const {deckId} = useParams();
  const deck = readDeck(deckId);
  
  
  //2 or fewer cards says not enough cards, add cards button  text in instructions
  
  //after final card back shown, display window message, if yes restart study, if no return to home
  

  return (
    <div>
      <h1>Study: {deck.name}</h1>
        
    </div>
    
  );
}

export default Study;

