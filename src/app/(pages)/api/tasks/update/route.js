import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/dbConfig/db";
import Task from "@/models/taskModel";

connectToDatabase();

export async function PATCH(request) {
    try {
        const data = await request.json();
        const filter = { _id: data._id }; // Correct the filter object
        const update = { isCompleted: data.isCompleted }; // Correct the update object

        // Add await here to actually execute the update
        let updateData = await Task.findOneAndUpdate(filter, update, {
            new: true
        });

        return NextResponse.json({
            message: "Task updated successfully",
            success: true,
            updateData
        });
    } catch (error) {
        return NextResponse.error("An error occurred", 500);
    }
}
