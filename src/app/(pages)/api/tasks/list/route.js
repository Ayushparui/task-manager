import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/dbConfig/db";
import Task from "@/models/taskModel";
import { getDataFromToken } from "@/helper/getDataFromToken";

connectToDatabase()

export async function GET(request){
    try {

      const id = await getDataFromToken(request)
        const getTask = await Task.find({usId: id}).exec();

        return NextResponse.json({
            message: "Task fetched successfully",
            success: true,
            getTask
        })

    } catch (error) {
        return NextResponse.error("An error occurred", 500);
    }
}