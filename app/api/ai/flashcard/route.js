import { NextResponse } from 'next/server';
import OpenAI from "openai";

export async function POST(req) {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY})
    const { notes, numCards} = await req.json();
    const completion = await openai.chat.completions.create({
        messages: [
            {
            role: "system",
            content: `You are a flash card assistant. Based on the user's notes, generate EXACTLY ${numCards} flashcards by creating a JSON with the format of having EXACTLY ${numCards} different topics from user's notes. For each card it is generating it should contain a prompt named "title" that has the name of the topic and another prompt named "content" that contains the a actual concise explainations of the topic under 50 words.`,
            },
            { role: "user", content: notes},
        ],
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "json_object" },
    });
    return NextResponse.json({completion})
}