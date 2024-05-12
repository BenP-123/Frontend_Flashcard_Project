import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import { readCard } from '../utils/api';

export const CardForm = ({returnCard, handleDone}) => {
    const { cardId } = useParams();

    const [card, setCard] = useState({ front: "", back: "" });

    useEffect(() => {
        const fetchCard = async () => {
          const loadedCard = await readCard(cardId);
          setCard(loadedCard);
        };
    
        if(cardId){
            fetchCard();
        }
      }, [cardId]);

    const initialFormState = {
        front: card.front,
        back: card.back,
      };

    const [formData, setFormData] = useState({ ...initialFormState });

    const handleChange = ({ target }) => {
        setFormData({
        ...formData,
        [target.name]: target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        returnCard(formData.front, formData.back);
        setFormData(initialFormState);
      };

      useEffect(() => {
        setFormData({
          ...formData,
          front: card.front,
          back: card.back,
        });
      }, [card]);

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="front">Front</label>
            <textarea
                id="front"
                name="front"
                onChange={handleChange}
                value={formData.front}
            />
            <br />
            <label htmlFor="back">Back</label>
            <textarea
                id="back"
                name="back"
                onChange={handleChange}
                value={formData.back}
            />
            <br />
            <button onClick={handleDone}>Back</button>
            <button type="submit">Submit</button>
        </form>
    );
}

export default CardForm;