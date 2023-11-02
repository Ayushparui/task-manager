import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/dbConfig/db";
import Task from "@/models/taskModel";

connectToDatabase()

export async function POST(request){

    try {
        const reqBody = await request.json()
        const {task, description, date, usId} = reqBody;
        console.log(reqBody);
    
    
        const newTask = new Task({
            task,
            description,
            date,
            usId
        })
    
        const savedTask = await newTask.save()
    
        return NextResponse.json({
            message: "Task created successfully",
            success: true,
            savedTask
        })
    } catch (error) {
        return NextResponse.error("An error occurred", 500);
    }

  

}