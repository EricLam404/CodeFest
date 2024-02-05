<<<<<<< HEAD
import User from "@/app/(models)/User";
import { NextResponse } from "next/server";

export async function POST(req, { params }){
    try{
        const { id } = params
        const { cards } = await req.json();

        const user = await User.findOne({ id: id});

        if(!user){
            const newUser = newUser({
                id: id,
                flashcards: cards,
            });
            await newUser.save();
        } else {
            await User.findOneAndUpdate(
                { id: id },
                { $push: {flashcards: cards} },
                { new: true }
            );
        }
        
        return NextResponse.json({
            message: "Cards Added"
        }, { status: 201})


    } catch ( error ){
        console.log(error);
        return NextResponse.json({
            message: "Error" + error
        }, { status: 500})
    }
}

=======
>>>>>>> d4f4563c4672401528d4c91c1380e256620cc099
export async function GET(req, { params }){
    try{
        const { id } = params;

        const user = await User.findOne({ id: id });

        if (!user) {
            return NextResponse.json({
<<<<<<< HEAD
                flashcards: []
=======
                quizzes: []
>>>>>>> d4f4563c4672401528d4c91c1380e256620cc099
            }, { status: 201 })
        } else {
            
        }
<<<<<<< HEAD

        return NextResponse.json({
            flashcards: user.flashcards
=======
        return NextResponse.json({
            quizzes: user.quizzes
>>>>>>> d4f4563c4672401528d4c91c1380e256620cc099
        }, { status: 201 })
    } catch( error ) {
        console.log(error)
        return NextResponse.json({
            message: "Error: " + error
        }, { status: 500 })
    }
}