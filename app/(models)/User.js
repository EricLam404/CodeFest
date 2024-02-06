import mongoose, { Schema } from "mongoose";
import Quiz from "./Quiz";
import Flashcard from "./Flashcard";
import StudySession from "./StudySession";

try{
    mongoose.connect(process.env.DATABASE_CONNECTION);
    mongoose.Promise = global.Promise;
} catch( error ){
    console.log(error)
}

const userSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    quizzes: {
        type: [Quiz.schema],
        default: [],
    },
    flashcards: {
        type: [Flashcard.schema],
        default: [],
    },

    studySessions: {
        type: [StudySession.schema],
        default: [],
    }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
