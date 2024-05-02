import React, {useState, useEffect} from "react";
import { useParams, useNavigate} from "react-router-dom";
import {readDeck} from "../utils/api/index";
import Card from "./Card.js";

export const Study = () => {
  const navigate = useNavigate();
  const {deckId} = useParams();
  let numCards;
  
  const [deck, setDeck] = useState({name: "", description: ""});
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchDeck = async () => {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
    };

    fetchDeck();
  }, [deckId]);

  const nav = <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="/">Home</a></li>
                  <li class="breadcrumb-item"><a href={"/decks/" + deck.id}>{deck.name}</a></li>
                  <li class="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
              </nav>;

  function handleAddCards() {
    navigate(`/decks/${deckId}/cards/new`);
  };

  function handleNext(){
    if(index == deck.cards.length-1){
      const result = window.confirm("Restart cards?\n\nClick 'cancel' to return to the home page.");
      setIndex(0);
      if (result) {
        navigate(`/decks/${deckId}/study`);
      }
      else{
        navigate('/');
      }
    }
    else{
      setIndex(index+1);
    }
  }

  if(!deck.cards){
    numCards = 0;
  }
  else{
    numCards = deck.cards.length;
  }
  
  if(numCards <= 2){
    return (
      <div>
        {nav}
        <h1>Study: {deck.name}</h1>
        <h2>Not enough cards.</h2>
        <p>You need at least 3 cards to study. There are {numCards} cards in this deck.</p>
        <button onClick={handleAddCards}>Add Cards</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Study: {deck.name}</h1>
      <h3>Card {index+1} of {numCards}</h3>
      <Card cardId={deck.cards[index].id} handleNext={handleNext}/>
    </div>
  );
}

export default Study;