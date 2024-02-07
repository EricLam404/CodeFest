'use client'

import React, { useEffect, useState } from 'react'
import styles from "./page.module.css"
import Link from 'next/link'
import { useUser , withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Loading from '../(components)/Loading';
import ErrorMessage from '../(components)/ErrorMessage';

const Page = () => {
    const [quizzes, setQuizzes] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = user.sub
                const response = await fetch(`/api/users/${id}/quiz`, {
                    method: "GET"
                });

                const quizData = await response.json();
                setQuizzes(quizData.quizzes)
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [])
    return (
        <div className={styles.main}>
            <div className={styles.quizzesPage}>
                <h1>Quizzes</h1>
                <Link href={"/quiz"} className={styles.link}>
                    <div>Add a quiz</div>
                </Link>
                <div className={styles.quizList}>
                    {quizzes.length != 0 ? quizzes.map((quiz, index) => (
                    <Link
                        key={index}
                        href={{
                            pathname: `/quiz/${quiz._id}`,
                            query: {
                                quiz: JSON.stringify(
                                    quiz
                                )
                            },
                        }}
                    >
                        <div key={index} className={styles.quizItem}>
                            <h3>{quiz.title}</h3>
                            {quiz.score !== -1 ? <p className={styles.quizTaken}>Grade:  {quiz.score}% </p> : <p className={styles.quizNotTaken}>Not taken</p>}
                        </div>
                    </Link>
                    )):
                    <div>No saved quizzes </div>
                    }
                </div>
            </div>
            
        </div>
    )
}

export default withPageAuthRequired(Page, {
    onRedirecting: () => <Loading />,
    onError: (error) => <ErrorMessage>{error.message}</ErrorMessage>,
});