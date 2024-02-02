import mongoose, { Schema } from "mongoose";

const flashcardSchema = new Schema({
    
});


const Flashcard = mongoose.models.Flashcard || mongoose.model('Flashcard', flashcardSchema);
export default Flashcard;