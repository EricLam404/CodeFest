'use client'

import styles from './page.module.css'
import {useState, useEffect} from "react";

const Flashcards = () => {

const [cardsGenerated, setCardGenerated] = useState(false);
const [cardsData, setCards] = useState({});
const [notes, setNotes] = useState("")
const [numCard, setNumCard] = useState(5);

const handleInput = (e) => {
    setNotes(e.target.value)
}

const handleClick = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/ai/flashcard", {
        method: "POST",
        body: JSON.stringify({
            notes: notes,
            numCards: numCard
        }),
    });
    const result = await response.json();
    const cards = JSON.parse(result.completion.choices[0].message.content)
    console.log(cards)//It prints the content fine in this way
    setCards(cards);
    console.log(cardsData);//It prints "[]" which is the default value
}

useEffect(() =>{
    if(!(Object.keys(cardsData).length === 0)) setCardGenerated(true);
    }, [cardsData])

return(
    <div className={styles.container}>
        {!cardsGenerated ? (
            <form onSubmit={handleClick}>
            <label>Enter Notes:</label>
            <input type="text" value={notes} onChange={handleInput}></input>
            <button className='style.button' type="submit">Submit Notes</button>
            </form>
        ) : (
                <div className={styles.cardContainer}>
                    {cardsData.flashcards.map((cards, index) => (
                        <div key={index} className={styles.cards}>
                            <h2>{cards.title}</h2>
                            <p>{cards.content}</p>
                        </div>
                    ))}
                </div>
            )
        }


    </div>

)

}

export default Flashcards