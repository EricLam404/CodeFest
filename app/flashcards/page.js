'use client'

import styles from './page.module.css'
import {useState, useEffect} from "react";

const Flashcards = () => {

const [choices, setChoices] = useState([]);
const [notes, setNotes] = useState("")
const [numCard, setNumCard] = useState(5);

const handleInput = (e) => {
    setNotes(e.target.value)
}

const handleClick = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/ai/flashcard", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            notes: notes,
            numCards: numCard
        }),
    });
    const result = await response.json();
    const cards = JSON.parse(result.completion.choices[0].message.content)
    //setChoices(cards);
    console.log(cards)//It prints the content fine in this way
    //console.log(choices);//It prints "[]" which is the default value
}



return(
    <div className={styles.container}>
        <form onSubmit={handleClick}>
            <lable>Enter Notes</lable>
            <input type="text" value={notes} onChange={handleInput}></input>
            <button className='style.button' type="submit">Testing API</button>
        </form>

        {choices.map(choice => {
            console.log(choice);
            return(
                <p key={choice.index}>{choice.message.content}</p>
            )
        })}


    </div>

)

}

export default Flashcards