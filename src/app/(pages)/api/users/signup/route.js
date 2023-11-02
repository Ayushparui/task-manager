import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/dbConfig/db";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";



connectToDatabase();

export async function POST(request){
    

    try{

        const data = await request.json();
        const { name, email, password } = data;
        console.log(data)

        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })
        



    }catch(error){
        console.log(error)
        return NextResponse.error("An error occurred", 500);
    }
}