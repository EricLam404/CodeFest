import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema({
    question: {
        type: String,
        required: true,
    },
    choices: {
        type: [String],
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
});

const quizSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    questions: {
        type: [questionSchema],
        required: true,
    },
    score: {
        type: Number,
    },
});


const Quiz = mongoose.models.Quiz || mongoose.model('Quiz', quizSchema);

export default Quiz;