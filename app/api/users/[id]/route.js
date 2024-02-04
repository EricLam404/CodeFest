import User from "@/app/(models)/User";
import { NextResponse } from "next/server";

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