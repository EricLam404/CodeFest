import { NextResponse } from 'next/server';
import OpenAI from "openai";

export async function POST(req) {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY})
    const { notes } = await req.json();
    const completion = await openai.chat.completions.create({
        messages: [
            {
            role: "system",
            content: "You are a helpful assistant designed to turn notes into a multiple choice quiz with 4 choices(do not put the letter choices A-D) and output JSON. Give a title and three fields for each question, question, choices and answer",
            },
            { role: "user", content: notes },
        ],
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "json_object" },
    });
    return NextResponse.json({completion})
}