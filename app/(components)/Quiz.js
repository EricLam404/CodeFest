import React, { useState } from 'react'
import styles from './Quiz.module.css'
import { useRouter} from 'next/navigation';
import { createQueryString } from './functions/CreateQueryString';
import { useUser } from "@auth0/nextjs-auth0/client"; 

const Quiz = ({ quiz }) => {
    const [userAnswers, setUserAnswers] = useState({});
    const [score, setScore] = useState(-1);
    const router = useRouter();
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
    };
    
    const handleAnswer = async (e, questionIndex) => {
        setUserAnswers({
          ...userAnswers,
          [questionIndex]: e.target.value,
        });
    };

    const handleClick = async (e) => {
        try{
            const id = user.sub
            e.preventDefault();
            

            const res = await fetch(`/api/users/${id}/quiz`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    quiz: {
                        ...quiz,
                        score
                    }
                }),
            })

            if(!res.ok){
                throw new Error("Failed to add quiz")
            } 
            router.refresh()
            router.push("/" + '?' + createQueryString('quiz', 'added'))
        } catch (error) {
            console.log(error)
        }
    }

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
        {score != -1 && <div className={styles.score}>{score} %</div>}
        {user ? <button className={styles.btn} onClick={handleClick}>Save quiz to profile</button> 
        : <div>Log in to save quiz</div>}
    </div>
    )
}

export default Quiz