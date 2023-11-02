import { getDataFromToken } from "@/helper/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connectToDatabase } from "@/dbConfig/db";


connectToDatabase();

export async function GET(request) {
    try {
        
        const userId = await getDataFromToken(request)
        const user = await User.findOne({_id: userId}).select("-password");
        return NextResponse.json({
            mesaaage: "User found",
            data: user,
            userId
        })

    } catch (error) {
        return NextResponse.error("An error occurred", 500);
    }
}