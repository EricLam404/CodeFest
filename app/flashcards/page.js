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
const [numCard, setNumCard] = useState(3);
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

const resetNotes = () => {
    setNotes("");
    updateCounts(0);
    setWarning("");
}

const reset = () => {
    setWarning("");
    setCards({});
    setNumCard(3);
    setCardGenerated(false);
    updateCardStatus({});
}

const handleClick = async (e) => {
    e.preventDefault();

    if(wordCounts < 100){
        setWarning("Please enter at least 100 words or else there may not be enough information to generate cards");
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

                    <div className={styles.notesAndCardNums}>
                        <label>Enter Notes:</label>
                        <div className={styles.numCards}>
                            <label># of Cards:</label>
                            <input className={styles.inputnumcards}id="numofCards" onChange={(e) => {setNumCard(e.target.value)}} type="number" value={numCard} min={numCard} max="15"/>
                        </div>
                    </div>

                    <textarea className={styles.textarea} value={notes} onChange={handleInput}/>
                    <div className={styles.wordCounts}>Word Counts: {wordCounts}</div>
                    <div className={styles.insufficient}>{warning}</div>

                    <div className={styles.frontButtons}>
                        <div className={styles.linkContainer}>
                            <Link className={styles.linkComponent} href="/..">
                                <div className={styles.link}>Back</div>
                            </Link>
                        </div>
                        <button className={styles.button} type="submit">Submit</button>
                        <button className={styles.button} type="button" onClick={resetNotes}>Clear</button>
                    </div>
                    </form>
                
                    
                </div>
            ) : (
                    <div className={styles.cardsNbutton}>
                        <div className={styles.cardContainer}>
                            {cardsData.flashcards.map((cards, index) => (
                                <div key={index} className={`${styles.cards} ${titleOrInfo[index] ? styles.flip : ''}`} onClick={() => handleCard(index)}>
                                    <div className={styles.front}><h1>{cards.title}</h1></div>
                                    <div className={styles.back}><p>{cards.content}</p></div> 
                                </div>
                            ))}
                        </div>
                        <div className={styles.resetButton}><button className={`${styles.button} ${styles.reset}`} type="reset" onClick={reset}>Reset</button></div>
                    </div>
                    
                )
                
                )
            }
            
        </div>

)

}

export default Flashcards