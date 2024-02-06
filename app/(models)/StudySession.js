
import mongoose, { Schema } from "mongoose";

const studySessionSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    startTime: { 
        type: Date, 
        required: true 
    },
    endTime: { 
        type: Date, 
        required: 
        true },
});


const StudySession = mongoose.models.StudySession || mongoose.model('StudySession', studySessionSchema);
export default StudySession;