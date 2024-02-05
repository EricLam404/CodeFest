'use client'

import React, { useEffect, useState } from 'react'
import styles from "./page.module.css"


const SavedCards = () => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = "1"
                const response = await fetch(`/api/users/${id}/flashcard`, {
                    method: "GET"
                });

                const data = await response.json();
                console.log(data);
                console.log(data.flashcards)
                setCards(data.flashcards)
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [])
    return (
        <div className={styles.cardsPage}>
            <h1>Cards</h1>
            <div className={styles.cardsList}>
                {cards && cards.map((card, index) => (
                <div key={index} className={styles.card}>
                    <h3>{card.title}</h3>
                    <p>{card.content}</p>
                </div>
                ))}
            </div>
        </div>
    )


}

export default SavedCards