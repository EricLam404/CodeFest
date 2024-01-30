'use client'

import styles from './page.module.css'
import {useState, useEffect} from "react";

const Flashcards = () => {

const [choices, setChoices] = useState([]);

const handleClick = async (e) => {
    const response = await fetch("/api/ai/flashcard", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            something: true,
        }),
    });
    const result = await response.json();
    setChoices(result.completion.choices);
}

useEffect(() => {//trying to print out choices when its updated, but always returns an undefined object
    if(choices.length != 0) {
        console.log(choices);
    }
}, [choices]);

return(
    <div className={styles.container}>
        <button className={styles.button} onClick={handleClick}>Testing API</button>
        {/* Gave run time error of "choices" being undefined
        {choices.map(choice => {
            console.log(choice);
            return(
                <p key={choice.index}>{choice.message.content}</p>
            )
        })}
        */}

    </div>

)

}

export default Flashcards