import mongoose, { Schema } from "mongoose";

const flashcardSchema = new Schema({

    title:{
        type: String,
        required: true,
    },

    content:{
        type: String,
        required: true,
    },        
});


const Flashcard = mongoose.models.Flashcard || mongoose.model('Flashcard', flashcardSchema);
export default Flashcard;