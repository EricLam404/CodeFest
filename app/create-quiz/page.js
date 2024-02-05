'use client'

import styles from './page.module.css'
import React, { useEffect, useState } from "react";
import Quiz from "../(components)/Quiz"
import Navbar from '../(components)/Navbar';
// import { TestQuizData } from '/app/(components)/TestData/QuizData';

const Page = () => {
    const [quizGenerated, setQuizGenerated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [wordCount, setWordCount] = useState(0);
    const [quiz, setQuiz] = useState({});
    const [numQuestions, setNumQuestions] = useState(1);
    const [notes, setNotes] = useState(true);
    const [underWordCount, setUnderWordCount] = useState(false);
    const [overWordCount, setOverWorkCount] = useState(false)

    useEffect(() => {
        if(!(Object.keys(quiz).length === 0)) setQuizGenerated(true);
    }, [quiz])
    const handleQuizFromNotes = async (e) => {
        e.preventDefault();

        try {
            if(wordCount < 100){
                setOverWorkCount(false);
                setUnderWordCount(true);
            } else if( wordCount > 15000){
                setUnderWordCount(false);
                setOverWorkCount(true);
            } else {
                setLoading(true);
                setUnderWordCount(false)
                setOverWorkCount(false)
                const notes = e.target.notes.value.trim()
                const response = await fetch("/api/ai/quiz", {
                    method: "POST",
                    body: JSON.stringify({
                        notes: notes,
                        questions: numQuestions
                    })
                })
                const data = await response.json()

                const quiz = JSON.parse(data.completion.choices[0].message.content)
                console.log(quiz)
                setQuiz(quiz)
            }
        } catch(err){
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    const handleQuizFromSubject = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const notes = e.target.subject.value.trim()
            const response = await fetch("/api/ai/quiz", {
                method: "POST",
                body: JSON.stringify({
                    notes: notes,
                    questions: numQuestions
                })
            })
            const data = await response.json()
            const quiz = JSON.parse(data.completion.choices[0].message.content)

            console.log(quiz)
            setQuiz(quiz)
        } catch(err){
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    const handleChange = async (e) => {
        setWordCount(e.target.value ? e.target.value.trim().split(" ").length : 0)
    }

    return (
        <div className={styles.mainBody}>
            <div>
                <Navbar/>
            </div>
            <div className={styles.body}>
                <div className={styles.container}>
                {loading ? (
                    <div className={styles.loading}>Loading...</div>
                ) : !quizGenerated ? (
                <div>
                    <div className={styles.quizTitle}>Generate Quiz</div>
                    <label className={styles.swap}>
                        <input type="checkbox" value={!notes} onChange={() => setNotes(!notes)} />
                        <div className={styles.swap_on}>Generate quiz from notes</div>
                        <div className={styles.swap_off}>Generate quiz from a subject</div>
                    </label>
                    {
                        notes ? (
                            <form className={styles.quizForm} onSubmit={handleQuizFromNotes}>
                                <div className={styles.upload}>
                                    <label className={styles.notes} htmlFor="notes">Enter notes below(100-15,000 words)</label>
                                    <textarea name="notes" id="notes" onChange={handleChange}></textarea>
                                    <div className={styles.wordCount} >words: {wordCount}/15,000</div>
                                    {underWordCount && <div className={styles.warning}>Your notes are under the word count, please add more words</div>}
                                    {overWordCount && <div className={styles.warning}>Your notes are over the word count, please remove words</div>}
                                </div>
                                <div>
                                    <label htmlFor="numQuestions">Number of Questions:</label>
                                    <input
                                    type="number"
                                    id="numQuestions"
                                    className='numQuestions'
                                    value={numQuestions}
                                    onChange={(e) => { setNumQuestions(e.target.value)}}
                                    min={1}
                                    />
                                </div>
                                <button className={styles.btn} type="submit">Generate Quiz</button>
                            </form>
                        ) : (
                            <form className={styles.quizForm} onSubmit={handleQuizFromSubject}>
                                <div className={styles.upload}>
                                    <label className={styles.notes} htmlFor="subject">Enter subject(Ex: linked list) </label>
                                    <input name="subject" id="subject" />
                                </div>
                                <div>
                                    <label htmlFor="numQuestions">Number of Questions:</label>
                                    <input
                                    type="number"
                                    id="numQuestions"
                                    className='numQuestions'
                                    value={numQuestions}
                                    onChange={(e) => { setNumQuestions(e.target.value)}}
                                    min={1}
                                    />
                                </div>
                                <button className={styles.btn} type="submit">Generate Quiz</button>
                            </form>
                        )
                    }
                </div>
                ) : <Quiz quiz={quiz}/>}
                </div>
            </div>
        </div>
    )
}

export default Page






// pdf version not working yet
// const Quiz = () => {
//     const handleFileUpload = async (e) => {
//         const pdf = e.target.files?.[0]
//         const formData = new FormData()
//         formData.append("pdf", pdf);
//         try {
//             const response = await fetch("/api/pdf-parser", {
//                 method: "POST",
//             })
//             const data = await response.json()
//             console.log(data.text);
//         } catch (error){
//             console.error(error);
//         }
//     }
//     return (
//         <div>
//             <div>
//                 <input type='file' accept='application/pdf' onChange={handleFileUpload} />
//             </div>
//         </div>
//     )
// }

// export default Quiz