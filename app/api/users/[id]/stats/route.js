import { NextResponse } from "next/server";
import User from "../../../../(models)/User";

export async function GET(req, { params }){
    try{
        const { id } = params;

        const user = await User.findOne({ id: id });

        if (!user) {
            return NextResponse.json({
                stats: []
            }, { status: 201 })
        } 
        
        const quizTaken = user.quizzes.filter(quiz => quiz.score != -1);

        const stats = {
            totalQuizzes: user.quizzes.length,
            quizTaken: quizTaken.length,
            quizStats: calculateStats(quizTaken.map(quiz => quiz.score)),
            totalFlashcards: user.flashcards.length,
            totalStudySessions: user.studySessions.length
        }
        return NextResponse.json({
            stats: stats
        }, { status: 201 })
    } catch( error ) {
        console.log(error)
        return NextResponse.json({
            message: "Error: " + error
        }, { status: 500 })
    }
}

function calculateStats(scores) {
    scores = scores.filter(score => score !== -1);
    if (scores.length === 0) {
        return {
            mean: null,
            median: null,
            mode: null
        };
    }

    // Calculate mean
    const mean = scores.reduce((sum, score) => sum + score, 0) / scores.length;

    // Calculate median
    const sortedScores = scores.slice().sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedScores.length / 2);
    const median =
    sortedScores.length % 2 === 0
        ? (sortedScores[middleIndex - 1] + sortedScores[middleIndex]) / 2
        : sortedScores[middleIndex];

    // Calculate mode
    const scoreCount = {};
    let maxCount = 0;
    let mode = null;

    for (const score of sortedScores) {
    scoreCount[score] = (scoreCount[score] || 0) + 1;

    if (scoreCount[score] > maxCount) {
        maxCount = scoreCount[score];
        mode = score;
    }
    }

    return {
        mean,
        median,
        mode
    };
}
