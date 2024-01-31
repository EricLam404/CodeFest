'use client'

import styles from './page.module.css'
import {useState, useEffect} from "react";

const Flashcards = () => {

const [cardsGenerated, setCardGenerated] = useState(false);
const [cardsData, setCards] = useState({});
const [notes, setNotes] = useState("")
const [numCard, setNumCard] = useState(5);
const [wordCounts, updateCounts] = useState(0);

const handleInput = (e) => {
    setNotes(e.target.value);
    updateCounts(e.target.value ? e.target.value.trim().split(" ").length : 0);
}

const handleClick = async (e) => {
    e.preventDefault();

    if(wordCounts < 100){
        alert("Word count must be at least a 100!");
    }else{
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
}

useEffect(() =>{
    if(!(Object.keys(cardsData).length === 0)) setCardGenerated(true);
    }, [cardsData])

return(
    <div className={styles.container}>
        {!cardsGenerated ? (
            
            <div className={styles.formContainer}>
                <h2>Turning your notes into bunch of flashcards</h2>
                <form className={styles.form} onSubmit={handleClick}>
                <label>Enter Notes:</label>
                <textarea className={styles.textarea} value={notes} onChange={handleInput}/>
                <div className={styles.words}>Word Counts: {wordCounts}</div>
                <button className={styles.button} type="submit">Submit Notes</button>
                </form>
            </div>
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