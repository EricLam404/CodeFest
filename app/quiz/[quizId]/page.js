'use client'

import React, { useState } from 'react'
import styles from './page.module.css'
import { useRouter, useParams} from 'next/navigation';
import { useUser , withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Loading from '../../(components)/Loading';
import ErrorMessage from '../../(components)/ErrorMessage';

const Quiz = ({ searchParams }) => {
    const quiz = JSON.parse(searchParams.quiz);
    const [userAnswers, setUserAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [saved, setSaved] = useState(false);

    const router = useRouter();
    const { quizId } = useParams();
    const { user } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const totalQuestions = quiz.questions.length;
        let correctAnswers = 0;

        quiz.questions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        if (userAnswer === question.answer) {
            correctAnswers++;
        }
        });

        const calculatedScore = (correctAnswers / totalQuestions) * 100;
        setScore(calculatedScore.toFixed(2));

        try {
            const id = user.sub
            const res = await fetch(`/api/users/${id}/quiz/${quizId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    score: calculatedScore.toFixed(2)
                }),
            })
            if(!res.ok){
                throw new Error("Failed to update quiz")
            } else {
                setSaved(true);
                router.refresh()
                router.push("/quiz")
            }
        } catch(error) {
            console.log(error);
        }
    };
    
    const handleAnswer = async (e, questionIndex) => {
        setUserAnswers({
          ...userAnswers,
          [questionIndex]: e.target.value,
        });
    };

    return (
    <div className={styles.quiz}>
        <div className={styles.quiz_title}>Quiz: {quiz.title}</div>
        <form className={styles.quiz_form} onSubmit={handleSubmit}>
            {quiz.questions.map((question, index) => (
                <div key={index}>
                <div>{question.question}</div>
                <ol className='choices'>
                    {question.choices.map((choice, choiceIndex) => (
                    <li key={choiceIndex} className='choice'>
                        <label>
                        <input
                            type="radio"
                            name={`question_${index}`}
                            value={choice}
                            onChange={(e) => handleAnswer(e, index)}
                        />
                        {choice}
                        </label>
                    </li>
                    ))}
                </ol>
                </div>
            ))}
            <button type="submit">Submit Quiz</button>
        </form>
        {score && <div className={styles.score}>{score} %</div>}
        {saved && <div >Your score has been saved successfully</div>}
    </div>
    )
}

export default withPageAuthRequired(Quiz, {
    onRedirecting: () => <Loading />,
    onError: (error) => <ErrorMessage>{error.message}</ErrorMessage>,
});