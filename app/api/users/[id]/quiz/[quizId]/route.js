import { NextResponse } from "next/server";
import { ObjectId } from 'mongodb';
import User from "../../../../../(models)/User";

export async function POST(req, { params }){
    try{
        const { id, quizId } = params;
        const { score } = await req.json();
        const user = await User.findOne({ id: id });
        if (!user) {
            return new NextResponse({
                status: 404,
                body: "User not found",
            });
        } 

        const targetId = new ObjectId(quizId);
        
        const result = await User.updateOne(
            { "quizzes._id": targetId },
            { $set: { "quizzes.$.score": score } }
        );

        if (result.matchedCount === 0) {
            return new NextResponse({
                status: 404,
                body: "Quiz not found",
            });
        }


        return NextResponse.json({
            message: "Quiz Updated"
        }, { status: 200 })
    } catch( error ) {
        console.log(error)
        return NextResponse.json({
            message: "Error: " + error
        }, { status: 500 })
    }
}