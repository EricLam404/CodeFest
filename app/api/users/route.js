import User from "@/app/(models)/User";
import { NextResponse } from "next/server";

export async function POST(req){
    try{
        const { data } = await req.json();
        await User.create(data);

        return NextResponse.json({
            message: "User Created"
        }, { status: 201 })
    } catch(error) {
        return NextResponse.json({
            message: "Error: " + error
        }, { status: 500 })
    }
}