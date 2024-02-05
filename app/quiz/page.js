'use client'

import React, { useEffect, useState } from 'react'
import styles from "./page.module.css"
import Navbar from '../(components)/Navbar';

const Page = () => {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = "1"
                const response = await fetch(`/api/users/${id}/quiz`, {
                    method: "GET"
                });

                const quizData = await response.json();
                console.log(quizData.quizzes)
                setQuizzes(quizData.quizzes)
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [])
    return (
        <div className={styles.main}>
            <div>
                <Navbar/>
            </div>
            <div className={styles.quizzesPage}>
                <h1>Quizzes</h1>
                <div className={styles.quizList}>
                    {quizzes && quizzes.map((quiz, index) => (
                    <div key={index} className={styles.quizItem}>
                        <h3>{quiz.title}</h3>
                        {quiz.score ? <p className={styles.quizTaken}>Grade:  {quiz.score}% </p> : <p className={styles.quizNotTaken}>Not taken</p>}
                    </div>
                    ))}
                </div>
            </div>
            
        </div>
    )
}

export default Page