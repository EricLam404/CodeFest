import { NextResponse } from 'next/server';
import OpenAI from "openai";

export async function POST(req) {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY})
    //const { notes, questions } = await req.json();
    const completion = await openai.chat.completions.create({
        messages: [
            {
            role: "system",
            content: `You are a text assistant. You are responsible for taking in user's notes, return the notes by making it more easily readable as well as making it less redundant`,
            },
            { role: "user", content: "The GreedyTSP function was implemented using the idea of the Kruskal Algorithm, which also utilized the idea of the greedy algorithm by always choosing the edges with the smallest weight that doesn’t create a cycle. However, because our ultimate goal is to create a tour, we ultimately need to manually add an edge such that it DOES create a cycle. To implement this function, we first need a variable to keep track of open edges, such that whenever a node has come to have no open edges we decrement the open edges by 1, this is to help us manually add the last edge to create a tour. Second, create a list of Edges for every node in the list and store it in a priority queue. Then, repeatedly choose the Edge with the smallest weight that does not cause a cycle. To check this, we would need to make sure that the two nodes connected to the Edge can not have two edges that are already connected to other nodes. And, we have to make sure that either one of the nodes, when we trace their edges, can not return to the adjacent node that is connected with the same Edge as him because if it did, that would cause a cycle. Once that is done, repeatedly pop Edges off of the heap, check if it is addable or if it causes a cycle, if it doesn't cause a cycle and it is addable. add it to the list. Lastly, when open edges are decremented to be equal or less than 2, we break the loop, manually search for the two nodes that are missing an edge, calculate the distance, and add it to the list, thus, a tour is created." },
        ],
        model: "gpt-3.5-turbo-1106",
        //response_format: { type: "json_object" },
    });
    return NextResponse.json({completion})
}