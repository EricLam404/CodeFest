import { NextResponse } from "next/server";
import User from "../../../../(models)/User";

export async function POST(req, { params }){
    try{
        const { id } = params;
        const { quiz } = await req.json();

        const user = await User.findOne({ id: id });

        if (!user) {
            const newUser = new User({
                id: id,
                quizzes: [quiz],
            });

            await newUser.save();
        } else {
            await User.findOneAndUpdate(
                { id: id },
                { $push: { quizzes: quiz } },
                { new: true }
            );
        }
        return NextResponse.json({
            message: "Quiz Added"
        }, { status: 201 })
    } catch( error ) {
        console.log(error)
        return NextResponse.json({
            message: "Error: " + error
        }, { status: 500 })
    }
}

export async function GET(req, { params }){
    try{
        const { id } = params;

        const user = await User.findOne({ id: id });

        if (!user) {
            return NextResponse.json({
                quizzes: []
            }, { status: 201 })
        } else {
            
        }
        return NextResponse.json({
            quizzes: user.quizzes
        }, { status: 201 })
    } catch( error ) {
        console.log(error)
        return NextResponse.json({
            message: "Error: " + error
        }, { status: 500 })
    }
}