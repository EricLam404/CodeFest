import React, { useState } from 'react'
import styles from './Quiz.module.css'

const Quiz = ({ quiz }) => {
    const [userAnswers, setUserAnswers] = useState({});
    const [score, setScore] = useState(null);

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
    </div>
    )
}

export default Quiz