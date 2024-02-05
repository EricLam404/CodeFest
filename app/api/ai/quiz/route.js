import { NextResponse } from 'next/server';
import OpenAI from "openai";

export async function POST(req) {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY})
    const { notes, questions } = await req.json();
    const completion = await openai.chat.completions.create({
        messages: [
            {
            role: "system",
            content: `You're a quiz assistant. Create a multiple-choice quiz with ${questions} questions in JSON format with a title and questions. Each question should have a prompt called question, four choices in an array(do not put the letter choices A-D), and the correct answer(the correct answer is the same words as the question choice that is correct)`,
            },
            { role: "user", content: notes },
        ],
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "json_object" },
    });
    return NextResponse.json({completion})
}