'use client'

import styles from './page.module.css'
import React, { useEffect, useState } from "react";

const Quiz = () => {
    const [quizGenerated, setQuizGenerated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [wordCount, setWordCount] = useState(0);
    const [quiz, setQuiz] = useState({});
    const [userAnswers, setUserAnswers] = useState({});
    const [score, setScore] = useState(null);

    useEffect(() => {
        if(!(Object.keys(quiz).length === 0)) setQuizGenerated(true);
    }, [quiz])
    const handleQuiz = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            if(wordCount > 100 && wordCount <= 15000){
                const notes = e.target.notes.value.trim()
                const response = await fetch("/api/ai", {
                    method: "POST",
                    body: JSON.stringify({
                        notes: notes
                    })
                })
                const data = await response.json()

                //Quiz template in json so we dont waste the api for testing

                // const data = {
                //     "completion": {
                //         "id": "chatcmpl-8l6SQ67j5zDKOEngbYIDQUE4QpS6u",
                //         "object": "chat.completion",
                //         "created": 1706236930,
                //         "model": "gpt-3.5-turbo-1106",
                //         "choices": [
                //             {
                //                 "index": 0,
                //                 "message": {
                //                     "role": "assistant",
                //                     "content": "{\n  \"quiz\": {\n    \"title\": \"Sets and Notation Quiz\",\n    \"questions\": [\n      {\n        \"question\": \"What is a set?\",\n        \"choices\": [\n          \"An ordered collection of distinct objects\",\n          \"An unordered collection of distinct objects\",\n          \"A collection of objects with repetitions\",\n          \"A collection of mathematical symbols\"\n        ],\n        \"answer\": \"An unordered collection of distinct objects\"\n      },\n      {\n        \"question\": \"How is membership in a set denoted?\",\n        \"choices\": [\n          \"Using the symbol ∈\",\n          \"Using the ellipsis notation\",\n          \"By listing the elements in increasing order\",\n          \"By specifying a long sequence\"\n        ],\n        \"answer\": \"Using the symbol ∈\"\n      },\n      {\n        \"question\": \"What does the notation {1, 2, . . . , n} represent?\",\n        \"choices\": [\n          \"An infinite set\",\n          \"A set with a pattern\",\n          \"All integers between 1 and n\",\n          \"All powers of two up to n\"\n        ],\n        \"answer\": \"A set with a pattern\"\n      },\n      {\n        \"question\": \"How is the set of natural numbers or nonnegative integers denoted?\",\n        \"choices\": [\n          \"N\",\n          \"N+\",\n          \"N-\",\n          \"Z\"\n        ],\n        \"answer\": \"N\"\n      },\n      {\n        \"question\": \"Which set contains all the reals that are not rational?\",\n        \"choices\": [\n          \"N\",\n          \"Z\",\n          \"Q\",\n          \"R\"\n        ],\n        \"answer\": \"R\"\n      }\n    ]\n  }\n}"
                //                 },
                //                 "logprobs": null,
                //                 "finish_reason": "stop"
                //             }
                //         ],
                //         "usage": {
                //             "prompt_tokens": 1342,
                //             "completion_tokens": 348,
                //             "total_tokens": 1690
                //         },
                //         "system_fingerprint": "fp_b57c83dd65"
                //     }
                // }
                const quiz = JSON.parse(data.completion.choices[0].message.content)
                console.log(quiz)
                setQuiz(quiz)
            } else {
                console.log("Cannot create due to too little words or too many")
            }
        } catch(err){
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    const handleChange = async (e) => {
        setWordCount(e.target.value ? e.target.value.trim().split(" ").length : 0)
    }

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
        <div className={styles.body}>
            <div className={styles.container}>
            {loading ? (
                <div className={styles.loading}>Loading...</div>
            ) : !quizGenerated ? (
            <div>
                <div className={styles.quizTitle}>Quiz</div>
                <form className={styles.quizForm} onSubmit={handleQuiz}>
                <div className={styles.upload}>
                    <label className={styles.notes} htmlFor="notes">Enter notes below(Between 100-15,000 words)</label>
                    <textarea name="notes" id="notes" onChange={handleChange}></textarea>
                    <div className={styles.wordCount} >words: {wordCount}/15,000</div>
                </div>
                <button className={styles.btn} type="submit">Generate Quiz</button>
                </form>
            </div>
            ) : (
            <div className={styles.quiz}>
                <div className={styles.quizTitle}>Quiz: {quiz.title}</div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    {quiz.questions.map((question, index) => (
                        <div key={index}>
                        <div>{question.question}</div>
                        <ol>
                            {question.choices.map((choice, choiceIndex) => (
                            <li key={choiceIndex}>
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
                    <button className={styles.btn} type="submit">Submit Quiz</button>
                </form>
                {score && <div className={styles.score}>{score} %</div>}
                </div>
                )}
            </div>
        </div>
    )
}

export default Quiz






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