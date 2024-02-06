import { NextResponse } from 'next/server';
import OpenAI from "openai";

export async function POST(req) {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY})
    const { notes, numCards} = await req.json();
    const completion = await openai.chat.completions.create({
        messages: [
            {
            role: "system",
            content: `You are a flash card assistant. Based on the user's notes, generate EXACTLY ${numCards} flashcards by creating a JSON with the following format:
            Example:
            {
                "flashcards": [
                  {
                    "title": "Nearest Neighbor",
                    "content": "Nearest Neighbor is a heuristic algorithm used to solve the traveling salesman problem. It involves comparing each city to find the shortest distance and selecting the next closest unvisited city until all cities are visited."
                  },
                  {
                    "title": "std::list vs std::vector",
                    "content": "std::list is used for O(1) insertion and deletion in the middle, while std::vector provides faster access time. Choosing between them depends on the specific operations needed, such as deletion or access speed."
                  },
                  {
                    "title": "GreedyTSP",
                    "content": "GreedyTSP is another heuristic algorithm to solve the traveling salesman problem. It involves selecting the shortest edge at each step to form a tour, optimizing for speed but may not always produce the most optimal solution."
                  }
                ]
              }`,
            },
            { role: "user", content: notes},
        ],
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "json_object" },
    });
    return NextResponse.json({completion})
}