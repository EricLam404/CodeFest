'use client'

import Link from 'next/link';
import styles from './page.module.css'
import {useState, useEffect} from "react";

const Flashcards = () => {

const [loading, setLoading] = useState(false);
const [warning, setWarning] = useState("");
const [cardsGenerated, setCardGenerated] = useState(false);
const [cardsData, setCards] = useState({});
const [notes, setNotes] = useState("")
const [numCard, setNumCard] = useState(4);
const [wordCounts, updateCounts] = useState(0);
const [titleOrInfo, updateCardStatus] = useState({});// True is to show info, False is to show Title

const handleInput = (e) => {
    setNotes(e.target.value);
    updateCounts(e.target.value ? e.target.value.trim().split(" ").length : 0);
}

const handleCard = (index) => {
    updateCardStatus({
        ...titleOrInfo, [index]: !titleOrInfo[index],
    });

};

const handleClick = async (e) => {
    e.preventDefault();

    if(wordCounts < 100){
        setWarning("Insufficient word counts, please enter at least 100 words or else there may not be enough information for the API to generate cards");
    }else{
        try{
            setLoading(true);
            setWarning("");
            const response = await fetch("/api/ai/flashcard", {
                method: "POST",
                body: JSON.stringify({
                    notes: notes,
                    numCards: numCard
                }),
            });
            const result = await response.json();
            const cards = JSON.parse(result.completion.choices[0].message.content)
            console.log(cards)//Printing out to see if the API returns in the right format
            setCards(cards);

        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }
}

useEffect(() =>{
    if(!(Object.keys(cardsData).length === 0)){
        setCardGenerated(true);
    } }, [cardsData])

return(
    <div className={styles.container}>
        
        {loading ? (
            <div className={styles.loading}>Loading</div>
        ) : (
            !cardsGenerated ? (
                <div className={styles.formContainer}>
                <h2>Turning your notes into bunch of flashcards</h2>
                <form className={styles.form} onSubmit={handleClick}>
                <label>Enter Notes:</label>
                <textarea className={styles.textarea} value={notes} onChange={handleInput}/>
                <div className={styles.wordCounts}>Word Counts: {wordCounts}</div>
                <div className={styles.insufficient}>{warning}</div>
                <button className={styles.button} type="submit">Submit Notes</button>
                </form>

                <div className={styles.linkContainer}>
                    <Link className={styles.linkComponent} href="/..">
                        <div className={styles.link}>Main Page</div>
                    </Link>
                </div>
                
            </div>
        ) : (
                <div className={styles.cardContainer}>
                    {cardsData.flashcards.map((cards, index) => (
                        <div key={index} className={styles.cards} onClick={() => handleCard(index)}>
                            {titleOrInfo[index] ? (
                                <p>{cards.content}</p>
                            ):(
                                <h2>{cards.title}</h2>
                            )}
                        </div>
                    ))}
                </div>
            )
            
        )
        }


    </div>

)

}

export default Flashcards