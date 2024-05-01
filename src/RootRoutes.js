import React from 'react';
import AddDeck from "./Layout/AddDeck.js";
import DeckList from "./Layout/DeckList.js";
import EditDeck from "./Layout/EditDeck";
import Deck from "./Layout/Deck.js";
import Study from "./Layout/Study.js";
import AddCard from "./Layout/AddCard";
import EditCard from "./Layout/EditCard";
import NotFound from "./Layout/NotFound.js";
import { Routes, Route } from "react-router-dom";

function RootRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DeckList />} />
        <Route path="/decks/new" element={<AddDeck />} />
        <Route path="/decks/:deckId" element={<Deck />} />
        <Route path="/decks/:deckId/study" element={<Study />} />
        <Route path="/decks/:deckId/cards/new" element={<AddCard />} />
        <Route path="/decks/:deckId/cards/:cardId/edit" element={<EditCard />} />
        <Route path="/decks/:deckId/edit" element={<EditDeck />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default RootRoutes;

